import * as yup from 'yup';
import { OrderStatus, PaymentMethod } from '../../../entity/Order';


export const filterOrderSchema = yup.object({
    status: yup
        .array()
        .of(yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus)))
        .min(1, "É necessário pelo menos um status")
        .notRequired(),

    paymentMethod: yup
        .array()
        .of(yup.mixed<PaymentMethod>().oneOf(Object.values(PaymentMethod)))
        .min(1, "É necessário pelo menos um metodo de pagamento")
        .notRequired(),

    startData: yup
        .date()
        .typeError('Data inválida')
        .notRequired(),

    finalData: yup
        .date()
        .typeError('Data inválida')
        .notRequired(),

    clientName: yup
        .string()
        .typeError('O nome dever ser apenas letras')
        .notRequired()
})
export type FilterOrderSchema = yup.InferType<typeof filterOrderSchema>