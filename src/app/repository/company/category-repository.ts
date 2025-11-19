import { Repository } from "typeorm";
import { Category } from "../../entity/Category";
import { AppDataSource } from "../../../database/dataSource";
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import { compareAsc } from "date-fns";
import { CategoryValidationSchema } from "../../validations/company/category/create";
import { SetStatusSchemaValidation } from "../../validations/company/category/set-status";
import { ISetCategory } from "../../interfaces/i-category/i-cateegory";


class categoryRepository {
  private categoryRepo: Repository<Category>

  constructor() {
    this.categoryRepo = AppDataSource.getRepository(Category)
  }

  createCategory = async (category: CategoryValidationSchema, company: myJwtPayload): Promise<Category | undefined> => {
    try {
      const categoryMolde = this.categoryRepo.create({
        name: category.name,
        status: true,
        company: { id: company.id }
      })
      console.log(categoryMolde)

      await this.categoryRepo.save(categoryMolde)


      return categoryMolde
    } catch (err) {
      console.log(err)
    }
  }


  setStatus = async (id: string, status: boolean, company: myJwtPayload):Promise<ISetCategory | null> => {
    const newStatus = await this.categoryRepo
      .createQueryBuilder()
      .update(Category)
      .set({ status: status })
      .where("id = :id", { id })
      .andWhere("status != :status", { status })
      .andWhere("company_id = :company_id", { company_id: company.id })
      .execute()

    return newStatus.affected && newStatus.affected > 0 
    ? {id:id, status:status}
    :null
  }


}

export default categoryRepository