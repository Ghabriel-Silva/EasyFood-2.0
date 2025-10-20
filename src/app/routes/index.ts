import { Router } from "express";
import userRouter from "../controller/UserController/Auth";
import adminRouter from "../controller/AdminController/Admin";

const routers = Router()

routers.use('/company', userRouter)
routers.use('/admin', adminRouter)

export default routers