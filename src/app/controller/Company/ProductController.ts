import { Response, Request, NextFunction, Router } from "express";
import AuthenticateMidlleware from "../../middlewares/AuthMidlleware";
import ProductService from "../../service/company/ProductService";
import { myJwtPayload } from "../../interfaces/IAuth/IAuth";
import { ErrorResponse, SuccessResponse } from "../../utils/SuccessResponse";
import { listSchema } from "../../validations/Company/Product/List";
import { setStatus } from "../../validations/Company/Product/SetStatus";
import { getUserCach, setUserCache, deleteUserCache } from "../../../config/cache"

class ProductController {
    public router: Router
    private productService: ProductService

    constructor() {
        this.router = Router()
        this.incializeRoutes()
        this.productService = new ProductService()
    }

    private incializeRoutes() {
        this.router.get('/', AuthenticateMidlleware, this.listProduct.bind(this))
        this.router.post('/', AuthenticateMidlleware, this.createProduct.bind(this))
        this.router.put('/:id', AuthenticateMidlleware, this.updateProduct.bind(this))
        this.router.patch('/:id/status', AuthenticateMidlleware, this.setStatusProduct.bind(this))
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
            const payloudCompany: myJwtPayload = this.getCompanyFromRequest(req)
            const result = await this.productService.updateProduct(id, payloudCompany, req.body)

            res.status(200).json(
                SuccessResponse(result, undefined, "update", "Produto")
            )
        } catch (err) {
            next(err)
        }
    }


    private setStatusProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const payloudCompany: myJwtPayload = this.getCompanyFromRequest(req)
            const setStatus: setStatus = req.body


            const result = await this.productService.setStatusProducts(id, payloudCompany, setStatus)

            res.status(200).json(
                SuccessResponse(result, `Produto atulizado status: isAvailable ${result?.isAvailable}`)
            )
        } catch (err) {
            next(err)
        }
    }

    private listProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payloud: myJwtPayload = this.getCompanyFromRequest(req)
            const filter: listSchema = req.query

            const cached = await getUserCach(payloud.id, 'products')
            if (cached) return res.json({ source: 'cache', data: cached })


            const result = await this.productService.listProduct(payloud, filter)

            if (!result || result.length === 0) {
                res.status(404).json(
                    ErrorResponse('Nenhum produto encontrado!', 404)
                )
            }
            await setUserCache(payloud.id, 'products', result, 300);

            res.status(200).json(
                SuccessResponse(result, undefined, "fetch", "Produtos")
            )

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