import configRepository from "../../repository/company/config-repository";



class configService {
    private configCompanyRepo: configRepository

    constructor() {
        this.configCompanyRepo = new configRepository()
    }

    private getInfoCompany = async () => {

    }

    private UpdateInfoCompany = async () => {

    }
}

export default configService