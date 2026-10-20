import { ListService } from "./list.service.js";
const pushTaskToQueue = async (req, res) => {
    try {
        const { queueName, task } = req.body;
        if (!task) {
            return res.status(400).json({ success: false, message: "Task payload is required" });
        }
        const result = await ListService.pushTaskToQueue(queueName, task);
        return res.status(200).json({
            success: true,
            message: `Task pushed to ${result.queueKey} (Producer)`,
            task: result.task,
            totalPendingInQueue: result.queueLength,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error pushing to queue", error });
    }
};
const popTaskFromQueue = async (req, res) => {
    try {
        const { queueName } = req.body;
        const result = await ListService.popTaskFromQueue(queueName);
        if (!result.task) {
            return res.status(200).json({
                success: true,
                message: "Queue is empty! No pending tasks to process.",
                task: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Task popped and ready to process (Consumer)",
            task: result.task,
            remainingPendingInQueue: result.remainingPendingInQueue,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error popping from queue", error });
    }
};
const addRecentActivity = async (req, res) => {
    try {
        const { userId, activity } = req.body;
        if (!userId || !activity) {
            return res.status(400).json({ success: false, message: "userId and activity are required" });
        }
        const result = await ListService.addRecentActivity(String(userId), activity);
        return res.status(200).json({
            success: true,
            message: "Activity recorded. List capped at latest 10 entries.",
            ...result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error logging activity", error });
    }
};
const getRecentActivities = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await ListService.getRecentActivities(String(userId));
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching activities", error });
    }
};
export const ListController = {
    pushTaskToQueue,
    popTaskFromQueue,
    addRecentActivity,
    getRecentActivities,
};
//# sourceMappingURL=list.controller.js.map