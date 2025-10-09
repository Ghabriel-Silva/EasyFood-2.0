import { enunRole} from "../../entity/User"


interface ILogin {
    email: string,
    password: string
}

interface IRegister {
    email: string,
    password: string,
    name: string,
    role:enunRole,
}

export {ILogin, IRegister}