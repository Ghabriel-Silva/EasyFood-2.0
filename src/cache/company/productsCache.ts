import { listSchema } from "../../app/validations/Company/Product/List";
import client from "../redisClient";

const SIX_HOURS = 6* 60 *60

export const setCompanyFilterCache = async (
    userId: string,
    baseKey: string = 'products',
    value: any,
    filters: listSchema,
    ttlSeconds = SIX_HOURS
) => {
    const filterKey = Object.entries(filters)
        .map(([k, v]) => `${k}:${v}`)
        .join('-') //["status:active", "price:maior"] → "status:active-price:maior"

    const cacheKey = `company:${userId}:${baseKey}:${filterKey}` //"company:123:products:status:active|price:maior" 
    await client.set(cacheKey, JSON.stringify(value), { EX: ttlSeconds })
}

export const getFilterCompanyCache = async (
    userId: string,
    filters: Record<string, string>, 
    baseKey:string = 'products' 
) => {
    const filterKey = Object.entries(filters).map(([Key, value]) => `${Key}:${value}`).join('-')
    const cacheKey = `company:${userId}:${baseKey}:${filterKey}`

    const cached = await client.get(cacheKey)

    return cached ? JSON.parse(cached) : null
}
