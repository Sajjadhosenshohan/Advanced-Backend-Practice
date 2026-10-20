import { PubSubService } from "./pubsub.service.js";
const publishMessage = async (req, res) => {
    try {
        const { channel, message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "message payload is required" });
        }
        const result = await PubSubService.publishMessage(channel, message);
        return res.status(200).json({
            success: true,
            message: `Message broadcasted to channel '${result.channel}'`,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error publishing message", error });
    }
};
const getReceivedMessages = async (req, res) => {
    const result = PubSubService.getReceivedMessages();
    return res.status(200).json({
        success: true,
        ...result,
    });
};
export const PubSubController = {
    publishMessage,
    getReceivedMessages,
};
//# sourceMappingURL=pubsub.controller.js.map