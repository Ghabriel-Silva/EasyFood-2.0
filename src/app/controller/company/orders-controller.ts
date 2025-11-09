import { Response, Request, NextFunction, Router } from "express";
import orderService from "../../service/company/orders-service";
import AuthenticateMidlleware from "../../middlewares/auth-midlleware";
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import { SuccessResponse } from "../../utils/success-response";
import { Order } from "../../entity/Order";



class OrderControler {
    public router: Router
    private OrdeService: orderService

    constructor() {
        this.router = Router()
        this.incializedRoutes()
        this.OrdeService = new orderService()
    }
    incializedRoutes() {
        this.router.get('/', AuthenticateMidlleware, this.getOrder.bind(this)) //pega todos pedidos com com filtros ou sem 
        this.router.post('/', AuthenticateMidlleware, this.createOrder.bind(this)) //Cria uma pedido
        this.router.patch('/:id', AuthenticateMidlleware, this.updateOrder.bind(this)) //Edita um pedido parcialmente ou total
        this.router.patch('/:id/status', AuthenticateMidlleware, this.setStatusOrder.bind(this)) //seta apenas o status do pedido 'pendente', 'completado',
    }

    private getOrder = async (req: Request, res: Response, next: NextFunction) => {

    }

    private createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const company: myJwtPayload = this.getCompanyFromRequest(req)
            const result: Order = await this.OrdeService.createOrder(req.body, company)

            res.status(200).json(
                SuccessResponse(
                    result,
                    null,
                    undefined,
                    "create",
                    "Pedido "
                )
            )
        } catch (err) {
            next(err)
        }

    }
    private getCompanyFromRequest(req: Request): myJwtPayload {
        return req.user as myJwtPayload
    }


    private updateOrder = async () => { }


    private setStatusOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const company = this.getCompanyFromRequest(req)
            const orderAtualizada = await this.OrdeService.setStatusOrder(id, req.body, company)

            res.status(200).json(
                SuccessResponse(
                    orderAtualizada,
                    null,
                    undefined,
                    "update",
                    "Status"
                )
            )
        } catch (err) {
            next(err)
        }
    }
}

const orderRouters = new OrderControler().router
export default orderRouters
