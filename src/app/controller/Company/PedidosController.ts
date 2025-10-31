import { Router } from "express";


class PedidoControler {
    public router: Router
    // private pedidosService

    constructor(){
        this.router = Router()
        this.incializedRoutes()
    }
    incializedRoutes(){

    }

    //metodos diferentes 
}

const pedidosRouter = new PedidoControler().router
export default pedidosRouter
