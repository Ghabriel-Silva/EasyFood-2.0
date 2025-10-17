import { myJwtPayload } from "../interfaces/IAuth/IAuth"
import Auth from "../utils/Auth"

import { Request, Response, NextFunction } from 'express'
import ErrorExtension from "../utils/ErrorExtension"


declare global {
    namespace Express {
        interface Request {
            user?: myJwtPayload
        }
    }
}

const AuthenticateMidlleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || ""
    const auth = new Auth()

    if (!token) {
        throw new ErrorExtension(404, 'Token não encontrado!')
    }

    try {
        const payload: myJwtPayload = auth.AuthenticateToken(token)
        req.user = payload
        next() // token válido → passa para o controller

    } catch (erro) {
        throw new ErrorExtension(404, 'Token invalido ou não encontrado')
    }
}

export default AuthenticateMidlleware