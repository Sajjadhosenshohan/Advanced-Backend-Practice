import { CounterService } from "./counter.service.js";
const incrementPageView = async (req, res) => {
    try {
        const { pageId } = req.body;
        const targetPage = pageId || "home";
        const result = await CounterService.incrementPageView(targetPage);
        return res.status(200).json({
            success: true,
            message: `Page view incremented for '${targetPage}'`,
            pageId: targetPage,
            totalViews: result.views,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error incrementing page view", error });
    }
};
const toggleLike = async (req, res) => {
    try {
        const { postId, action } = req.body;
        if (!postId) {
            return res.status(400).json({ success: false, message: "postId is required" });
        }
        const result = await CounterService.toggleLike(postId, action);
        return res.status(200).json({
            success: true,
            message: `Post ${action === "unlike" ? "unliked" : "liked"} successfully!`,
            postId,
            totalLikes: result.currentLikes,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error updating like count", error });
    }
};
const getCounterStats = async (req, res) => {
    try {
        const { key } = req.query;
        if (!key) {
            return res.status(400).json({
                success: false,
                message: "Query parameter 'key' is required (e.g. ?key=counter:pageview:home)",
            });
        }
        const result = await CounterService.getCounterStats(key);
        return res.status(200).json({
            success: true,
            key: result.key,
            value: result.value,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching counter stats", error });
    }
};
export const CounterController = {
    incrementPageView,
    toggleLike,
    getCounterStats,
};
//# sourceMappingURL=counter.controller.js.map