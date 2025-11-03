import { Router, Request, Response, NextFunction } from "express";
import { SuccessResponse } from "../../utils/success-response";
import { AdminService } from "../../service/admin/admin-service";


class Admin {
    public router: Router
    private adminsService: AdminService
    constructor() {
        this.router = Router()
        this.adminsService = new AdminService()
        this.inicializedRoutes()
    }

    private inicializedRoutes() {
        this.router.post('/register', this.registerUser.bind(this))
    }


    private registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.adminsService.register(req.body)
            const { password, ...safeUser } = user

            res.status(201).json(
                SuccessResponse(safeUser,null, undefined, "create", "Usuario")
            )

        } catch (error) {
            next(error)
        }
    }

}

const adminRouter = new Admin().router
export default adminRouter