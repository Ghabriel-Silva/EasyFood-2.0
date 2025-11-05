import { myJwtPayload } from "../../interfaces/i-auth/i-auth"
import { IOrdersRegister } from "../../interfaces/i-orders/i-orders"
import orderRepository from "../../repository/company/orders-repository"
import * as yup from "yup";
import ErrorExtension from "../../utils/error-extension";
import { createOrderSchema, CreateOrderSchema } from "../../validations/company/order/create";
import { Order } from "../../entity/Order";
import { Company } from "../../entity/Company";



class orderService {
    private orderRepository: orderRepository

    constructor() {
        this.orderRepository = new orderRepository()
    }

    createOrder = async (data: IOrdersRegister, payloudCompany: myJwtPayload) => {
        try {
            let freteDefault: number | undefined
            const validateOrder: CreateOrderSchema = await createOrderSchema.validate(data, {
                abortEarly: false
            })

            //Pega o valor padrão de frete que a empresa definio em Confg
            if (validateOrder.isFreightApplied) {
                const freteCompany: Company | null = await this.orderRepository.getCompanyFreightValue(payloudCompany)
                if (!freteCompany) {
                    throw new ErrorExtension(404, 'Valor do frete da compania não encontrado')
                }
                freteDefault = freteCompany.defaultFreight
            }

            //Se a empresa definir um valor customizado  para o pedido ira pegar esse valor 
            const customFreight: number =
                typeof validateOrder.customFreight === 'number'
                    ? validateOrder.customFreight
                    : 0

            //Soma valor de frete Default e Custon  se caso o frete da empresa vier como undefine define 0 
            const sumFreight: number =
                (freteDefault ?? 0) + (customFreight ?? 0)


            const dataOrder: Order | null = await this.orderRepository.createOrder(validateOrder, payloudCompany, sumFreight)
            if (!dataOrder) {
                throw new ErrorExtension(400, 'Erro ao salvar Pedido')
            }
            return dataOrder

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","))
            }
            throw err;
        }
    }


}

export default orderService