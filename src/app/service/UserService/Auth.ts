import { ILogin, IRegister, IUser, myJwtPayload } from "../../interfaces/IAuth/IAuth";
import { UserRepository } from "../../repository/UserRepository/Auth";
import ErrorExtension from "../../utils/ErrorExtension";
import registerSchema from "../../validations/AuthUser/Register";
import * as yup from "yup";
import bcrypt from "bcrypt";
import LoginSchema from "../../validations/AuthUser/Login";
import Auth from "../../utils/Auth";

export class UserAuthService {
    private userRepository: UserRepository
    private authToken: Auth

    constructor() {
        this.userRepository = new UserRepository()
        this.authToken = new Auth()
    }

    register = async (register: IRegister): Promise<IRegister> => {
        let validatedRegister;
        try {
            validatedRegister = await registerSchema.validate(register, {
                abortEarly: false,
                stripUnknown: true
            });
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","));
            }
            throw err;
        }

        const hashPassword: string = await bcrypt.hash(validatedRegister.password, 10);
        validatedRegister.password = hashPassword;

        const validEmail: IUser | null = await this.userRepository.findByEmail(validatedRegister.email);
        if (validEmail) {
            throw new ErrorExtension(401, 'Email já cadastrado!');
        }
        const registrandoUser = await this.userRepository.create(validatedRegister);


        if (!registrandoUser) {
            throw new ErrorExtension(400, 'Usuário não registrado');
        }

        return registrandoUser;
    }

    login = async (login: ILogin): Promise<{ token: string; user:Pick<IUser, "id" | "name" | "email" | "role"> }> => {
        let validateLogin
        try {
            validateLogin = await LoginSchema.validate(login, {
                abortEarly: false,
                stripUnknown: true
            })
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(401, err.errors.join(","))
            }
        }

        const user: IUser | null = await this.userRepository.findByEmail(login.email)

        if (!user) {
            throw new ErrorExtension(401, "Email ou senha incorreto")
        }

        const isPasswordValid: boolean = await bcrypt.compare(login.password, user.password)

        if (!isPasswordValid) {
            throw new ErrorExtension(401, "Email ou senha incorreto")
        }
        const payload: myJwtPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        }

        const jwtToken: string = this.authToken.jwtGenerator(payload)
        return {
            token: jwtToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }

    }

}