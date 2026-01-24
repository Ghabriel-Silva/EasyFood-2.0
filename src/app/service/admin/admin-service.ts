import { AdminRepository } from "../../repository/admin/admin-repository";
import { IRegister, IUser } from "../../interfaces/i-auth/i-auth";
import ErrorExtension from "../../utils/error-extension";
import registerSchema from "../../validations/admin/register";
import * as yup from "yup";
import bcrypt from "bcrypt";
import { Company } from "../../entity/Company";


export class AdminService {
    private adminRepository: AdminRepository;

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    register = async (register: IRegister): Promise<Company> => {
        try {
            const validatedRegister = await registerSchema.validate(register, {
                abortEarly: false,
                stripUnknown: true
            });

        
            validatedRegister.password = await bcrypt.hash(validatedRegister.password, 10);

        
            const validEmail: IUser | null = await this.adminRepository.findByEmail(validatedRegister.email);
            if (validEmail) {
                throw new ErrorExtension(401, 'Email já cadastrado!');
            }

            const registrandoUser = await this.adminRepository.create(validatedRegister);
            if (!registrandoUser) {
                throw new ErrorExtension(400, 'Usuário não registrado');
            }

            return registrandoUser;

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","));
            }
            throw err; 
        }
    }
}