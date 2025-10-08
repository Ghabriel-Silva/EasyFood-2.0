import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

export type UserRole = 'MASTER' | 'JUNIOR'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column('varchar', { nullable: false, unique: true, length: 100 })
    email: string

    @Column('varchar', { nullable: false, length: 200 })
    password: string

    @Column('varchar', { length: 30, nullable: false })
    name: string

    @Column('boolean', { nullable: false, default: true })
    isActive: boolean;

    @Column({
        type: 'enum',
        enum: ['MASTER', 'JUNIOR'],
        default: 'junior'
    })
    role: UserRole

    @Column({nullable:true})
    lastLoginAt?:Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}
