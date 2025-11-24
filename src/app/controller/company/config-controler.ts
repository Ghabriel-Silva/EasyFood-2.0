import { Router, Response, Request, NextFunction } from "express";
import { Repository } from "typeorm";
import configService from "../../service/company/config-service";


class configController {
    public router: Router
    private configCompanyService: configService

    constructor() {
        this.router = Router()
        this.configCompanyService = new configService()
        this.inicializedRoutes()
    }

    inicializedRoutes() {
        this.router.get('/')
        this.router.patch('/')

    }

    private getInfoCompany = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (err) {
            next(err)
        }
    }

    private UpdateInfoCompany = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (err) {
            next(err)
        }
    }
}

const configCompanyRoutes = new configController().router

export default configCompanyRoutes


