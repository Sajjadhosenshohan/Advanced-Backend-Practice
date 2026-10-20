import { redis } from "../../../redis/index.js";
const GEO_KEY = "locations:riders";
const addLocation = async (riderId, longitude, latitude) => {
    // Redis Command: GEOADD key longitude latitude member
    await redis.geoadd(GEO_KEY, longitude, latitude, riderId);
    return {
        riderId,
        coordinates: { longitude, latitude },
    };
};
const getDistance = async (rider1, rider2, unit = "km") => {
    // Redis Command: GEODIST key member1 member2 [unit]
    const distance = await redis.geodist(GEO_KEY, rider1, rider2, unit);
    if (distance === null) {
        return null;
    }
    return {
        rider1,
        rider2,
        distance: `${Number(distance).toFixed(2)} ${unit}`,
    };
};
const findNearby = async (longitude, latitude, radiusKm) => {
    // Redis Command: GEOSEARCH key FROMLONLAT lon lat BYRADIUS radius km WITHDIST WITHCOORD
    const results = await redis.geosearch(GEO_KEY, "FROMLONLAT", longitude, latitude, "BYRADIUS", radiusKm, "km", "WITHDIST", "WITHCOORD");
    const nearbyRiders = (results || []).map((item) => ({
        riderId: item[0],
        distanceKm: `${Number(item[1]).toFixed(2)} km`,
        coordinates: {
            longitude: item[2][0],
            latitude: item[2][1],
        },
    }));
    return {
        searchCenter: { longitude, latitude },
        searchRadius: `${radiusKm} km`,
        totalNearbyFound: nearbyRiders.length,
        riders: nearbyRiders,
    };
};
export const GeoService = {
    addLocation,
    getDistance,
    findNearby,
};
//# sourceMappingURL=geo.service.js.map