import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Order } from "./Order"
import {Products} from "./Products"


@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column('varchar',  {nullable:true})
    name:string
    
    @Column({
        type:'decimal',
        precision:10, 
        scale:3

    })
    quantity: number

    @Column("decimal", { precision: 10, scale: 2 })
    price: number

    @Column("decimal", { precision: 10, scale: 2 })
    subtotal: number

    @ManyToOne(() => Order, order => order.items)
    @JoinColumn({ name: 'order_id' })
    order: Order
    

    @ManyToOne(() => Products, product => product.orderItems)
    @JoinColumn({ name: "product_id" })
    product: Products

}
