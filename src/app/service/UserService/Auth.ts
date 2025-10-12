import { IRegister } from "../../interfaces/IAuth/IAuth";
import { UserRepository } from "../../repository/UserRepository/Auth";
import ErrorExtension from "../../utils/ErrorExtension";
import registerSchema from "../../validations/AuthUser/Register";
import * as yup from "yup";
import bcrypt from "bcrypt";


export class UserAuthService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    register = async (register: IRegister) => {

        try {
            await registerSchema.validate(register, { abortEarly: false })
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","))
            }
            throw err
        }

        const hashPassword:string = await bcrypt.hash(register.password, 10)

        register.password = hashPassword

        const validEmail: IRegister | null = await this.userRepository.findByEmail(register.email)
        if (validEmail) {
            throw new ErrorExtension(401, 'Email já cadastrado!')
        }
        const registrandoUser = await this.userRepository.create(register)

        if (!registrandoUser) {
            throw new ErrorExtension(400, 'Usuário não resgitrado')
        }

        return registrandoUser

    }
}