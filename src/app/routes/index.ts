import { Router } from "express";
import userRouter from "../controller/company/auth-controller";
import adminRouter from "../controller/admin/admin-controler";
import productsRoutes from "../controller/company/product-controller";
import orderRouters from "../controller/company/orders-controller";

const routers = Router()

routers.use('/company', userRouter)
routers.use('/admin', adminRouter)
routers.use('/product', productsRoutes)
routers.use('/order', orderRouters )

export default routers