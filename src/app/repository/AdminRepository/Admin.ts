import { Company } from "../../entity/Company";
import { IRegister } from "../../interfaces/IAuth/IAuth";
import { UserRepository } from "../UserRepository/Auth";

export class AdminRepository extends UserRepository {
    constructor(){
        super()
    }

    async create(register: IRegister): Promise<Company> {
        const company = this.repo.create(register); 
        return await this.repo.save(company)      
    }
    
}