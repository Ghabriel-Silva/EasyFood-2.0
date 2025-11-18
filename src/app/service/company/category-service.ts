import { Category } from "../../entity/Category";
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import categoryRepository from "../../repository/company/category-repository";
import ErrorExtension from "../../utils/error-extension";
import { categoryValidationSchema, CategoryValidationSchema } from "../../validations/company/category/create";


class categoryService {
    private categoyRepository: categoryRepository

    constructor() {
        this.categoyRepository = new categoryRepository()
    }

    createCategory = async (category: string, company: myJwtPayload) => {
        const categoryValidation:CategoryValidationSchema = await categoryValidationSchema.validate(category,{
            abortEarly: false
        })

        const categoryCreate:Category | undefined= await this.categoyRepository.createCategory(categoryValidation, company)
        
        if(!categoryCreate){
            throw new ErrorExtension(
                404, 
                'Dados não criados'
            )
        }
        console.log(categoryCreate)
        return categoryCreate

    }
}

export default categoryService