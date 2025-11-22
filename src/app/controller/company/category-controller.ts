import { NextFunction, Router, Response, Request } from "express";
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import categoryService from "../../service/company/category-service";
import { SuccessResponse } from "../../utils/success-response";
import AuthenticateMidlleware from "../../middlewares/auth-midlleware";
import { ISetCategory } from "../../interfaces/i-category/i-cateegory";
import { Category } from "../../entity/Category";
import { SetStatusSchemaValidation } from "../../validations/company/category/set-status";


class categoryController {
    router: Router
    categoryService: categoryService

    constructor() {
        this.router = Router()
        this.inicializedRoutes()
        this.categoryService = new categoryService()
    }

    private inicializedRoutes() {
        this.router.get('/', AuthenticateMidlleware, this.getCategory),
            this.router.post('/', AuthenticateMidlleware, this.createCategory),
            this.router.patch('/:id/status', AuthenticateMidlleware, this.setStatusCategory)
        this.router.put('/:id', AuthenticateMidlleware, this.updateName)
    }


    private createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const company: myJwtPayload = this.getcompanyFromRequest(req)
            const name = req.body
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
        } catch (err) {
            next(err)
        }
    }

    private setStatusCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const status: string = req.body
            const company = this.getcompanyFromRequest(req)

            const result: ISetCategory | undefined = await this.categoryService.setStatusCategory(id, status, company)

            res.status(200).json(
                SuccessResponse(
                    result,
                    null,
                    undefined,
                    "update",
                    "Status categoria"
                )
            )
        } catch (err) {
            next(err)
        }
    }

    private updateName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newName: string = req.body
            const { id } = req.params
            console.log(id)

            const company = this.getcompanyFromRequest(req)

            const result: Category = await this.categoryService.updateName(newName, id, company)

            res.status(200).json(
                SuccessResponse(
                    result,
                    null,
                    undefined,
                    "update",
                    "Nome da categoria"
                )
            )
        } catch (err) {
            next(err)
        }
    }


    private getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const  status:SetStatusSchemaValidation  = req.query 
        console.log(status)
        const company = this.getcompanyFromRequest(req)


        const result = await this.categoryService.getCategory(status, company)
        res.status(200).json(
            SuccessResponse(
                result,
                null,
                undefined,
                "fetch",
                "Status "
            )
        )
    }

    private getcompanyFromRequest(req: Request): myJwtPayload {
        return req.user as myJwtPayload
    }
}

const categoryRoutes = new categoryController().router
export default categoryRoutes