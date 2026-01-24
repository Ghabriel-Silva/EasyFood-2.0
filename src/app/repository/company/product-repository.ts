import { Repository } from "typeorm";
import { Products } from "../../entity/Products";
import { AppDataSource } from "../../../database/dataSource";
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import { IProduct, IProductsReturn, IProductStatus } from "../../interfaces/i-product/i-product";
import { listSchema } from "../../validations/company/product/list";
import { Company } from "../../entity/Company";



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
            uni_medida: data.uni_medida ?? undefined,
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
    async getCompanyFrete(company: myJwtPayload) {
        return await AppDataSource
            .getRepository(Company)
            .createQueryBuilder('company')
            .select(['company.defaultFreight'])
            .where("company.id = :id", { id: company.id })
            .getOne()
    }

    async listProduct(filters: listSchema, company: myJwtPayload): Promise<IProductsReturn> {
        const frete: Company | null = await this.getCompanyFrete(company)

        const order: Record<string, 'ASC' | 'DESC'> = {}
        const where: any = {
            company: { id: company.id }

        }

        if (filters.price === 'maior') order.price = 'DESC'
        else if (filters.price === 'menor') order.price = 'ASC'

        if (filters.status === 'active') where.isAvailable = true
        else if (filters.status === 'desactivated') where.isAvailable = false

        const products: Products[] = await this.productRepository.find({
            where,
            order
        })

        return {
            data:products, 
            frete:frete, 
            fromCache:false
        } as IProductsReturn
    }
}