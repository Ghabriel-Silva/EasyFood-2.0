import { Router, Request, Response, NextFunction } from "express";
import { UserAuthService } from "../../service/UserService/Auth";

class AuthUser {
    public router: Router
    private userAuthService:UserAuthService

    constructor() {
        this.router = Router(),
        this.userAuthService = new UserAuthService(),
        this.inicializeRoutes()

    }

    private inicializeRoutes() {
        this.router.post('/login')
        this.router.post('/register', this.registerUser.bind(this))
    }


    private  registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void>=>  {
        try {
            const result = await this.userAuthService.register(req.body)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

}

const userRouter = new AuthUser().router

export default userRouter