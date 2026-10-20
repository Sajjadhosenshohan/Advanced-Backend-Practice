import { redis } from "../../../redis/index.js";
const mockDatabase = [
    { id: "1", name: "Apple MacBook Pro M3", price: 1999, category: "Electronics" },
    { id: "2", name: "Sony WH-1000XM5 Headphones", price: 399, category: "Audio" },
    { id: "3", name: "Logitech MX Master 3S", price: 99, category: "Accessories" },
    { id: "4", name: "Dell UltraSharp 27 Inch 4K", price: 549, category: "Monitors" },
];
const CACHE_KEY = "cache:products:all";
const getProducts = async () => {
    const startTime = Date.now();
    // 1. Check Redis Cache
    const cachedData = await redis.get(CACHE_KEY);
    if (cachedData) {
        const responseTime = Date.now() - startTime;
        return {
            source: "REDIS_CACHE (⚡ Lightning Fast)",
            responseTime: `${responseTime} ms`,
            products: JSON.parse(cachedData),
        };
    }
    // 2. Cache Miss: Simulate slow DB query
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const products = mockDatabase;
    // 3. Cache result in Redis for 60 seconds
    const TTL_SECONDS = 60;
    await redis.set(CACHE_KEY, JSON.stringify(products), "EX", TTL_SECONDS);
    const responseTime = Date.now() - startTime;
    return {
        source: "DATABASE (🐢 Slow first time)",
        responseTime: `${responseTime} ms`,
        ttlSeconds: TTL_SECONDS,
        products,
    };
};
const createProduct = async (payload) => {
    const newProduct = {
        id: String(mockDatabase.length + 1),
        name: payload.name,
        price: Number(payload.price),
        category: payload.category || "General",
    };
    mockDatabase.push(newProduct);
    // Invalidate Cache
    await redis.del(CACHE_KEY);
    return newProduct;
};
const clearCache = async (key) => {
    const targetKey = key || CACHE_KEY;
    const deletedCount = await redis.del(targetKey);
    return { targetKey, deletedCount };
};
export const CacheService = {
    getProducts,
    createProduct,
    clearCache,
};
//# sourceMappingURL=cache.service.js.map