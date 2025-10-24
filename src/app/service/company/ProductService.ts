import { IProduct, IProductOutput, IProductUpdate } from "../../interfaces/IProduct/IProduct";
import { ProductRepository } from "../../repository/Company/ProductRepository";
import * as yup from "yup";
import ErrorExtension from "../../utils/ErrorExtension";
import { productCreateSchema, ProductSchema } from "../../validations/Company/Product/Create";
import { myJwtPayload } from "../../interfaces/IAuth/IAuth";
import { productUpdateSchema, ProductUpdateSchema } from "../../validations/Company/Product/Update";
import { mapProductToOutput } from "../../utils/Products/Products";
import { Products } from "../../entity/Products";



class ProductService {
    private productRepository: ProductRepository

    constructor() {
        this.productRepository = new ProductRepository()
    }

    createProduct = async (data: IProduct, user: myJwtPayload) => {
        try {
            const validateProduct: ProductSchema = await productCreateSchema.validate(data, {
                abortEarly: false
            })

            const product = await this.productRepository.createProduct(user, validateProduct)

            if (!product) {
                throw new Error("Produto não encontrado após salvar");
            }
            const productOutput: IProductOutput = mapProductToOutput(product)

            return productOutput

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(401, err.errors.join(","))
            }
            throw err
        }
    }
    updateProduct = async (id: string, payloudCompany: myJwtPayload, update: IProductUpdate) => {
        try {
            const validateProductUpdate: ProductUpdateSchema = await productUpdateSchema.validate(update, {
                abortEarly: false
            })

            if (!id) {
                throw new ErrorExtension(401, "Id do produto invalido")
            }

            const infoProducts: Products | null = await this.productRepository.findByid(id)

            const fieldsToUpdate: any = {};

            for (const [chave, value] of Object.entries(update)) {
                if (value === undefined) continue;

                let currentValue = (infoProducts as any)[chave];

                if (chave === "price") currentValue = Number(currentValue);

                if (chave === "expirationDate") {
                    if (value === null) fieldsToUpdate[chave] = null;
                    else {
                        const currentDate = currentValue
                            ? new Date(currentValue).toISOString().split("T")[0]
                            : null;
                        const incomingDate = new Date(value).toISOString().split("T")[0];
                        if (currentDate !== incomingDate) fieldsToUpdate[chave] = value;
                    }
                    continue;
                }

                if (value !== currentValue) fieldsToUpdate[chave] = value;
            }

            if (Object.keys(fieldsToUpdate).length === 0) throw new ErrorExtension(404, 'Nenhum Atualização encontrada')


            const productUpdate = await this.productRepository.updateProduct(id, payloudCompany, fieldsToUpdate)



            if (!productUpdate) {
                throw new ErrorExtension(400, "Nenhuma encontrada")
            }
            const productOutput: IProductOutput = mapProductToOutput(productUpdate)
            
            return productOutput
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(401, err.errors.join(","))
            }
            throw err
        }
    }


    listProduct = async () => {

    }
    inactivateProduct = async () => {

    }
}

export default ProductService