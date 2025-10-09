import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../app/entity/User"
import dotenv from "dotenv"
dotenv.config()

import {CreateTableUsers1759942333373} from '../database/migrations/1759942333373-CreateTableUsers'



export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [CreateTableUsers1759942333373],
    subscribers: [],
})
