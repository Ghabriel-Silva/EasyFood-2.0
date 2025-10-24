import { Repository } from "typeorm";
import { Products } from "../../entity/Products";
import { AppDataSource } from "../../../database/dataSource";
import { myJwtPayload } from "../../interfaces/IAuth/IAuth";
import { IProduct, IProductOutput, IProductUpdate } from "../../interfaces/IProduct/IProduct";
import { ProductUpdateSchema } from "../../validations/Company/Product/Update";
import { object } from "yup";


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



    //Pega o produto pelo id dele e verifica se esta vinculado ao usuario payloud 
    async findByid(id: string, company: myJwtPayload): Promise<Products | null> {
        return await this.productRepository.findOne({
            where: {
                id,
                company: { id: company.id }
            },
            relations: ["company", "category"]
        });
    }


    async listProduct() {

    }
    async inactivateProduct() {

    }

}