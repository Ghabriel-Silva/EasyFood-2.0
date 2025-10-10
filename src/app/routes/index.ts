import { Router } from "express";
import userRouter from "../controller/UserController/Auth";

const routers = Router()

routers.use('/auth', userRouter)

export default routers