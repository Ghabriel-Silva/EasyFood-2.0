import { Router } from "express";
import orderService from "../../service/company/PedidoService";
import AuthenticateMidlleware from "../../middlewares/AuthMidlleware";



class OrderControler {
    public router: Router
    private orderService: orderService

    constructor() {
        this.router = Router()
        this.incializedRoutes()
        this.orderService = new orderService()
    }
    incializedRoutes() {
        this.router.get('/', AuthenticateMidlleware, this.getOrder.bind(this)) //pega todos pedidos com com filtros ou sem 
        this.router.post('/', AuthenticateMidlleware, this.createOrder.bind(this)) //Cria uma pedido
        this.router.patch('/:id', AuthenticateMidlleware, this.updateOrder.bind(this)) //Edita um pedido parcialmente ou total
        this.router.patch('/:id/status', AuthenticateMidlleware, this.setStatusOrder.bind(this)) //seta apenas o status do pedido 'pendente', 'completado',
    }

    private getOrder = async()=>{

    }

    private createOrder = async () => { }


    private updateOrder = async ()=>{}


    private setStatusOrder = async ()=>{}
}

const orderRouters = new OrderControler().router
export default orderRouters
