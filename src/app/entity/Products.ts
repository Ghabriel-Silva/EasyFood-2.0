import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from "typeorm";
import { Category } from "./Category";
import { OrderItem } from "./OrderItem";
import { Company } from "./Company";

export enum UniMedida {
    KILO = "kg",
    GRAMA = "g",
    LITRO = "l",
    UNIDADE = "un",
    PORCAO = "porcao",
    FATIA = "fatia",
    PEDACO = "pedaco",
    COMBO = "combo",
    NONE = "none",
}


@Entity()
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column("int", { nullable: true })
    quantity: number | null;

    @Column({ type: "date", nullable: true })
    expirationDate?: Date;

    @Column({ default: true })
    isAvailable: boolean;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    category_id: string;

    @Column({
        type: "enum",
        enum: UniMedida,
        default: UniMedida.NONE
    })
    uni_medida:UniMedida

    @ManyToOne(() => Company, company => company.products)
    @JoinColumn({ name: "company_id" })
    company: Company;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    orderItems: OrderItem[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}


