interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
}
declare const getProducts: () => Promise<{
    source: string;
    responseTime: string;
    products: Product[];
    ttlSeconds?: never;
} | {
    source: string;
    responseTime: string;
    ttlSeconds: number;
    products: Product[];
}>;
declare const createProduct: (payload: {
    name: string;
    price: number;
    category?: string;
}) => Promise<Product>;
declare const clearCache: (key?: string) => Promise<{
    targetKey: string;
    deletedCount: number;
}>;
export declare const CacheService: {
    getProducts: typeof getProducts;
    createProduct: typeof createProduct;
    clearCache: typeof clearCache;
};
export {};
//# sourceMappingURL=cache.service.d.ts.map