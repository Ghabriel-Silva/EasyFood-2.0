import { Repository } from "typeorm";
import { AppDataSource } from "../../../database/dataSource";
import { User } from "../../entity/User";
import { IRegister, IUser } from "../../interfaces/IAuth/IAuth";

export class UserRepository {
    private repo: Repository<User>

    constructor() {
        this.repo = AppDataSource.getRepository(User)
    }

    async findByEmail(email: string):Promise<IUser | null> {
        return await this.repo.findOne({ where: { email } })
    }
    
    async create(register: IRegister): Promise<IRegister> {
        return await this.repo.save(register)
    }
}