import { Response, Request, NextFunction, Router } from "express";
import orderService from "../../service/company/orders-service";
import AuthenticateMidlleware from "../../middlewares/auth-midlleware";
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import { SuccessResponse } from "../../utils/success-response";
import { Order } from "../../entity/Order";
import { IOrderSetStatus } from "../../interfaces/i-orders/i-orders";
import { FilterOrderSchema } from "../../validations/company/order/filter";
import ErrorExtension from "../../utils/error-extension";



class OrderControler {
    public router: Router
    private OrdeService: orderService

    constructor() {
        this.router = Router()
        this.incializedRoutes()
        this.OrdeService = new orderService()
    }
    incializedRoutes() {
        this.router.post('/filter', AuthenticateMidlleware, this.filterOrder.bind(this)) //pega todos pedidos com com filtros ou sem 
        this.router.post('/', AuthenticateMidlleware, this.createOrder.bind(this)) //Cria uma pedido
        this.router.patch('/:id', AuthenticateMidlleware, this.updateOrder.bind(this)) //Edita um pedido parcialmente ou total
        this.router.patch('/:id/status', AuthenticateMidlleware, this.setStatusOrder.bind(this)) //seta apenas o status do pedido 'pendente', 'completado',
    }



    private filterOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dataFilter: FilterOrderSchema = req.body
            const payloud =  await this.getCompanyFromRequest(req)
         
            const result = await this.OrdeService.filterOrder(dataFilter, payloud)
            console.log(result, 'chegou aqui')
            res.status(200).json(
                result
            )

        } catch (err) {
            next(err)
        }
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


    private updateOrder = async () => { }


    private setStatusOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const company = this.getCompanyFromRequest(req)
            const orderAtualizada: IOrderSetStatus | undefined = await this.OrdeService.setStatusOrder(id, req.body, company)

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

    private getCompanyFromRequest(req: Request): myJwtPayload {
        return req.user as myJwtPayload
    }
}

const orderRouters = new OrderControler().router
export default orderRouters
