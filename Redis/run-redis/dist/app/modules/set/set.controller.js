import { SetService } from "./set.service.js";
const updateOnlineStatus = async (req, res) => {
    try {
        const { userId, status } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }
        const result = await SetService.updateOnlineStatus(String(userId), status);
        return res.status(200).json({
            success: true,
            message: `User ${userId} marked as ${status === "offline" ? "offline" : "online"}`,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error updating online status", error });
    }
};
const getOnlineUsers = async (req, res) => {
    try {
        const result = await SetService.getOnlineUsers();
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error getting online users", error });
    }
};
const checkUserOnline = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await SetService.checkUserOnline(String(userId));
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error checking user online status", error });
    }
};
const addUserInterests = async (req, res) => {
    try {
        const { userId, interests } = req.body;
        if (!userId || !Array.isArray(interests) || interests.length === 0) {
            return res.status(400).json({
                success: false,
                message: "userId and array of interests are required",
            });
        }
        const result = await SetService.addUserInterests(String(userId), interests);
        return res.status(200).json({
            success: true,
            message: "Interests saved",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error adding interests", error });
    }
};
const getMutualInterests = async (req, res) => {
    try {
        const { user1, user2 } = req.query;
        if (!user1 || !user2) {
            return res.status(400).json({
                success: false,
                message: "Query params 'user1' and 'user2' are required (e.g. ?user1=alice&user2=bob)",
            });
        }
        const result = await SetService.getMutualInterests(String(user1), String(user2));
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error finding mutual interests", error });
    }
};
export const SetController = {
    updateOnlineStatus,
    getOnlineUsers,
    checkUserOnline,
    addUserInterests,
    getMutualInterests,
};
//# sourceMappingURL=set.controller.js.map