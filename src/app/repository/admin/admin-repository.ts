import { Company } from "../../entity/Company";
import { IRegister } from "../../interfaces/i-auth/i-auth";
import { UserRepository } from "../company/auth-repository";

export class AdminRepository extends UserRepository {
    constructor(){
        super()
    }

    async create(register: IRegister): Promise<Company> {
        const company = this.repo.create(register); 
        return await this.repo.save(company)      
    }
    
}