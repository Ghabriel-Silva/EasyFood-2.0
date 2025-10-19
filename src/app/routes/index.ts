import { Router } from "express";
import userRouter from "../controller/UserController/Auth";

const routers = Router()

routers.use('/user', userRouter)
routers.use('/admin', userRouter)

export default routers