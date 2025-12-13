import { myJwtPayload } from "../interfaces/i-auth/i-auth"
import Auth from "../utils/auth"

import { Request, Response, NextFunction } from 'express'
import ErrorExtension from "../utils/error-extension"


declare global {
    namespace Express {
        interface Request {
            user?: myJwtPayload
        }
    }
}

const AuthenticateMidlleware = async (req: Request, res: Response, next: NextFunction) => {

    const auth = new Auth()
    const token =req.cookies.token || req.headers.authorization?.replace("Bearer ", "")
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