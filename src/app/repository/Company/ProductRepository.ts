import { LessThan, MoreThan, Repository } from "typeorm";
import { Products } from "../../entity/Products";
import { AppDataSource } from "../../../database/dataSource";
import { myJwtPayload } from "../../interfaces/IAuth/IAuth";
import { IProduct, IProductStatus } from "../../interfaces/IProduct/IProduct";
import { listSchema } from "../../validations/Company/Product/List";



export class ProductRepository {
    private productRepository: Repository<Products>

    constructor() {
        this.productRepository = AppDataSource.getRepository(Products)
    }



    async createProduct(user: myJwtPayload, data: IProduct): Promise<Products | null> {
        const newProduct = this.productRepository.create({
            name: data.name,
            price: data.price,
            quantity: data.quantity ?? undefined,
            expirationDate: data.expirationDate ?? undefined,
            description: data.description ?? undefined,
            isAvailable: true,
            company: { id: user.id },
            category: data.category_id ? { id: data.category_id } : undefined,
        }) //?? undefined garante que, se o valor for null ou undefined, o campo será omitido, que é exatamente o que o TypeORM espera

        await this.productRepository.save(newProduct)

        const productWithRelations = await this.productRepository.findOne({
            where: { id: newProduct.id },
            relations: ['company', 'category']
        })

        return productWithRelations
    }


    async updateProduct(id: string, company: myJwtPayload, update: any): Promise<Products | null> {

        const updateData = await this.productRepository
            .createQueryBuilder()
            .update(Products)
            .set(update)
            .where("id = :id", { id })
            .andWhere("company_id = :company_id", { company_id: company.id })
            .execute();

        if (updateData.affected === 0) return null


        const productWithRelations = await this.productRepository.findOne({
            where: {
                id: id,
                company: {
                    id: company.id
                }
            },
            relations: ['company', 'category']
        })
        return productWithRelations
    }

    async findByid(id: string, company: myJwtPayload): Promise<Products | null> {
        return await this.productRepository.findOne({
            where: {
                id,
                company: { id: company.id }
            },
            relations: ["company", "category"]
        });
    }

    async setStatusProduct(id: string, company: myJwtPayload, setStatus: boolean): Promise<IProductStatus | null> {
        const updateStatus = await this.productRepository
            .createQueryBuilder()
            .update(Products)
            .set({ isAvailable: setStatus })
            .where("id = :id", { id })
            .andWhere("company_id = :company_id", { company_id: company.id })
            .execute()

        if (updateStatus.affected === 0) return null

        return { id, isAvailable: setStatus }
    }


    async listProduct(filters: listSchema, company: myJwtPayload): Promise<Products[]> {
        const order: Record<string, 'ASC' | 'DESC'> = {}
        const where: any = {
            company: { id: company.id }
        }

        if (filters.price === 'maior') order.price = 'DESC'
        else if (filters.price === 'menor') order.price = 'ASC'

        if (filters.status === 'active') where.isAvailable = true
        else if (filters.status === 'desactivated') where.isAvailable = false

        const products:Products[] = await this.productRepository.find({
            where,
            order
        })

        return products
    }
}