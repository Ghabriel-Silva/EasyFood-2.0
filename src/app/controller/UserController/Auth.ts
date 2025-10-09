import { Router, Request, Response} from "express";

class AuthUser {
    public router: Router
    constructor() {
        this.router = Router(),
            this.inicializeRoutes()
    }

    private inicializeRoutes(){
        this.router.post('/login')
        this.router.post('/register')
    }


    private async registerUser(req:Request, res:Response):Promise<void>{
        
    }

}

const loginRegisterUserRouter = new AuthUser().router

export default loginRegisterUserRouter