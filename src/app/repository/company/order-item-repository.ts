import {  Repository } from "typeorm"
import { AppDataSource } from "../../../database/dataSource"

import { OrderItem } from "../../entity/OrderItem"


class orderItemRepository {
    private orderItemRepo: Repository<OrderItem>

    constructor() {
        this.orderItemRepo = AppDataSource.getRepository(OrderItem)
    }

}

export default orderItemRepository