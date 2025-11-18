import { NextFunction, Router, Response, Request } from "express";
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import categoryService from "../../service/company/category-service";
import { SuccessResponse } from "../../utils/success-response";
import AuthenticateMidlleware from "../../middlewares/auth-midlleware";


class categoryController {
    router: Router
    categoryService: categoryService

    constructor() {
        this.router = Router()
        this.inicializedRoutes()
        this.categoryService = new categoryService()
    }

    private inicializedRoutes() {
        this.router.get('/'),
            this.router.post('/', AuthenticateMidlleware, this.createCategory),
            this.router.patch('/:id/status')
    }


    private createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const company: myJwtPayload = this.getcompanyFromRequest(req)
        const { name } = req.body
        

        const result = await this.categoryService.createCategory(name, company)

        res.status(200).json(
            SuccessResponse(
                result,
                null,
                undefined,
                "create",
                "categoria"
            )
        )
    }

    private setStatusCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    }

    private getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    }

    private getcompanyFromRequest(req: Request): myJwtPayload {
        return req.user as myJwtPayload
    }
}

const categoryRoutes = new categoryController().router
export default categoryRoutes