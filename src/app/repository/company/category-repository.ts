import { Repository } from "typeorm";
import { Category } from "../../entity/Category";
import { AppDataSource } from "../../../database/dataSource";


 class categoryRepository {
    private categoryRepo: Repository<Category>

    constructor(){
        this.categoryRepo = AppDataSource.getRepository(Category)
    }
}

export default categoryRepository