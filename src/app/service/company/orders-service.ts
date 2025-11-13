import { myJwtPayload } from "../../interfaces/i-auth/i-auth"
import { IFilterOrder, IOrderSetStatus, IOrdersRegister } from "../../interfaces/i-orders/i-orders"
import orderRepository from "../../repository/company/orders-repository"
import * as yup from "yup";
import ErrorExtension from "../../utils/error-extension";
import { createOrderSchema, CreateOrderSchema } from "../../validations/company/order/create";
import { Order } from "../../entity/Order";
import { Company } from "../../entity/Company";
import { toMoney } from "../../utils/money";
import { Products } from "../../entity/Products";
import { SetStatusSchemaOrder, setStatusSchemaOrder } from "../../validations/company/order/set-status";
import { filterOrderSchema, FilterOrderSchema } from "../../validations/company/order/filter";



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
            });

            //  Valida produtos existentes da empresa
            const idProducts = validateOrder.items.map(item => item.product_id);
            const productsDb: Products[] = await this.orderRepository.existProductid(payloudCompany, idProducts)

            if (productsDb.length !== idProducts.length) {
                const invalidProducts = validateOrder.items
                    .filter(item => !productsDb.some(p => p.id === item.product_id))
                    .map(item => item.name)

                throw new ErrorExtension(
                    404,
                    `Os seguintes produtos não foram encontrados: ${invalidProducts.join(', ')}`
                );
            }

            //  Regra de frete
            if (validateOrder.isFreightApplied) {
                const freteCompany: Company | null = await this.orderRepository.getCompanyFreightValue(payloudCompany)
                if (!freteCompany) {
                    throw new ErrorExtension(
                        404,
                        'Valor do frete da compania não encontrado'
                    );
                }
                freteDefault = freteCompany.defaultFreight
            }

            const freightDefaultNum: number = toMoney(freteDefault)
            const customFreight: number = typeof validateOrder.customFreight === 'number' ? validateOrder.customFreight : 0
            const sumFreight: number = toMoney(customFreight + freightDefaultNum)

            //  Cálculos de valores do pedido
            const adicionalValue = toMoney(validateOrder.additionalValue)
            const discountValue = toMoney(validateOrder.discountValue)

            const valorItems: number = validateOrder.items.reduce((acc, item) => {
                return toMoney(acc + item.price * item.quantity)
            }, 0);

            const valorTotal = toMoney(adicionalValue + sumFreight + valorItems)

            if (valorTotal < discountValue) {
                throw new ErrorExtension(422, 'O Desconto não pode ser maior que o valor Total da Compra')
            }

            const valorTotalFinal: number = toMoney(valorTotal - discountValue)

            //  Valida quantidades no estoque sem atualizar aqui
            for (const item of validateOrder.items) {
                const productInDB = productsDb.find(p => p.id === item.product_id)
                if (!productInDB || productInDB.quantity === null) continue

                if (item.quantity > productInDB.quantity) {
                    throw new ErrorExtension(
                        400,
                        `Quantidade maior que a disponível para o produto ${productInDB.name}`
                    );
                }
            }

            // cria pedido  e  atualiza estoque em um

            const dataOrder: Order | null = await this.orderRepository.createOrder(
                validateOrder,
                payloudCompany,
                sumFreight,
                valorTotalFinal
            );

            if (!dataOrder) {
                throw new ErrorExtension(400, 'Erro ao salvar Pedido');
            }

            return dataOrder;

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","));
            }
            throw err;
        }
    }

    setStatusOrder = async (id: string, statusOrder: string, payloudCompany: myJwtPayload): Promise<IOrderSetStatus | undefined> => {
        try {
            //primeiro validação de entrada
            const statusValid: SetStatusSchemaOrder = await setStatusSchemaOrder.validate(statusOrder, {
                abortEarly: false
            })
            //Verificar se o produto que quero setar existe no banco se existir valido se o valor setado não é o mesmo que quero setar 
            const result: IOrderSetStatus | null = await this.orderRepository.setStatusOrder(id, statusValid, payloudCompany)

            if (result === null || !result) {
                throw new ErrorExtension(
                    409,
                    "Não foi possível atualizar o status do pedido.")
            }
            return result

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","))
            }
            throw err
        }
    }

    filterOrder = async (dataFilter: FilterOrderSchema, company: myJwtPayload) => {
        try {
            if(!dataFilter.startDate && dataFilter.finalDate){
                throw new ErrorExtension(400, "Por favor, informe a data inicial ao definir uma data final.")
            }
            const validadeFilterOrder = await filterOrderSchema.validate(dataFilter, {
                abortEarly: false
            })


            const orderFilterResul = await this.orderRepository.filterOrder( company, validadeFilterOrder)

           


            return orderFilterResul

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const mesagemUnicas = [...new Set(err.errors)]
                throw new ErrorExtension(400, mesagemUnicas.join(","))
            }
            throw err
        }
    }


}

export default orderService