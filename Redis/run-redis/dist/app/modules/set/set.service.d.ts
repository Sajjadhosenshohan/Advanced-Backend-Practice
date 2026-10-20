declare const updateOnlineStatus: (userId: string, status: "online" | "offline") => Promise<{
    userId: string;
    status: "offline" | "online";
    onlineCount: number;
}>;
declare const getOnlineUsers: () => Promise<{
    totalOnline: number;
    users: string[];
}>;
declare const checkUserOnline: (userId: string) => Promise<{
    userId: string;
    isOnline: boolean;
}>;
declare const addUserInterests: (userId: string, interests: string[]) => Promise<{
    userId: string;
    interests: string[];
}>;
declare const getMutualInterests: (user1: string, user2: string) => Promise<{
    user1: string;
    user2: string;
    totalMutual: number;
    mutualInterests: string[];
}>;
export declare const SetService: {
    updateOnlineStatus: typeof updateOnlineStatus;
    getOnlineUsers: typeof getOnlineUsers;
    checkUserOnline: typeof checkUserOnline;
    addUserInterests: typeof addUserInterests;
    getMutualInterests: typeof getMutualInterests;
};
export {};
//# sourceMappingURL=set.service.d.ts.map