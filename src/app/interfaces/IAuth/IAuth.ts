


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

interface ITokenData {
    id: string
    email: string
    password: string
    role: string
}


export { ILogin, IRegister, IUser, ITokenData }