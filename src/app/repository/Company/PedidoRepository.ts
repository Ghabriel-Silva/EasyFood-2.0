import { Repository } from "typeorm"
import { AppDataSource } from "../../../database/dataSource"
import { Order } from "../../entity/Order"

class orderRepository {
    private oderRepo:Repository<Order>

    constructor(){
        this.oderRepo = AppDataSource.getRepository(Order)
    }
}

export default orderRepository