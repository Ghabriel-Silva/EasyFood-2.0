import ErrorExtension from "../utils/error-extension";
import { Request, Response, NextFunction } from 'express'

const httpErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorExtension) {
        return res.status(err.status).json({
            status: 'error',
            statusCode: err.status,
            message: err.message
        })
    }
    // fallback para qualquer erro que não seja ErrorExtension

    return res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Internal Server Error",
    })
}

export default httpErrorMiddleware