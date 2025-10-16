import { IRegister, IUser } from "../../interfaces/IAuth/IAuth";
import { UserRepository } from "../../repository/UserRepository/Auth";
import ErrorExtension from "../../utils/ErrorExtension";
import registerSchema from "../../validations/AuthUser/Register";
import * as yup from "yup";
import bcrypt from "bcrypt";
import { enunRole } from "../../entity/User";


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

        const validEmail = await this.userRepository.findByEmail(validatedRegister.email);
        if (validEmail) {
            throw new ErrorExtension(401, 'Email já cadastrado!');
        }
        const registrandoUser = await this.userRepository.create(validatedRegister);


        if (!registrandoUser) {
            throw new ErrorExtension(400, 'Usuário não registrado');
        }

        return registrandoUser;
    }

}