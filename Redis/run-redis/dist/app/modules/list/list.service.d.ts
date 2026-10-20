declare const pushTaskToQueue: (queueName: string, task: any) => Promise<{
    queueKey: string;
    queueLength: number;
    task: any;
}>;
declare const popTaskFromQueue: (queueName: string) => Promise<{
    queueKey: string;
    task: any;
    remainingPendingInQueue: number;
}>;
declare const addRecentActivity: (userId: string, activity: string) => Promise<{
    userId: string;
    activities: any[];
}>;
declare const getRecentActivities: (userId: string) => Promise<{
    userId: string;
    count: number;
    activities: any[];
}>;
export declare const ListService: {
    pushTaskToQueue: typeof pushTaskToQueue;
    popTaskFromQueue: typeof popTaskFromQueue;
    addRecentActivity: typeof addRecentActivity;
    getRecentActivities: typeof getRecentActivities;
};
export {};
//# sourceMappingURL=list.service.d.ts.map