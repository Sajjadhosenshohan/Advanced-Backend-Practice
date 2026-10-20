import "dotenv/config";
import app from "./app.js";
import { redis, redisSub } from "./redis/index.js";

const port = process.env.PORT || 5200;

// Start Server
const server = app.listen(port, () => {
  console.log(`====================================================`);
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`🔥 Redis Modular Masterclass API is active on /api`);
  console.log(`====================================================`);
});

// Graceful shutdown handling
const gracefulShutdown = async () => {
  console.log("\nGracefully shutting down...");
  server.close(async () => {
    try {
      await redis.quit();
      await redisSub.quit();
      console.log("Redis connections closed.");
    } catch (e) {
      console.error("Error closing Redis connections:", e);
    }
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
