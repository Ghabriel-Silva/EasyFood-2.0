import { OrderStatus, PaymentMethod } from "../../entity/Order"
import { OrderItem } from "../../entity/OrderItem";

export interface IOrdersRegister {
    customerName?: string;
    customerAddress?: string;
    customerPhone?: string;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    additionalValue?: number;
    discountValue?: number
    total: number;
    items: OrderItem[]
}