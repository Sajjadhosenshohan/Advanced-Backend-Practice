import { redis } from "../../redis/index.js";
const mockDatabase = [
    { id: "1", name: "Apple MacBook Pro M3", price: 1999, category: "Electronics" },
    { id: "2", name: "Sony WH-1000XM5 Headphones", price: 399, category: "Audio" },
    { id: "3", name: "Logitech MX Master 3S", price: 99, category: "Accessories" },
    { id: "4", name: "Dell UltraSharp 27 Inch 4K", price: 549, category: "Monitors" },
];
// GET /api/cache/products
export const GetProductsCacheAsideController = async (req, res) => {
    try {
        const CACHE_KEY = "cache:products:all";
        const startTime = Date.now();
        // ১. প্রথমে Redis-এ চেক করব ডাটা আছে কি না (Cache Hit / Miss check)
        const cachedData = await redis.get(CACHE_KEY);
        if (cachedData) {
            const responseTime = Date.now() - startTime;
            return res.status(200).json({
                success: true,
                source: "REDIS_CACHE (⚡ Lightning Fast)",
                responseTime: `${responseTime} ms`,
                totalProducts: JSON.parse(cachedData).length,
                data: JSON.parse(cachedData),
            });
        }
        // ২. Cache Miss হলে আসল ডাটাবেস থেকে আনতে হবে (আমরা ২ সেকেন্ড ডিলে সিমুলেট করছি)
        console.log("⚠️ Cache Miss! Fetching data from database...");
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating DB latency
        const products = mockDatabase;
        // ৩. ডাটাবেস থেকে পাওয়ার পর Redis-এ ক্যাশ করে রাখব (যেমন ৬০ সেকেন্ডের জন্য)
        // Redis Command: SET key value EX seconds
        const CACHE_TTL_SECONDS = 60;
        await redis.set(CACHE_KEY, JSON.stringify(products), "EX", CACHE_TTL_SECONDS);
        const responseTime = Date.now() - startTime;
        return res.status(200).json({
            success: true,
            source: "DATABASE (🐢 Slow first time)",
            responseTime: `${responseTime} ms`,
            ttlSeconds: CACHE_TTL_SECONDS,
            totalProducts: products.length,
            data: products,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching products", error });
    }
};
// POST /api/cache/products (Create product and invalidate cache)
export const CreateProductAndInvalidateCacheController = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        if (!name || !price) {
            return res.status(400).json({ success: false, message: "Name and price are required" });
        }
        const newProduct = {
            id: String(mockDatabase.length + 1),
            name,
            price: Number(price),
            category: category || "General",
        };
        mockDatabase.push(newProduct);
        // ৪. ক্যাশ ইনভ্যালিডেশন (Cache Invalidation)
        // নতুন প্রোডাক্ট যুক্ত হওয়ার কারণে আগের ক্যাশ ডাটা পুরনো (stale) হয়ে গেছে, তাই মুছে ফেলব
        const CACHE_KEY = "cache:products:all";
        await redis.del(CACHE_KEY);
        return res.status(201).json({
            success: true,
            message: "New product created and Redis cache invalidated successfully!",
            product: newProduct,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error creating product", error });
    }
};
// DELETE /api/cache/clear
export const ClearSpecificCacheController = async (req, res) => {
    try {
        const { key } = req.query;
        const targetKey = key || "cache:products:all";
        const deleted = await redis.del(targetKey);
        return res.status(200).json({
            success: true,
            message: `Cache key '${targetKey}' cleared successfully`,
            keysDeleted: deleted,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error clearing cache", error });
    }
};
//# sourceMappingURL=cache-redis.js.map