import { UserRole } from "../../entity/User"

interface ILogin {
    email: string,
    password: string
}

interface IRegister {
    email: string,
    password: string,
    name: string,
    isActive: Boolean,
    role: UserRole,
    lastLoginAt?: Date
}

export {ILogin, IRegister}