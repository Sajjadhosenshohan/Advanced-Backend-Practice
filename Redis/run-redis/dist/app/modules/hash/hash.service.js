import { redis } from "../../../redis/index.js";
const saveUserProfile = async (userId, data) => {
    const key = `user:${userId}`;
    // Redis Command: HSET key field value ...
    await redis.hset(key, {
        name: data.name || "Anonymous",
        email: data.email || "unknown@domain.com",
        role: data.role || "user",
        age: String(data.age || 20),
        updatedAt: new Date().toISOString(),
    });
    return { userId, key };
};
const getUserProfile = async (userId, field) => {
    const key = `user:${userId}`;
    if (field) {
        // Redis Command: HGET key field
        const value = await redis.hget(key, field);
        return { isField: true, value };
    }
    // Redis Command: HGETALL key
    const profile = await redis.hgetall(key);
    return { isField: false, profile };
};
const addToCart = async (userId, productId, quantity) => {
    const cartKey = `cart:${userId}`;
    // Redis Command: HINCRBY key field increment
    const newQuantity = await redis.hincrby(cartKey, String(productId), quantity);
    if (newQuantity <= 0) {
        // Redis Command: HDEL key field
        await redis.hdel(cartKey, String(productId));
    }
    // Set TTL (7 days)
    await redis.expire(cartKey, 7 * 24 * 60 * 60);
    const fullCart = await redis.hgetall(cartKey);
    return { productId, newQuantity: newQuantity > 0 ? newQuantity : 0, cart: fullCart };
};
const getCart = async (userId) => {
    const cartKey = `cart:${userId}`;
    const cart = await redis.hgetall(cartKey);
    return { userId, totalItems: Object.keys(cart).length, cart };
};
export const HashService = {
    saveUserProfile,
    getUserProfile,
    addToCart,
    getCart,
};
//# sourceMappingURL=hash.service.js.map