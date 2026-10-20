import { redis } from "../../redis/index.js";
/**
 * =========================================================================
 * USE CASE 4: REDIS HASHES (Objects, User Profiles, Shopping Cart)
 * =========================================================================
 * কেন Hash ব্যবহার করব String (JSON) এর বদলে?
 * - JSON String রাখলে একটি ফিল্ড (যেমন: age) আপডেট করার জন্য পুরো অবজেক্ট fetch করে
 *   JSON.parse -> modify -> JSON.stringify -> save করতে হয়।
 * - Redis Hash হলো কি-ভ্যালু এর ভেতর আরেকটা অবজেক্ট (Field-Value pair)।
 * - কোনো একটি ফিল্ড একা আপডেট বা ফেচ করতে পারি (HSET, HGET, HINCRBY)।
 * - মেমোরি অনেক সাশ্রয় (Memory efficient) হয়।
 *
 * রিয়েল-ওয়ার্ল্ড উদাহরণ:
 * ১. ইউজার সেশন / প্রোফাইল স্টোরেজ
 * ২. ই-কমার্স শপিং কার্ট (Cart: CartId -> ProductId: Quantity)
 */
// POST /api/hash/user-profile (Save or update user profile)
export const SaveUserProfileHashController = async (req, res) => {
    try {
        const { userId, name, email, role, age } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }
        const key = `user:${userId}`;
        // Redis Command: HSET key field value [field value ...]
        // আমরা অবজেক্ট আকারে ফিল্ডগুলো স্টোর করছি
        await redis.hset(key, {
            name: name || "Anonymous",
            email: email || "unknown@domain.com",
            role: role || "user",
            age: String(age || 20),
            updatedAt: new Date().toISOString(),
        });
        return res.status(200).json({
            success: true,
            message: `User profile saved in Redis Hash for user ${userId}`,
            userId,
            key,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error saving user profile hash", error });
    }
};
// GET /api/hash/user-profile/:userId (Get entire profile or single field)
export const GetUserProfileHashController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { field } = req.query; // optional field filter e.g. ?field=email
        const key = `user:${userId}`;
        // যদি স্পেসিফিক কোনো ফিল্ড চাওয়া হয়
        if (field) {
            // Redis Command: HGET key field
            const value = await redis.hget(key, field);
            return res.status(200).json({
                success: true,
                userId,
                field,
                value,
            });
        }
        // পুরো হ্যাশ অবজেক্ট নিয়ে আসা
        // Redis Command: HGETALL key
        const profile = await redis.hgetall(key);
        if (Object.keys(profile).length === 0) {
            return res.status(404).json({ success: false, message: "User profile not found in cache" });
        }
        return res.status(200).json({
            success: true,
            userId,
            profile,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error getting user profile hash", error });
    }
};
// POST /api/hash/cart/add (Shopping Cart using Redis Hash)
export const AddToCartHashController = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: "userId and productId are required" });
        }
        const qty = quantity ? Number(quantity) : 1;
        const cartKey = `cart:${userId}`;
        // Redis Command: HINCRBY key field increment
        // কার্টে আগে আইটেম থাকলে কোয়ান্টিটি যোগ হবে, না থাকলে ০ ধরে নতুন যোগ হবে
        const newQuantity = await redis.hincrby(cartKey, String(productId), qty);
        // কার্ট যদি খালি হয়ে যায় বা 0/negative হয়
        if (newQuantity <= 0) {
            // Redis Command: HDEL key field
            await redis.hdel(cartKey, String(productId));
        }
        // কার্টের মেয়াদ সেট করা (যেমন ৭ দিন পর কার্ট ক্লিয়ার হয়ে যাবে)
        await redis.expire(cartKey, 7 * 24 * 60 * 60);
        const fullCart = await redis.hgetall(cartKey);
        return res.status(200).json({
            success: true,
            message: `Cart updated for user ${userId}`,
            productId,
            newQuantity: newQuantity > 0 ? newQuantity : 0,
            cart: fullCart,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error updating cart hash", error });
    }
};
// GET /api/hash/cart/:userId
export const GetCartHashController = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartKey = `cart:${userId}`;
        // Redis Command: HGETALL key
        const cart = await redis.hgetall(cartKey);
        return res.status(200).json({
            success: true,
            userId,
            totalItems: Object.keys(cart).length,
            cart,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching cart", error });
    }
};
//# sourceMappingURL=hash-redis.js.map