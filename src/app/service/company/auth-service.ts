import { ILogin, IUser, myJwtPayload } from "../../interfaces/i-auth/i-auth";
import { UserRepository } from "../../repository/company/auth-repository";
import ErrorExtension from "../../utils/error-extension";
import * as yup from "yup";
import bcrypt from "bcrypt";
import LoginSchema from "../../validations/company/login";
import Auth from "../../utils/auth";

export class UserAuthService {
    private userRepository: UserRepository
    private authToken: Auth

    constructor() {
        this.userRepository = new UserRepository()
        this.authToken = new Auth()
    }

    login = async (login: ILogin): Promise<{ token: string; user: Pick<IUser, "id" | "name" | "email" | "role"> }> => {
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
        if (!validateLogin) {
            throw new ErrorExtension(401, "Dados inválidos");
        }

        const user: IUser | null = await this.userRepository.findByEmail(validateLogin.email)

        if (!user) {
            throw new ErrorExtension(401, "Email ou senha incorreto")
        }

        const isPasswordValid: boolean = await bcrypt.compare(validateLogin.password, user.password)

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