import { Repository } from "typeorm";
import { Products } from "../../entity/Products";
import { AppDataSource } from "../../../database/dataSource";


export class ProductRepository {
    private productRepo: Repository<Products>

    constructor() {
        this.productRepo = AppDataSource.getRepository(Products)
    }

    async createProduct() {

    }
    async updateProduct() {

    }
    async listProduct() {

    }
    async inactivateProduct() {

    }

}