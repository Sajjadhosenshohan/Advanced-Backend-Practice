declare const addLocation: (riderId: string, longitude: number, latitude: number) => Promise<{
    riderId: string;
    coordinates: {
        longitude: number;
        latitude: number;
    };
}>;
declare const getDistance: (rider1: string, rider2: string, unit?: string) => Promise<{
    rider1: string;
    rider2: string;
    distance: string;
} | null>;
declare const findNearby: (longitude: number, latitude: number, radiusKm: number) => Promise<{
    searchCenter: {
        longitude: number;
        latitude: number;
    };
    searchRadius: string;
    totalNearbyFound: any;
    riders: any;
}>;
export declare const GeoService: {
    addLocation: typeof addLocation;
    getDistance: typeof getDistance;
    findNearby: typeof findNearby;
};
export {};
//# sourceMappingURL=geo.service.d.ts.map