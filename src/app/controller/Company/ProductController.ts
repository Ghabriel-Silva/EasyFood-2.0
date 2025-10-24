import { Response, Request, NextFunction, Router } from "express";
import AuthenticateMidlleware from "../../middlewares/AuthMidlleware";
import ProductService from "../../service/company/ProductService";
import { myJwtPayload } from "../../interfaces/IAuth/IAuth";
import { SuccessResponse } from "../../utils/SuccessResponse";


class ProductController {
    public router: Router
    private productService: ProductService

    constructor() {
        this.router = Router()
        this.incializeRoutes()
        this.productService = new ProductService()
    }

    private incializeRoutes() {
        this.router.post('/create', AuthenticateMidlleware, this.createProduct.bind(this))
        this.router.put('/update/:id', AuthenticateMidlleware, this.updateProduct.bind(this))
        this.router.patch('/inactivate/:id', AuthenticateMidlleware, this.inactivateProduct.bind(this))
        this.router.post('/list', this.listProduct.bind(this))
    }

    private createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = this.getCompanyFromRequest(req)
            const result = await this.productService.createProduct(req.body, user)

            res.status(200).json(
                SuccessResponse(result, undefined, "create", "Produto")
            )
        } catch (err) {
            next(err)
        }
    }
    private updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const payloudCompany = this.getCompanyFromRequest(req)
            const result = await this.productService.updateProduct(id, payloudCompany, req.body)

            res.status(200).json(
                SuccessResponse(result, undefined, "update", "Produto")
            )
        } catch (err) {
            next(err)
        }
    }
    private inactivateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.json('tamo ai')
        } catch (err) {
            next(err)
        }
    }


    private listProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

        } catch (err) {
            next(err)
        }
    }



    private getCompanyFromRequest(req: Request): myJwtPayload {
        return req.user as myJwtPayload
    }
}

const productsRoutes = new ProductController().router
export default productsRoutes