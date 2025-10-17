import { JwtPayload } from "jsonwebtoken"



interface ILogin {
    email: string,
    password: string
}

interface IRegister {
    email: string,
    password: string,
    name: string,
    birthday?: Date
}

interface IUser extends IRegister {
    id: string
    role: string
    isActive: boolean
    created_at: Date
    updated_at: Date
}

interface myJwtPayload extends JwtPayload {
    id: string
    email: string
    role: string
    isActive: boolean
}

interface ILoginResponse {
    token: string;
    user: Pick<IUser, "id" | "name" | "email" | "role">
}

export { ILogin, IRegister, IUser, myJwtPayload, ILoginResponse }