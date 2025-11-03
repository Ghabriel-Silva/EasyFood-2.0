import { myJwtPayload } from "../../interfaces/i-auth/i-auth"
import { IOrdersRegister } from "../../interfaces/i-orders/i-orders"
import orderRepository from "../../repository/company/orders-repository"
import * as yup from "yup";
import ErrorExtension from "../../utils/error-extension";
import { createOrderSchema, CreateOrderSchema } from "../../validations/company/order/create";



class orderService {
    private orderRepository: orderRepository

    constructor() {
        this.orderRepository = new orderRepository()
    }

    createOrder = async (data: IOrdersRegister, payloudCompany: myJwtPayload) => {
        try {
            const validateOrder: CreateOrderSchema = await createOrderSchema.validate(data, {
                abortEarly: false
            })

            

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","))
            }
        }
    }


}

export default orderService