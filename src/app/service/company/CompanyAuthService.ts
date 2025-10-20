import { ILogin, IUser, myJwtPayload } from "../../interfaces/IAuth/IAuth";
import { UserRepository } from "../../repository/Company/CompanyAuthRepository";
import ErrorExtension from "../../utils/ErrorExtension";
import * as yup from "yup";
import bcrypt from "bcrypt";
import LoginSchema from "../../validations/Company/Login";
import Auth from "../../utils/Auth";

export class UserAuthService {
    private userRepository: UserRepository
    private authToken: Auth

    constructor() {
        this.userRepository = new UserRepository()
        this.authToken = new Auth()
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