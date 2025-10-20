import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Company } from "./Company";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100, nullable: true })
    customerName?: string;

    @Column({ length: 200, nullable: true })
    customerAddress?: string;

    @Column({ length: 20, nullable: true })
    customerPhone?: string;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus;

    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    total: number;

    @ManyToOne(() => Company, company => company.orders)
    @JoinColumn({ name: "company_id" })
    company: Company;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    items: OrderItem[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
