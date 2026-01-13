import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'
import orderRepository from '../../repository/company/orders-repository'
import { Order } from '../../entity/Order'
import ErrorExtension from '../../utils/error-extension'
import { myJwtPayload } from '../../interfaces/i-auth/i-auth'

export class PrintService {
    private orderRepo: orderRepository

    constructor() {
        this.orderRepo = new orderRepository()
    }

    async gerarComanda(orderId: string, idCompany:myJwtPayload): Promise<string> {
        const order: Order | null = await this.orderRepo.printOrderId(orderId, idCompany)

        if (!order) {
            throw new ErrorExtension(
                404,
                'Pedido não emcontrado'
            )
        }


        const templatePath = path.join(
            process.cwd(), //Raiz do projeto vou caminhando 
            'src',
            'app',
            'service',
            'print',
            'templates',
            'comanda.hbs'
        )

        const source = fs.readFileSync(templatePath, 'utf-8') //Le o arquivo de forma sincrona, Converte para texto (utf-8), Retorna uma string
        const template = Handlebars.compile(source) //Função que recebe dados e injeta dentro da string rendebars

        const printData = {
            id: order.id.slice(0,4),
            company: order.company.name,
            mesa: order.delivery_method === 'dine_in' ? 'Mesa 01' : '—',
            createdAt: order.created_at.toLocaleString('pt-BR'),
            status: order.status,
            pagamento: order.paymentMethod,
            cliente: order.customerName ?? '—',
            telefone: order.customerPhone ?? '—',
            endereco: order.customerAddress ?? '—',
            observacoes: order.observations ?? '',

            itens: order.items.map(item => {
                const precoUnitario = Number(item.price)
                const qtd = item.quantity

                return {
                    qtd,
                    nome: item.product.name,
                    totalItem: (precoUnitario * qtd).toFixed(2)
                }
            }),

            frete: Number(order.totalFreight).toFixed(2),
            adicional: Number(order.additionalValue ?? 0).toFixed(2),
            desconto: Number(order.discountValue ?? 0).toFixed(2),
            total: Number(order.total).toFixed(2)
        }

        return template(printData)
    }
}
