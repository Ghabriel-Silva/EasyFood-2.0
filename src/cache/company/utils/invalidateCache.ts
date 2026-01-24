import client from "../../redis-client"

export const invalidateCache = async (companyId: string, module: string) => {
    const patternWithFilters = `company:${companyId}:${module}:*`

    const stream = client.scanIterator({ MATCH: patternWithFilters }) //varredura paginada de chaves, retorna aos poucos, não tudo de uma vez.
    let count = 0

    for await (const key of stream) {
        if (!key) continue
        await client.del(key)
        count++
    }
}