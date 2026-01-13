import { Request, Response, Router } from "express";
import { PrintService } from "../../service/print/print-service";
import { myJwtPayload } from "../../interfaces/i-auth/i-auth";
import AuthenticateMidlleware from "../../middlewares/auth-midlleware";

class PrintController {
    public router: Router

    constructor() {
        this.router = Router()
        this.inicializedRoutes()
    }

    inicializedRoutes() {
        this.router.get('/:orderId', AuthenticateMidlleware, this.print)
    }


    print = async (req: Request, res: Response) => {
        const { orderId } = req.params
        const idCompany = this.getCompanyFromRequest(req)
        const printService = new PrintService()
        const html: string = await printService.gerarComanda(orderId, idCompany)

        res
            .status(200)
            .set('Content-Type', 'text/html')
            .send(html)
    }


    private getCompanyFromRequest(req: Request): myJwtPayload {
        return req.user as myJwtPayload
    }
}
const printComande = new PrintController().router
export default printComande