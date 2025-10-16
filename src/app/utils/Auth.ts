import Jwt, { SignOptions } from "jsonwebtoken"
import dotenv from "dotenv"
import { ITokenData } from "../interfaces/IAuth/IAuth"
import ErrorExtension from "./ErrorExtension"


const SECRET: string = process.env.JWT_SECRET as string
const jwtDefaultConfig: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h"
}

class Auth {
    constructor(private jwtConfig?: SignOptions) {
        if (!jwtConfig) {
            this.jwtConfig = jwtDefaultConfig
        }
    }

    public jwtGenerator(payload: ITokenData) {
        return Jwt.sign(payload, SECRET, this.jwtConfig)
    }

    public AuthenticateToken(token: string) {
        if (!token) {
            throw new ErrorExtension(401, "Token não encontrado!")
        }
        try {
            const validateJwt = Jwt.verify(token, SECRET)
            return validateJwt
        } catch (err) {
            throw new ErrorExtension(401, "Token não encontrado!")
        }

    }
}
