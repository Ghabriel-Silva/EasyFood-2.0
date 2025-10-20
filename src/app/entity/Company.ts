import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import {Products} from "./Products";
import {Category }from "./Category";
import { Order } from "./Order";

export enum enunRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity("company") // aqui renomeamos a tabela
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: false, unique: true, length: 100 })
    email: string;

    @Column('varchar', { nullable: false, length: 200 })
    password: string;

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column({
        type: "enum",
        enum: enunRole,
        default: enunRole.USER,
        nullable: false
    })
    role: enunRole;

    @Column('boolean', { nullable: false, default: true })
    isActive: boolean;

   

    @OneToMany(() => Products, products => products.company)
    products: Products[];

    @OneToMany(() => Category, category => category.company)
    categories: Category[];

    @OneToMany(() => Order, order => order.company)
    orders: Order[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
