import { HashService } from "./hash.service.js";
const saveUserProfile = async (req, res) => {
    try {
        const { userId, name, email, role, age } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }
        const result = await HashService.saveUserProfile(userId, { name, email, role, age });
        return res.status(200).json({
            success: true,
            message: `User profile saved in Redis Hash for user ${userId}`,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error saving user profile hash", error });
    }
};
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { field } = req.query;
        const result = await HashService.getUserProfile(String(userId), field);
        if (result.isField) {
            return res.status(200).json({
                success: true,
                userId,
                field,
                value: result.value,
            });
        }
        const profile = result.profile || {};
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
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: "userId and productId are required" });
        }
        const qty = quantity ? Number(quantity) : 1;
        const result = await HashService.addToCart(String(userId), String(productId), qty);
        return res.status(200).json({
            success: true,
            message: `Cart updated for user ${userId}`,
            ...result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error updating cart hash", error });
    }
};
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await HashService.getCart(String(userId));
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching cart", error });
    }
};
export const HashController = {
    saveUserProfile,
    getUserProfile,
    addToCart,
    getCart,
};
//# sourceMappingURL=hash.controller.js.map