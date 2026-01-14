import { AppDataSource } from "../../../database/dataSource";
import { Category } from "../../entity/Category";
import { Company } from "../../entity/Company";
import { IRegister } from "../../interfaces/i-auth/i-auth";
import { UserRepository } from "../company/auth-repository";

export class AdminRepository extends UserRepository {
    constructor() {
        super()
    }

    async create(register: IRegister): Promise<Company> {
        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const company = queryRunner.manager.create(Company, register)
            await queryRunner.manager.save(company)

            const defaultCategory: string[] = [
                'Lanches',
                'Hambúrgueres',
                'Pizzas',
                'Porções',
                'Salgados',
                'Assados',
                'Bebidas',
                'Sobremesas',
                'Combos',
                'Outros',
            ]

            for (const name of defaultCategory) {
                await queryRunner.manager.insert(Category, {
                    name,
                    status: true,
                    is_default: true,
                    company: { id: company.id }, 
                })
            }

            await queryRunner.commitTransaction()

            return company ?? null
        } catch (err) {
            await queryRunner.rollbackTransaction()
            throw err
        } finally {
            await queryRunner.release()
        }

    }



}