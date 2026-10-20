import express, {} from "express";
import router from "./app/routes/index.js";
import { redis } from "./redis/index.js";
const app = express();
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// API Index & Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "🚀 Redis Complete Masterclass API is running!",
        documentation: "Import the Postman collection provided in the root directory to test all 13 modules.",
        modules: [
            { id: 1, name: "OTP with TTL Expiration", endpoint: "/api/otp" },
            { id: 2, name: "Response Caching (Cache-Aside)", endpoint: "/api/cache" },
            { id: 3, name: "Atomic Counters & Metrics", endpoint: "/api/counter" },
            { id: 4, name: "Hashes (User Profile & Cart)", endpoint: "/api/hash" },
            { id: 5, name: "Lists (Task Queue & Recent Activity)", endpoint: "/api/list" },
            { id: 6, name: "Sets (Online Users & Mutual Interests)", endpoint: "/api/set" },
            { id: 7, name: "Sorted Sets (Leaderboards & Ranking)", endpoint: "/api/leaderboard" },
            { id: 8, name: "Rate Limiting & Throttling", endpoint: "/api/rate-limit" },
            { id: 9, name: "Distributed Locking (Concurrency Control)", endpoint: "/api/lock" },
            { id: 10, name: "Pub/Sub (Real-time Broadcast)", endpoint: "/api/pubsub" },
            { id: 11, name: "Geospatial (Nearby Search & Distance)", endpoint: "/api/geo" },
            { id: 12, name: "Analytics (HyperLogLog & Bitmaps)", endpoint: "/api/analytics" },
            { id: 13, name: "Pipelines & Atomic Transactions", endpoint: "/api/batch" },
        ],
    });
});
// Redis Ping Route
app.get("/redis", async (req, res) => {
    try {
        const ping = await redis.ping();
        res.status(200).json({
            status: "online",
            message: `Pong! Redis is working: ${ping}`,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Could not connect to Redis",
            error: error.message,
        });
    }
});
// Mount Aggregated Application Routes
app.use("/api", router);
// Global 404 Route Not Found Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `API Route '${req.originalUrl}' not found!`,
    });
});
// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
export default app;
//# sourceMappingURL=app.js.map