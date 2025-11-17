import "reflect-metadata"
import { DataSource } from "typeorm"
import { Company } from "../app/entity/Company"
import { Category } from "../app/entity/Category"
import { Order } from "../app/entity/Order"
import { OrderItem } from "../app/entity/OrderItem"
import { Products } from "../app/entity/Products"
import dotenv from "dotenv"
dotenv.config()

import { GenerateAllTables1760965347778 } from '../database/migrations/1760965347778-GenerateAllTables'
import { EditeTablesCompanyOrder1762120085785 } from '../database/migrations/1762120085785-EditeTablesCompanyOrder'
import { AddCollumOrderItem1762491862341 } from '../database/migrations/1762491862341-AddCollumOrderItem'
import { AddColumnCategory1763381016818} from '../database/migrations/1763381016818-AddColumnCategory'




export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [Company, Category, Products, Order, OrderItem],
    migrations: [
        GenerateAllTables1760965347778,
        EditeTablesCompanyOrder1762120085785, 
        AddCollumOrderItem1762491862341,  
        AddColumnCategory1763381016818
    ],
    subscribers: [],
})
