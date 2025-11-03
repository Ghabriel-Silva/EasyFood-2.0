import { Repository } from "typeorm";
import { AppDataSource } from "../../../database/dataSource";
import { Company } from "../../entity/Company";

export class UserRepository {
    protected repo: Repository<Company>

    constructor() {
        this.repo = AppDataSource.getRepository(Company)
    }

    async findByEmail(email: string): Promise<Company | null> {
        return await this.repo.findOne({ where: { email } })
    }
}