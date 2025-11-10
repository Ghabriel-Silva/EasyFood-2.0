import { DeepPartial, Repository, In } from "typeorm"
import { AppDataSource } from "../../../database/dataSource"
import { Order, OrderStatus } from "../../entity/Order"
import { CreateOrderSchema } from "../../validations/company/order/create"
import { myJwtPayload } from "../../interfaces/i-auth/i-auth"
import { OrderItem } from "../../entity/OrderItem"
import { Company } from "../../entity/Company"
import { toMoney } from "../../utils/money"
import { Products } from "../../entity/Products"
import { SetStatusSchemaOrder } from "../../validations/company/order/set-status"
import { IOrderSetStatus } from "../../interfaces/i-orders/i-orders"



class orderRepository {
    private orderRepo: Repository<Order>


    constructor() {
        this.orderRepo = AppDataSource.getRepository(Order)
    }

    async createOrder(
        data: CreateOrderSchema,
        company: myJwtPayload,
        sumFreight: number,
        valorTotalFinal: number
    ): Promise<Order | null> {
        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            //  criando o molde do pedido
            const newOrder: Order = queryRunner.manager.create(Order, {
                ...data as DeepPartial<Order>,
                totalFreight: sumFreight,
                total: valorTotalFinal,
                company: { id: company.id },
            })

            await queryRunner.manager.save(Order, newOrder)

            // aqui vou criar  os itens do pedido, tenho que esperar o pedido ser gerado pois preciso do id da order 
            const items = data.items.map(item => ({
                quantity: item.quantity,
                subtotal: toMoney(item.quantity * item.price),
                price: item.price,
                order: { id: newOrder.id },
                product: { id: item.product_id },
            }))

            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into(OrderItem)
                .values(items)
                .execute()

            // atualizando  os estoques dos produtos envolvidos
            for (const item of data.items) {
                await queryRunner.manager
                    .createQueryBuilder()
                    .update(Products)
                    .set({ quantity: () => `quantity - ${item.quantity}` }) // desconta direto no banco
                    .where("id = :id", { id: item.product_id })
                    .andWhere("company_id = :company_id", { company_id: company.id })
                    .execute()
            }

            // busco pedido se tudo deu certo
            const orderWithItems = await queryRunner.manager.findOne(Order, {
                where: { id: newOrder.id },
                relations: ["items", "items.product"],
            });

            //  finalizando a transação  
            await queryRunner.commitTransaction();
            return orderWithItems ?? null

        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("Erro ao criar pedido com atualização de estoque:", error);
            throw error;
        } finally {
            await queryRunner.release()
        }
    }


    async getCompanyFreightValue(company: myJwtPayload): Promise<Company | null> {
        return await AppDataSource
            .getRepository(Company)
            .createQueryBuilder('company')
            .select(['company.defaultFreight'])
            .where("company.id = :id", { id: company.id })
            .getOne()
    }

    async existProductid(company: myJwtPayload, productsIds: string[]): Promise<Products[]> {
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

    async setStatusOrder(id: string, status: SetStatusSchemaOrder, company: myJwtPayload): Promise<IOrderSetStatus | null> {
        const resultStatus = await this.orderRepo
            .createQueryBuilder()
            .update(Order)
            .set({ status: status.status })
            .where('id = :id', { id })
            .andWhere('status != :status', { status: status.status })
            .andWhere('company_id = :companyId', { companyId: company.id })
            .execute();


        return resultStatus.affected && resultStatus.affected > 0
            ? { id: id, status: status.status }
            : null
    }

}

export default orderRepository