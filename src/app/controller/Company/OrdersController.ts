import { Response, Request, NextFunction, Router } from "express";
import orderService from "../../service/company/OrdersService";
import AuthenticateMidlleware from "../../middlewares/AuthMidlleware";
import { IOrdersRegister } from "../../interfaces/IOrders/IOrders";
import { myJwtPayload } from "../../interfaces/IAuth/IAuth";



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

    private createOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const company: myJwtPayload = this.getCompanyFromRequest(req)
            const result = this.OrdeService.createOrder(req.body, company)
        } catch (err) {
            next(err)
        }

    }
    private getCompanyFromRequest(req: Request): myJwtPayload {
        return req.user as myJwtPayload
    }


    private updateOrder = async () => { }


    private setStatusOrder = async () => { }
}

const orderRouters = new OrderControler().router
export default orderRouters
