import { DeepPartial, Repository, In } from "typeorm"
import { AppDataSource } from "../../../database/dataSource"
import { Order } from "../../entity/Order"
import { CreateOrderSchema } from "../../validations/company/order/create"
import { myJwtPayload } from "../../interfaces/i-auth/i-auth"
import { OrderItem } from "../../entity/OrderItem"
import { Company } from "../../entity/Company"
import { toMoney } from "../../utils/money"
import { Products } from "../../entity/Products"



class orderRepository {
    private orderRepo: Repository<Order>


    constructor() {
        this.orderRepo = AppDataSource.getRepository(Order)
    }

    async createOrder(data: CreateOrderSchema, company: myJwtPayload, sumFreight: number, valorTotalFinal: number): Promise<Order | null> {
        const newOrder: Order = await this.orderRepo.create({
            ...data as DeepPartial<Order>,
            totalFreight: sumFreight,
            total: valorTotalFinal,
            company: { id: company.id },
        })

        await this.orderRepo.save(newOrder)

        const items = data.items.map(item => ({
            quantity: item.quantity,
            subtotal: toMoney(item.quantity * item.price),
            price: item.price,
            order: { id: newOrder.id },
            product: { id: item.product_id }
        }))

        await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(OrderItem)
            .values(items)
            .execute()

        const orderWithItems = await this.orderRepo.findOne({
            where: { id: newOrder.id },
            relations: ["items", "items.product"]
        })
        return orderWithItems
    }

    async getCompanyFreightValue(company: myJwtPayload): Promise<Company | null> {
        return await AppDataSource
            .getRepository(Company)
            .createQueryBuilder('company')
            .select(['company.defaultFreight'])
            .where("company.id = :id", { id: company.id })
            .getOne()
    }

    async existProductid(company: myJwtPayload, productsIds: string[]):Promise<Products[]>  {
        return await AppDataSource
            .getRepository(Products)
            .find({
                where: {
                    id: In(productsIds),
                    company: {
                        id: company.id
                    }
                }
            })
    }

}

export default orderRepository