import { myJwtPayload } from "../../interfaces/i-auth/i-auth"
import { IOrdersRegister } from "../../interfaces/i-orders/i-orders"
import orderRepository from "../../repository/company/orders-repository"
import * as yup from "yup";
import ErrorExtension from "../../utils/error-extension";
import { createOrderSchema, CreateOrderSchema } from "../../validations/company/order/create";
import { Order } from "../../entity/Order";
import { Company } from "../../entity/Company";
import { toMoney } from "../../utils/money";
import { Products } from "../../entity/Products";



class orderService {
    private orderRepository: orderRepository

    constructor() {
        this.orderRepository = new orderRepository()
    }

    createOrder = async (data: IOrdersRegister, payloudCompany: myJwtPayload): Promise<Order> => {
        try {
            let freteDefault: number | undefined


            const validateOrder: CreateOrderSchema = await createOrderSchema.validate(data, {
                abortEarly: false
            })

            //Regra de validação de produtos tem que existir e pertener a empresa que criou o produto
            const idProducts = validateOrder.items.map(item => item.product_id)

            const validProducts: Products[] = await this.orderRepository.existProductid(payloudCompany, idProducts)

            console.log(validProducts)
            if (validProducts.length !== idProducts.length) {
                const invalidIds: string[] = idProducts.filter(id => !validProducts.find(p => p.id === id))
                throw new ErrorExtension(404, `Produtos inválidos: ${invalidIds.join(', ')}`)
            }

            //Regra de negócio para somar valores de fretes
            if (validateOrder.isFreightApplied) {
                const freteCompany: Company | null = await this.orderRepository.getCompanyFreightValue(payloudCompany)
                if (!freteCompany) {
                    throw new ErrorExtension(404, 'Valor do frete da compania não encontrado')
                }
                freteDefault = freteCompany.defaultFreight
            }

            const freightDefaultNum: number = toMoney(freteDefault)

            const customFreight: number =
                typeof validateOrder.customFreight === 'number'
                    ? validateOrder.customFreight
                    : 0

            const sumFreight: number = toMoney(customFreight + freightDefaultNum)


            //Regra de negócio para somar valores de do pedido e adcional e deconto
            const adicionalValue = toMoney(validateOrder.additionalValue);
            const discountValue = toMoney(validateOrder.discountValue);


            const valorItems: number = validateOrder.items.reduce((acc, item) => {
                const subtotal = item.price * item.quantity
                const soma = acc + subtotal
                return toMoney(soma)
            }, 0)

            const valorTotal = toMoney(adicionalValue + sumFreight + valorItems)
            if (valorTotal < discountValue) {
                throw new ErrorExtension(422, 'O Desconto não pode ser mais que o valor Total da Compra')
            }

            const valorTotalFinal: number = toMoney(valorTotal - discountValue)

            const dataOrder: Order | null = await this.orderRepository.createOrder(validateOrder, payloudCompany, sumFreight, valorTotalFinal)
            if (!dataOrder) {
                throw new ErrorExtension(400, 'Erro ao salvar Pedido')
            }
            return dataOrder

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","))
            }
            throw err
        }
    }


}

export default orderService