import { redis } from "../../redis/index.js";
/**
 * =========================================================================
 * USE CASE 11: GEOSPATIAL DATA (Location-based search & Distance Calculation)
 * =========================================================================
 * কেন Redis Geospatial ব্যবহার করব?
 * - পাঠাও, উবার, ফুডপান্ডা ইত্যাদিতে "আমার আশেপাশে ৫ কিমির মধ্যে কোন কোন রাইডার বা রেস্টুরেন্ট আছে"
 *   বের করতে Redis Geo অত্যন্ত দ্রুত কাজ করে।
 * - এটি ব্যাকগ্রাউন্ডে Sorted Set (ZSET) এবং Geohash অ্যালগরিদম ব্যবহার করে।
 * - কয়েক মিলি-সেকেন্ডে জিওস্প্যাশিয়াল রেডিয়াস কুয়েরি করতে পারে।
 *
 * গুরুত্বপূর্ণ কমান্ডস:
 * - `GEOADD`: লোকেশন (Longitude, Latitude) যোগ করা
 * - `GEODIST`: দুটি লোকেশনের মধ্যবর্তী দূরত্ব বের করা (km / m)
 * - `GEOSEARCH`: কোনো স্থান বা পয়েন্টের আশেপাশে নির্দিষ্ট ব্যাসার্ধের মধ্যে সার্চ করা
 */
const GEO_KEY = "locations:riders";
// POST /api/geo/add-location
export const AddRiderLocationController = async (req, res) => {
    try {
        const { riderId, longitude, latitude } = req.body;
        if (!riderId || longitude === undefined || latitude === undefined) {
            return res.status(400).json({
                success: false,
                message: "riderId, longitude, and latitude are required",
            });
        }
        // Redis Command: GEOADD key longitude latitude member
        // মনে রাখবেন: প্রথমে Longitude (দ্রাঘিমাংশ), পরে Latitude (অক্ষাংশ)!
        await redis.geoadd(GEO_KEY, Number(longitude), Number(latitude), String(riderId));
        return res.status(200).json({
            success: true,
            message: `Location saved for rider ${riderId}`,
            riderId,
            coordinates: {
                longitude: Number(longitude),
                latitude: Number(latitude),
            },
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error adding geo location", error });
    }
};
// GET /api/geo/distance
export const GetDistanceBetweenRidersController = async (req, res) => {
    try {
        const { rider1, rider2, unit } = req.query;
        if (!rider1 || !rider2) {
            return res.status(400).json({
                success: false,
                message: "Query params 'rider1' and 'rider2' are required (e.g. ?rider1=101&rider2=102)",
            });
        }
        const distanceUnit = unit || "km";
        // Redis Command: GEODIST key member1 member2 [m|km|ft|mi]
        const distance = await redis.geodist(GEO_KEY, String(rider1), String(rider2), distanceUnit);
        if (distance === null) {
            return res.status(404).json({
                success: false,
                message: "One or both riders not found in geospatial index",
            });
        }
        return res.status(200).json({
            success: true,
            rider1,
            rider2,
            distance: `${Number(distance).toFixed(2)} ${distanceUnit}`,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error calculating distance", error });
    }
};
// GET /api/geo/nearby
export const FindNearbyRidersController = async (req, res) => {
    try {
        const { longitude, latitude, radiusKm } = req.query;
        if (!longitude || !latitude) {
            return res.status(400).json({
                success: false,
                message: "Query params 'longitude' and 'latitude' are required (e.g. ?longitude=90.4125&latitude=23.8103)",
            });
        }
        const radius = radiusKm ? Number(radiusKm) : 5;
        // Redis Command: GEOSEARCH key FROMLONLAT lon lat BYRADIUS radius km WITHDIST WITHCOORD
        // ioredis-এ geosearch মেথড বিল্ট-ইন
        const results = await redis.geosearch(GEO_KEY, "FROMLONLAT", Number(longitude), Number(latitude), "BYRADIUS", radius, "km", "WITHDIST", "WITHCOORD");
        // Formatted array of nearby riders
        const nearbyRiders = (results || []).map((item) => ({
            riderId: item[0],
            distanceKm: `${Number(item[1]).toFixed(2)} km`,
            coordinates: {
                longitude: item[2][0],
                latitude: item[2][1],
            },
        }));
        return res.status(200).json({
            success: true,
            searchCenter: { longitude: Number(longitude), latitude: Number(latitude) },
            searchRadius: `${radius} km`,
            totalNearbyFound: nearbyRiders.length,
            riders: nearbyRiders,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error searching nearby riders", error });
    }
};
//# sourceMappingURL=geo-redis.js.map