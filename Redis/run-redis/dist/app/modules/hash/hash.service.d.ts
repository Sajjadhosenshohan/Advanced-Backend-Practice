declare const saveUserProfile: (userId: string, data: {
    name?: string;
    email?: string;
    role?: string;
    age?: number | string;
}) => Promise<{
    userId: string;
    key: string;
}>;
declare const getUserProfile: (userId: string, field?: string) => Promise<{
    isField: boolean;
    value: string | null;
    profile?: never;
} | {
    value?: never;
    isField: boolean;
    profile: Record<string, string>;
}>;
declare const addToCart: (userId: string, productId: string, quantity: number) => Promise<{
    productId: string;
    newQuantity: number;
    cart: Record<string, string>;
}>;
declare const getCart: (userId: string) => Promise<{
    userId: string;
    totalItems: number;
    cart: Record<string, string>;
}>;
export declare const HashService: {
    saveUserProfile: typeof saveUserProfile;
    getUserProfile: typeof getUserProfile;
    addToCart: typeof addToCart;
    getCart: typeof getCart;
};
export {};
//# sourceMappingURL=hash.service.d.ts.map