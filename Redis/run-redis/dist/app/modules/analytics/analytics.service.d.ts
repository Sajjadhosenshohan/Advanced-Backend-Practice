declare const recordUniqueVisitor: (page: string, visitorId: string) => Promise<{
    page: string;
    visitorId: string;
    isNewUniqueEstimate: boolean;
    totalEstimatedUniqueVisitors: number;
    memoryUsedApprox: string;
}>;
declare const getUniqueVisitorCount: (page: string) => Promise<{
    page: string;
    uniqueVisitorsCount: number;
}>;
declare const markUserActive: (userId: number, date: string) => Promise<{
    userId: number;
    date: string | undefined;
    totalDailyActiveUsers: number;
}>;
declare const getUserActiveStatus: (userId: number | null, date: string) => Promise<{
    date: string | undefined;
    totalActiveUsers: number;
    userId?: number;
    wasActive?: boolean | null;
}>;
export declare const AnalyticsService: {
    recordUniqueVisitor: typeof recordUniqueVisitor;
    getUniqueVisitorCount: typeof getUniqueVisitorCount;
    markUserActive: typeof markUserActive;
    getUserActiveStatus: typeof getUserActiveStatus;
};
export {};
//# sourceMappingURL=analytics.service.d.ts.map