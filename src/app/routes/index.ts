import { Router } from "express";
import loginRegisterUserRouter from "../controller/UserController/Auth";

const routers = Router()

routers.use('/user/auth', loginRegisterUserRouter)

export default routers