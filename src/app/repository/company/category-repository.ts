import { Repository } from "typeorm";
import { Category } from "../../entity/Category";
import { AppDataSource } from "../../../database/dataSource";
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import { compareAsc } from "date-fns";
import { CategoryValidationSchema } from "../../validations/company/category/create";


class categoryRepository {
    private categoryRepo: Repository<Category>

    constructor() {
        this.categoryRepo = AppDataSource.getRepository(Category)
    }

    createCategory = async (category:CategoryValidationSchema, company: myJwtPayload):Promise<Category | undefined> => {
      try{
          const categoryMolde =  this.categoryRepo.create({
            name: category.name,
            status: true,
            company: { id: company.id }
        })
        console.log(categoryMolde)

        await this.categoryRepo.save(categoryMolde)


        return categoryMolde
      }catch(err){
        console.log(err)
      }
    }
}

export default categoryRepository