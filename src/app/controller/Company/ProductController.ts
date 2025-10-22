import { Response, Request, NextFunction, Router } from "express";
import AuthenticateMidlleware from "../../middlewares/AuthMidlleware";
import ProductService from "../../service/company/ProductService";
import { myJwtPayload } from "../../interfaces/IAuth/IAuth";
import { SuccessResponse } from "../../utils/SuccessResponse";


class ProductController {
    public router:Router
    private productService: ProductService

    constructor(){
        this.router = Router()
        this.incializeRoutes()
        this.productService = new ProductService()
    }

    private incializeRoutes(){
        this.router.post('/create', AuthenticateMidlleware, this.createProduct.bind(this))
        this.router.post('/update', this.updateProduct.bind(this))
        this.router.post('/list', this.listProduct.bind(this))
        this.router.post('/inactivate', this.inactivateProduct.bind(this))
    }

   private createProduct = async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
        try{
            const payloud:myJwtPayload  = req.user as myJwtPayload
            const result = await this.productService.createProduct(req.body, payloud)

            res.status(200).json(
                SuccessResponse(result, undefined, "create", "Produto")
            )
        }catch(err){
            next(err)
        }
    }
   private updateProduct = async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
        try{
            
        }catch(err){
            next(err)
        }
    }
   private listProduct = async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
        try{
            
        }catch(err){
            next(err)
        }
    }
   private inactivateProduct = async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
        try{
            
        }catch(err){
            next(err)
        }
    }
}

const productsRoutes = new ProductController().router
export default productsRoutes