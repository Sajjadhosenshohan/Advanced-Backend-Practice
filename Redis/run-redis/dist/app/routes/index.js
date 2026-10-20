import { Router } from "express";
import { OtpRoutes } from "../modules/otp/otp.route.js";
import { CacheRoutes } from "../modules/cache/cache.route.js";
import { CounterRoutes } from "../modules/counter/counter.route.js";
import { HashRoutes } from "../modules/hash/hash.route.js";
import { ListRoutes } from "../modules/list/list.route.js";
import { SetRoutes } from "../modules/set/set.route.js";
import { LeaderboardRoutes } from "../modules/leaderboard/leaderboard.route.js";
import { RateLimiterRoutes } from "../modules/rateLimiter/rateLimiter.route.js";
import { LockRoutes } from "../modules/lock/lock.route.js";
import { PubSubRoutes } from "../modules/pubsub/pubsub.route.js";
import { GeoRoutes } from "../modules/geo/geo.route.js";
import { AnalyticsRoutes } from "../modules/analytics/analytics.route.js";
import { BatchRoutes } from "../modules/batch/batch.route.js";
const router = Router();
const moduleRoutes = [
    { path: "/otp", route: OtpRoutes },
    { path: "/cache", route: CacheRoutes },
    { path: "/counter", route: CounterRoutes },
    { path: "/hash", route: HashRoutes },
    { path: "/list", route: ListRoutes },
    { path: "/set", route: SetRoutes },
    { path: "/leaderboard", route: LeaderboardRoutes },
    { path: "/rate-limit", route: RateLimiterRoutes },
    { path: "/lock", route: LockRoutes },
    { path: "/pubsub", route: PubSubRoutes },
    { path: "/geo", route: GeoRoutes },
    { path: "/analytics", route: AnalyticsRoutes },
    { path: "/batch", route: BatchRoutes },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
export default router;
//# sourceMappingURL=index.js.map