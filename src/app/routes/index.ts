import { Router } from "express";
import userRouter from "../controller/Company/CompanyAuthController";
import adminRouter from "../controller/Admin/AdminControler";

const routers = Router()

routers.use('/company', userRouter)
routers.use('/admin', adminRouter)

export default routers