import { Router } from "express";
import userRouter from "../controller/Company/CompanyAuthController";
import adminRouter from "../controller/Admin/AdminControler";
import productsRoutes from "../controller/Company/ProductController";
import orderRouters from "../controller/Company/PedidosController";

const routers = Router()

routers.use('/company', userRouter)
routers.use('/admin', adminRouter)
routers.use('/product', productsRoutes)
routers.use('/order', orderRouters )

export default routers