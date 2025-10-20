import { AdminRepository } from "../../repository/AdminRepository/Admin";
import {IRegister, IUser} from "../../interfaces/IAuth/IAuth";
import ErrorExtension from "../../utils/ErrorExtension";
import registerSchema from "../../validations/AuthUser/Register";
import * as yup from "yup";
import bcrypt from "bcrypt";
import { Company } from "../../entity/Company";


// export class AdminService {
//     private adminRepository: AdminRepository

//     constructor() {
//         this.adminRepository = new AdminRepository()
//     }

//     register = async (register: IRegister): Promise<Company> => {
//         let validatedRegister;
//         try {
//             validatedRegister = await registerSchema.validate(register, {
//                 abortEarly: false,
//                 stripUnknown: true
//             });
//         } catch (err) {
//             if (err instanceof yup.ValidationError) {
//                 throw new ErrorExtension(400, err.errors.join(","));
//             }
//             throw err;
//         }
//         console.log('passou do yup')

//         const hashPassword: string = await bcrypt.hash(validatedRegister.password, 10);
//         validatedRegister.password = hashPassword;
//          console.log('passou da criptografia')

//         const validEmail: IUser | null = await this.adminRepository.findByEmail(validatedRegister.email);
//          console.log()
//         if (validEmail) {
//             throw new ErrorExtension(401, 'Email já cadastrado!');
//         }
//         const registrandoUser = await this.adminRepository.create(validatedRegister);


//         if (!registrandoUser) {
//             throw new ErrorExtension(400, 'Usuário não registrado');
//         }

//         return registrandoUser;
//     }

// }
export class AdminService {
    private adminRepository: AdminRepository;

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    register = async (register: IRegister): Promise<Company> => {
        let validatedRegister;

        console.log("Início do registro:", register);

        // Validação
        try {
            validatedRegister = await registerSchema.validate(register, {
                abortEarly: false,
                stripUnknown: true
            });
            console.log("Validação OK:", validatedRegister);
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                console.error("Erro de validação:", err.errors);
                throw new ErrorExtension(400, err.errors.join(","));
            }
            console.error("Erro inesperado na validação:", err);
            throw err;
        }

        // Hash da senha
        try {
            const hashPassword: string = await bcrypt.hash(validatedRegister.password, 10);
            validatedRegister.password = hashPassword;
            console.log("Senha criptografada:", hashPassword);
        } catch (err) {
            console.error("Erro ao criptografar a senha:", err);
            throw new ErrorExtension(500, "Erro ao processar senha");
        }

        // Verifica se email já existe
        try {
            const validEmail: IUser | null = await this.adminRepository.findByEmail(validatedRegister.email);
            console.log("Resultado da busca por email:", validEmail);
            if (validEmail) {
                throw new ErrorExtension(401, 'Email já cadastrado!');
            }
        } catch (err) {
            console.error("Erro na verificação de email:", err);
            throw err;
        }

        // Criação do usuário
        try {
            const registrandoUser = await this.adminRepository.create(validatedRegister);
            console.log("Usuário registrado com sucesso:", registrandoUser);
            if (!registrandoUser) {
                throw new ErrorExtension(400, 'Usuário não registrado');
            }
            return registrandoUser;
        } catch (err) {
            console.error("Erro ao criar usuário:", err);
            throw err;
        }
    }
};
