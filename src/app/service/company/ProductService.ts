import { IProduct, IProductOutput } from "../../interfaces/IProduct/IProduct";
import { ProductRepository } from "../../repository/Company/ProductRepository";
import * as yup from "yup";
import ErrorExtension from "../../utils/ErrorExtension";
import { productSchema, ProductSchema } from "../../validations/Company/Products";
import { myJwtPayload } from "../../interfaces/IAuth/IAuth";



class ProductService {
    private productRepository: ProductRepository

    constructor() {
        this.productRepository = new ProductRepository()
    }

    createProduct = async (data: IProduct, payloud: myJwtPayload) => {
        try {
            const validateProduct: ProductSchema = await productSchema.validate(data, {
                abortEarly: false
            })

            const product = await this.productRepository.createProduct(payloud, data)
            if (!product) throw new ErrorExtension(404, 'Empresa não encontrada')
            if (!product) {
                throw new Error("Produto não encontrado após salvar");
            }
            const productOutput: IProductOutput = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                expirationDate: product.expirationDate,
                isAvailable: product.isAvailable,
                description: product.description,
                created_at: product.created_at,
                updated_at: product.updated_at,
                company: {
                    id: product.company.id,
                    name: product.company.name
                },
                category: product.category ? {
                    id: product.category.id,
                    name: product.category.name
                } : null
            }



            return productOutput

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(401, err.errors.join(","))
            }
            throw err
        }
    }
    updateProduct = async () => {

    }
    listProduct = async () => {

    }
    inactivateProduct = async () => {

    }
}

export default ProductService