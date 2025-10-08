import express from "express"
import { AppDataSource } from "./data-source"
import 'reflect-metadata'
import cors from 'cors'
import 'express-async-errors'

const app = express()
app.use(express.json())

app.use(cors())


AppDataSource.initialize().then(()=>{
    console.log('data base Started!')

    app.listen(3000, ()=>{
        console.log('Server Started!')
    })


}).catch((err)=>{
    console.log("Error during Data Source initialization:", err)
})