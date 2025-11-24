import { Router, Response, Request, NextFunction } from "express";
import { Repository } from "typeorm";
import configService from "../../service/company/config-service";
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import { SuccessResponse } from "../../utils/success-response";
import AuthenticateMidlleware from "../../middlewares/auth-midlleware";


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
        this.router.patch('/', AuthenticateMidlleware,  this.UpdateInfoCompany)

    }

    private getInfoCompany = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (err) {
            next(err)
        }
    }

    private UpdateInfoCompany = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            const company = this.getCompanyFromRequest(req)
            const result = await this.configCompanyService.UpdateInfoCompany(req.body, company)

            res.status(200).json(
                SuccessResponse(
                    result,
                    null,
                    undefined,
                    "update",
                    "Dados Compania"
                )
            )
        } catch (err) {
            next(err)
        }
    }

    private getCompanyFromRequest(req: Request): myJwtPayload {
        return req.user as myJwtPayload
    }
}

const configCompanyRoutes = new configController().router

export default configCompanyRoutes


