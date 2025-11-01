import { Repository } from "typeorm"
import { Order } from "../../entity/Order"
import { AppDataSource } from "../../../database/dataSource"
import orderRepository from "../../repository/Company/PedidoRepository"


class orderService {
    private orderRepository: orderRepository

    constructor() {
        this.orderRepository = new orderRepository()
    }


}

export default orderService