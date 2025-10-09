import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

export enum enunRole{
    MASTER = 'master',
    JUNIOR = 'junior',
}

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false, unique: true, length: 100 })
    email: string

    @Column('varchar', { nullable: false, length: 200 })
    password: string

    @Column('varchar', { length: 100, nullable: false })
    name: string

    @Column({
        type: "enum",
        enum: enunRole,
        nullable: false
    })
    role: enunRole

    @Column('boolean', { nullable: false, default: true })
    isActive: boolean;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}
