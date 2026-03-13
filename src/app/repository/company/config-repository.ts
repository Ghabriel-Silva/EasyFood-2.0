import { QueryBuilder, Repository } from "typeorm"
import { Company } from "../../entity/Company"
import { AppDataSource } from "../../../database/dataSource"
import { myJwtPayload } from "../../interfaces/i-auth/i-auth"
import { ConfigConpanySchema } from "../../validations/company/config/config-companyPatch"
import { IConfigCompanyData } from "../../interfaces/i-config/i-config"



class configRepository {
    private configCompany: Repository<Company>


    constructor() {
        this.configCompany = AppDataSource.getRepository(Company)
    }

    getInfoCompany = async (company: myJwtPayload):Promise<IConfigCompanyData | null> => {
        return await this.configCompany
            .createQueryBuilder("company")
            .select([
                "company.name",
                "company.customerAddress",
                "company.customerPhone",
                "company.defaultFreight",
                "company.email"
            ])
            .where("company.id = :id", { id: company.id })
            .getOne()
    }

    UpdateInfoCompany = async (configCompany: ConfigConpanySchema, company: myJwtPayload): Promise<ConfigConpanySchema| null> => {
        const configUpdate: ConfigConpanySchema = configCompany
        const updateConfig = await this.configCompany
            .createQueryBuilder()
            .update(Company)
            .set(configUpdate)
            .where("id = :id", { id: company.id })
            .execute()
        if (updateConfig.affected === 0) return null

        return configUpdate
    }

}

export default configRepository