import { Repository } from "typeorm"
import { Company } from "../../entity/Company"
import { AppDataSource } from "../../../database/dataSource"



class configRepository {
    private configCompany: Repository<Company>


    constructor() {
        this.configCompany = AppDataSource.getRepository(Company)
    }

    private getInfoCompany = async () => {

    }

    private UpdateInfoCompany = async () => {

    }
}

export default configRepository