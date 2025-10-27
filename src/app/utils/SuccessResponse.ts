export const SuccessResponse = <T>(
    data: T | null,
    message?: string,
    action?: "create" | 'update' | "delete" | "fetch",
    option?: string
) => {
    const itemName = option ?? "item"
    const defaultMessages: Record<string, string> = {
        create: `${itemName} criado com sucesso!`,
        update: `${itemName} atualizado com sucesso!`,
        delete: `${itemName} excluído com sucesso!`,
        fetch: `${itemName} encontrado com sucesso!`,
    }
    return {

        message: message ?? defaultMessages[action ?? "fetch"],
        data,
    }
}
export const ErrorResponse = (mesage:string, code=400)=>({
    status:'error',
    mesage, 
    code,
})
