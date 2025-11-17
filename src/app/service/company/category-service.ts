import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import categoryRepository from "../../repository/company/category-repository";


class categoryService {
    private categoyRepository: categoryRepository

    constructor() {
        this.categoyRepository = new categoryRepository()
    }

    createCategory = async (name: string, company: myJwtPayload) => {
        
    }
}

export default categoryService