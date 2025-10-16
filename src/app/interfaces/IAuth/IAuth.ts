


interface ILogin {
    email: string,
    password: string
}

interface IRegister {
    email: string,
    password: string,
    name: string,
    birthday:Date
}

export interface IUser extends IRegister {
    id: string
    isActive: boolean
    created_at: Date
    updated_at: Date
}



export { ILogin, IRegister }