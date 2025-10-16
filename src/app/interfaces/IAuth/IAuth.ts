


interface ILogin {
    email: string,
    password: string
}

interface IRegister {
    email: string,
    password: string,
    name: string,
    birthday?:Date
}

 interface IUser extends IRegister {
    id: string
    role:string
    isActive: boolean
    created_at: Date
    updated_at: Date
}



export { ILogin, IRegister, IUser }