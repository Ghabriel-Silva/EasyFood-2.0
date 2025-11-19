import { Category } from "../../entity/Category";
import * as yup from 'yup';
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import categoryRepository from "../../repository/company/category-repository";
import ErrorExtension from "../../utils/error-extension";
import { categoryValidationSchema, CategoryValidationSchema } from "../../validations/company/category/create";
import { SetStatusSchemaValidation, setStatusSchemaValidation } from "../../validations/company/category/set-status";
import { ISetCategory } from "../../interfaces/i-category/i-cateegory";


class categoryService {
    private categoyRepository: categoryRepository

    constructor() {
        this.categoyRepository = new categoryRepository()
    }

    createCategory = async (category: string, company: myJwtPayload): Promise<Category> => {
        try {
            const categoryValidation: CategoryValidationSchema = await categoryValidationSchema.validate(category, {
                abortEarly: false
            })

            const categoryCreate: Category | undefined = await this.categoyRepository.createCategory(categoryValidation, company)

            if (!categoryCreate) {
                throw new ErrorExtension(
                    400,
                    'Dados não criados, tente novamente'
                )
            }

            return categoryCreate
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","))
            }
            throw err
        }
    }

    setStatusCategory = async (id: string, status: string, company: myJwtPayload): Promise<ISetCategory | undefined> => {
        try {
            const setCategory: SetStatusSchemaValidation = await setStatusSchemaValidation.validate(status, {
                abortEarly: false
            })
            console.log(setCategory)

            const boleanStatus: boolean = setCategory.status === "active" ? true : false
            const newStatus: ISetCategory | null = await this.categoyRepository.setStatus(id, boleanStatus, company)

            if (newStatus ===  null) {
                throw new ErrorExtension(
                    400,
                    "Status da categoria não pode ser a mesma da anterior!"
                )
            }

            return newStatus
        }catch(err){
            if(err instanceof yup.ValidationError){
                throw new  ErrorExtension(
                    400, 
                    err.errors.join(',')
                )
            }
            throw err
        }
    }
}

export default categoryService