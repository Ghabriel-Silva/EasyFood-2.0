import { ILogin, IRegister, IUser } from "../../interfaces/IAuth/IAuth";
import { UserRepository } from "../../repository/UserRepository/Auth";
import ErrorExtension from "../../utils/ErrorExtension";
import registerSchema from "../../validations/AuthUser/Register";
import * as yup from "yup";
import bcrypt from "bcrypt";
import LoginSchema from "../../validations/AuthUser/Login";

export class UserAuthService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
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

    login = async (login: ILogin) => {
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

        const userExist: IUser | null = await this.userRepository.findByEmail(login.email)

        if (!userExist) {
            throw new ErrorExtension(404, "Email ou senha incorreto")
        }

        const password: boolean = await bcrypt.compare(login.password, userExist.password)

        if (!password) {
            throw new ErrorExtension(404, "Email ou senha incorreto")
        }

        if(userExist && password ){
            return true
        }

    }

}