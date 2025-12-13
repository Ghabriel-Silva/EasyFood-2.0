import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Company } from "./Company";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
    PENDING = "Pendente",
    PREPARING = "Preparando",
    COMPLETED = "Completo",
    DELIVERED = "Entregue",
    CANCELLED = "Cancelado",
}

export enum PaymentMethod {
    CASH = "Dinheiro",
    CARD = "Cartão",
    PIX = "Pix",
    OTHER = "Outros"
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

    @Column({
        type: "enum",
        enum: PaymentMethod,
        default: PaymentMethod.OTHER
    })
    paymentMethod: PaymentMethod

    @Column({ default: true })
    isFreightApplied: boolean; //Se true o valor padrão do frete é aplicado se não não é aplicado

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    customFreight: number;

    @Column({type:'decimal', precision:10, scale:2, default:0})
    totalFreight:number

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    additionalValue?: number

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    discountValue?: number

    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    total: number;

    @Column('text', {
        nullable:true,
    })
    observations?:string;

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
