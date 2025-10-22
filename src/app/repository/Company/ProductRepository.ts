import { Repository } from "typeorm";
import { Products } from "../../entity/Products";
import { AppDataSource } from "../../../database/dataSource";
import { myJwtPayload } from "../../interfaces/IAuth/IAuth";
import { IProduct, IProductOutput } from "../../interfaces/IProduct/IProduct";


export class ProductRepository {
    private productRepository: Repository<Products>

    constructor() {
        this.productRepository = AppDataSource.getRepository(Products)
    }



    async createProduct(payloud: myJwtPayload, data: IProduct): Promise<Products | null> {
        const newProduct = this.productRepository.create({
            ...data,
            company: { id: String(payloud.id) },
            category: { id: String(data.category_id) }
        })

        await this.productRepository.save(newProduct)

        const productWithRelations = await this.productRepository.findOne({
            where: { id: newProduct.id },
            relations: ['company', 'category']
        })

        return productWithRelations
    }
    async updateProduct() {

    }
    async listProduct() {

    }
    async inactivateProduct() {

    }

}