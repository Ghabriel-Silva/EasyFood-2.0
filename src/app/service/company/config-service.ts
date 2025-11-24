import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import { IConfigCompany } from "../../interfaces/i-config/i-config";
import configRepository from "../../repository/company/config-repository";
import ErrorExtension from "../../utils/error-extension";
import { ConfigConpanySchema, configConpanySchema } from "../../validations/company/config/config-companyPatch";
import * as yup from 'yup';



class configService {
    private configCompanyRepo: configRepository

    constructor() {
        this.configCompanyRepo = new configRepository()
    }

    getInfoCompany = async () => {

    }

    UpdateInfoCompany = async (config: any, company: myJwtPayload):Promise<IConfigCompany> => {
        try {
            const validateFrete: ConfigConpanySchema = await configConpanySchema.validate(config, {
                abortEarly: false
            })

            const newValue:IConfigCompany | null = await this.configCompanyRepo.UpdateInfoCompany(validateFrete, company)

            if(newValue == null){
                throw new ErrorExtension(
                    400, 
                    'Dados Não atualizados'
                )
            }
            const converteValue  =  Number(newValue.defaultFreight?.toFixed(2))
            newValue.defaultFreight = converteValue
            return newValue

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","))
            }
            throw err
        }
    }


}

export default configService