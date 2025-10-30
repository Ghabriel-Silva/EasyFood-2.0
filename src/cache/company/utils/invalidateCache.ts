import client from "../../redisClient"

export const invalidateCache = async (companyId: string, module: string) => {
    const patternWithFilters = `company:${companyId}:${module}:*`

    const stream = client.scanIterator({ MATCH: patternWithFilters }) //varredura paginada de chaves, retorna aos poucos, não tudo de uma vez.
    let count = 0

    for await (const keyOrKeys of stream) {    
            const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys]
            for(const key of keys){
                if(!key || key.length === 0) continue
                await client.del(key)
                count++
            }
    }
    console.log(`✅ ${count} chave deletada `)
}