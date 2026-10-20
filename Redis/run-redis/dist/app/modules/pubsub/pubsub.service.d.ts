interface PublishedMessage {
    channel: string;
    message: any;
    receivedAt: string;
}
declare const publishMessage: (channel: string, message: any) => Promise<{
    channel: string;
    payload: any;
    subscriberCount: number;
}>;
declare const getReceivedMessages: () => {
    channel: string;
    totalMessagesReceived: number;
    messages: PublishedMessage[];
};
export declare const PubSubService: {
    publishMessage: typeof publishMessage;
    getReceivedMessages: typeof getReceivedMessages;
};
export {};
//# sourceMappingURL=pubsub.service.d.ts.map