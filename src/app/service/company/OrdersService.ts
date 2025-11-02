import { myJwtPayload } from "../../interfaces/IAuth/IAuth"
import { IOrdersRegister } from "../../interfaces/IOrders/IOrders"
import orderRepository from "../../repository/Company/OrdersRepository"
import * as yup from "yup";
import ErrorExtension from "../../utils/ErrorExtension";


class orderService {
    private orderRepository: orderRepository

    constructor() {
        this.orderRepository = new orderRepository()
    }

    createOrder = async( data:IOrdersRegister , payloudCompany:myJwtPayload)=>{
        try{
            
        }catch(err){
            if(err instanceof yup.ValidationError ){
                throw new ErrorExtension(400, err.errors.join(","))
            }
        }
    }


}

export default orderService