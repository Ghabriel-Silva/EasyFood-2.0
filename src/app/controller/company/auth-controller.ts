import { Router, Request, Response, NextFunction } from "express";
import { UserAuthService } from "../../service/company/auth-service";
import { ILoginResponse, IRegister } from "../../interfaces/i-auth/i-auth";
import { SuccessResponse } from "../../utils/success-response";
import AuthenticateMidlleware from "../../middlewares/auth-midlleware";

class AuthUser {
    public router: Router
    private userAuthService: UserAuthService

    constructor() {
        this.router = Router(),
            this.userAuthService = new UserAuthService(),
            this.inicializeRoutes()
    }

    private inicializeRoutes() {
        this.router.post('/login', this.loginUser.bind(this))
        this.router.get('/info', AuthenticateMidlleware,  this.infoUser)
    }


    private loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await this.userAuthService.login(req.body)
            if (data) {
                res.status(201).json(
                    SuccessResponse<ILoginResponse>(
                        data,
                        null,
                        `Bem vindo de novo ${data.user.name}`
                    )
                )
            }
        } catch (error) {
            next(error)
        }
    }

    private infoUser = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            res.status(200).json(
                "oi"
            )
        } catch(erro) {
            next(erro)
        }
    }

}

const userRouter = new AuthUser().router

export default userRouter