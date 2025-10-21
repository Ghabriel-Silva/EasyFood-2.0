import { Response, Request, NextFunction, Router } from "express";


class ProductController {
    public router:Router
    //Private ProductService

    constructor(){
        this.router = Router()
    }

    private incializeRoutes(){
        this.router.post('/create', this.createProduct.bind(this))
        this.router.post('/update', this.updateProduct.bind(this))
        this.router.post('/list', this.listProduct.bind(this))
        this.router.post('/inactivate', this.inactivateProduct.bind(this))
    }

   private createProduct = async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
        try{
            
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