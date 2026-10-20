declare const incrementPageView: (pageId: string) => Promise<{
    pageId: string;
    views: number;
}>;
declare const toggleLike: (postId: string, action: "like" | "unlike") => Promise<{
    postId: string;
    currentLikes: number;
    action: "like" | "unlike";
}>;
declare const getCounterStats: (key: string) => Promise<{
    key: string;
    value: number;
}>;
export declare const CounterService: {
    incrementPageView: typeof incrementPageView;
    toggleLike: typeof toggleLike;
    getCounterStats: typeof getCounterStats;
};
export {};
//# sourceMappingURL=counter.service.d.ts.map