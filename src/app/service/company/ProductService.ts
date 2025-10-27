import { IProduct, IProductOutput, IProductStatus, IProductUpdate } from "../../interfaces/IProduct/IProduct";
import { ProductRepository } from "../../repository/Company/ProductRepository";
import * as yup from "yup";
import ErrorExtension from "../../utils/ErrorExtension";
import { productCreateSchema, ProductSchema } from "../../validations/Company/Product/Create";
import { myJwtPayload } from "../../interfaces/IAuth/IAuth";
import { productUpdateSchema, ProductUpdateSchema } from "../../validations/Company/Product/Update";
import { mapProductToOutput } from "../../utils/Products/Products";
import { Products } from "../../entity/Products";
import { listSchema, listSchemaProducts } from "../../validations/Company/Product/List";
import { setStatus, setStatusSchema } from "../../validations/Company/Product/SetStatus";



class ProductService {
    private productRepository: ProductRepository

    constructor() {
        this.productRepository = new ProductRepository()
    }

    createProduct = async (data: IProduct, user: myJwtPayload): Promise<IProductOutput> => {
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



    updateProduct = async (id: string, payloudCompany: myJwtPayload, update: IProductUpdate): Promise<IProductOutput> => {
        try {
            const validateProductUpdate: ProductUpdateSchema = await productUpdateSchema.validate(update, {
                abortEarly: false
            })

            if (!id) {
                throw new ErrorExtension(401, "Id do produto invalido")
            }

            const infoProducts: Products | null = await this.productRepository.findByid(id, payloudCompany)

            if (!infoProducts) throw new ErrorExtension(404, 'Você não tem permissão para alterar este produto');

            const fieldsToUpdate: any = {};

            for (const [chave, value] of Object.entries(validateProductUpdate)) {
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
                throw new ErrorExtension(400, "Erro Ao atulizar produto")
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

    setStatusProducts = async (id: string, payloudCompany: myJwtPayload, setStatus: setStatus): Promise<IProductStatus | null> => {
        try {
            const setStatusReq = await setStatusSchema.validate(setStatus, {
                abortEarly: false
            })

            const statusType: boolean | undefined =
                setStatusReq.status === 'active' ? true :
                    setStatusReq.status === 'inactive' ? false : undefined;

            if (statusType === undefined) {
                throw new ErrorExtension(
                    401,
                    'Você deve definir o status ("active" ou "disable") na query para atualizar o produto.'
                )
            }

            const resultSetStatus = await this.productRepository.setStatusProduct(id, payloudCompany, statusType)

            if (!resultSetStatus) {
                throw new ErrorExtension(
                    401,
                    'O Produto não pode ser atualizado '
                )
            }

            return resultSetStatus


        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(401, err.errors.join(","))
            }
            throw err
        }
    }

    listProduct = async (payloudCompany: myJwtPayload, filterReq: listSchema):Promise<Products[] | null> => {
        try {
            const statusReq = await listSchemaProducts.validate(filterReq, {
                abortEarly: false
            })
            const listStatusValue: Products[] = await this.productRepository.listProduct(statusReq, payloudCompany)

            if(listStatusValue.length === 0){
                return null
            }
            return listStatusValue

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(401, err.errors.join(","))
            }
            throw err
        }
    }
}

export default ProductService