import client from "./redisClient";

//salvar dados no cache
export const setUserCache = async (userId: string, key: string, value: any, ttlSeconds = 300) => {
    const cacheKey = `user:${userId}:${key}`
    await client.set(cacheKey, JSON.stringify(value), { EX: ttlSeconds })
}


//Pegar dados do cache
export const getUserCach = async (userId: string, key: string) => {
    const cacheKey = `user:${userId}:${key}`
    const cached = await client.get(cacheKey)
    return cached ? JSON.parse(cached) : null
}


//deletar usuario

export const deleteUserCache = async (userId: string, key: string) => {
    const cacheKey = `user:${userId}:${key}`;
    await client.del(cacheKey);
}
