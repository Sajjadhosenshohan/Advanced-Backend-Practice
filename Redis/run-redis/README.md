# 🚀 Redis Complete Masterclass (All Real-World Use Cases)

Welcome to the **Complete Redis Backend Masterclass**! This repository is designed to be a 100% production-ready, clean, and beginner-friendly reference for **every major Redis usecase in modern backend development**.

Whether you are preparing for system design interviews, building scalable production microservices, or **recording an in-depth video tutorial/course in Bengali**, this codebase is structured to be crystal clear and easy to explain.

---

## 📑 Table of Contents

1. [Modular Architecture Pattern](#-modular-architecture-pattern)
2. [Quick Start & Setup](#-quick-start--setup)
3. [Postman Collection Import Guide](#-postman-collection-import-guide)
4. [The 13 Core Redis Use Cases (Video Walkthrough Guide)](#-the-13-core-redis-use-cases)

---

## 🏗️ Modular Architecture Pattern

This project strictly follows the **Modular Architecture pattern** (Route -> Controller -> Service):
- **`*.service.ts`**: Pure business logic & Redis commands (e.g. `redis.set()`, `redis.hset()`, `redis.zadd()`).
- **`*.controller.ts`**: Express request/response handling, input validation, and HTTP status codes.
- **`*.route.ts`**: Module endpoint definitions.
- **`src/app/routes/index.ts`**: Central router that imports all module routes and mounts them.
- **`src/app.ts`**: Express application setup, middlewares, global 404, and error handling.
- **`src/server.ts`**: Server bootstrap, listening on port, and handling graceful shutdown.

```
src/
├── app.ts                 # Express Application instance & global middlewares
├── server.ts              # Server listener & graceful shutdown
├── redis/
│   └── index.ts           # Primary & Subscriber Redis clients
└── app/
    ├── routes/
    │   └── index.ts       # Master route aggregator
    └── modules/
        ├── otp/           # otp.route.ts, otp.controller.ts, otp.service.ts
        ├── cache/         # cache.route.ts, cache.controller.ts, cache.service.ts
        ├── counter/       # counter.route.ts, counter.controller.ts, counter.service.ts
        ├── hash/          # hash.route.ts, hash.controller.ts, hash.service.ts
        ├── list/          # list.route.ts, list.controller.ts, list.service.ts
        ├── set/           # set.route.ts, set.controller.ts, set.service.ts
        ├── leaderboard/   # leaderboard.route.ts, leaderboard.controller.ts, leaderboard.service.ts
        ├── rateLimiter/   # rateLimiter.route.ts, rateLimiter.controller.ts, rateLimiter.service.ts
        ├── lock/          # lock.route.ts, lock.controller.ts, lock.service.ts
        ├── pubsub/        # pubsub.route.ts, pubsub.controller.ts, pubsub.service.ts
        ├── geo/           # geo.route.ts, geo.controller.ts, geo.service.ts
        ├── analytics/     # analytics.route.ts, analytics.controller.ts, analytics.service.ts
        └── batch/         # batch.route.ts, batch.controller.ts, batch.service.ts
```

---

## ⚡ Quick Start & Setup

### 1. Start Redis
You can run Redis with Docker:
```bash
docker compose up -d
```
Or use a local Redis server running on port `6379`.

### 2. Configure Environment (`.env`)
```env
PORT=5200
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379
```

### 3. Run Development Server
```bash
npm install
npm run dev
```

Server will start on: **`http://localhost:5200`**

---

## 📬 Postman Collection Import Guide

A complete, pre-configured Postman collection is included in this repository:
📄 **`Redis_Masterclass.postman_collection.json`**

### Steps to Import:
1. Open **Postman**.
2. Click the **Import** button in the top-left corner.
3. Drag & drop `Redis_Masterclass.postman_collection.json` or browse and select it.
4. The collection will appear with **all 13 modules organized in folders**, complete with sample JSON request bodies and query parameters.
5. Base URL variable is already set to `http://localhost:5200`.

---

## 🎓 The 13 Core Redis Use Cases

### 1. OTP & Temporary Tokens (Strings + TTL)
- **Redis Commands**: `SET key value EX seconds`, `GET key`, `TTL key`, `DEL key`
- **File**: `src/app/controller/otp-redis.ts`
- **কেন ব্যবহার করবেন?**: OTP বা পাসওয়ার্ড রিসেট টোকেন মাত্র কয়েক মিনিটের জন্য ভ্যালিড থাকে। SQL/MongoDB-তে রাখলে ক্রন জব দিয়ে ডিলিট করতে হয়। Redis-এর `EX` ফ্ল্যাগ নির্দিষ্ট সময় পর স্বয়ংক্রিয়ভাবে মুছে ফেলে।
- **Endpoints**:
  - `POST /api/otp/send-otp` -> Generates 4-digit OTP, sets in Redis for 300s.
  - `POST /api/otp/verify-otp` -> Verifies OTP, checks remaining TTL, deletes upon success.

---

### 2. API Response Caching & Invalidation (Cache-Aside)
- **Redis Commands**: `GET key`, `SET key value EX seconds`, `DEL key`
- **File**: `src/app/controller/cache-redis.ts`
- **কেন ব্যবহার করবেন?**: ডাটাবেস কোয়েরি অনেক সময় ১০০-৩০০ms সময় নেয়। Redis ইন-মেমোরি ক্যাশ ব্যবহার করলে রেসপন্স টাইম নেমে আসে ১-৫ms এ। নতুন আইটেম তৈরি হলে পুরনো ক্যাশ মুছে ফেলাকে বলে **Cache Invalidation**।
- **Endpoints**:
  - `GET /api/cache/products` -> 1st hit takes ~1500ms (DB simulation), 2nd hit takes ~1-3ms (Redis Cache)!
  - `POST /api/cache/products` -> Adds product and invalidates `cache:products:all`.
  - `DELETE /api/cache/clear?key=...` -> Manual cache clear.

---

### 3. Atomic Counters & Metrics (INCR / DECR)
- **Redis Commands**: `INCR key`, `DECR key`, `GET key`
- **File**: `src/app/controller/counter-redis.ts`
- **কেন ব্যবহার করবেন?**: সাধারণ ডাটাবেসে `views = views + 1` করতে গেলে Concurrency / Race Condition হয়। Redis Single-threaded এবং এর `INCR` কমান্ড পুরোপুরি Atomic। একসাথে ১০,০০০ ইউজার ক্লিক করলেও একটি কাউন্টও মিস হবে না।
- **Endpoints**:
  - `POST /api/counter/page-view` -> Increments page views atomically.
  - `POST /api/counter/like` -> Toggles likes (INCR on like, DECR on unlike).
  - `GET /api/counter/stats?key=...` -> Reads current counter value.

---

### 4. Object Storage & Shopping Cart (Redis Hashes)
- **Redis Commands**: `HSET`, `HGET`, `HGETALL`, `HINCRBY`, `HDEL`
- **File**: `src/app/controller/hash-redis.ts`
- **কেন Hash ব্যবহার করবেন String (JSON) এর বদলে?**:
  - JSON স্ট্রিং রাখলে ইউজারের একটি ফিল্ড (যেমন: `age`) আপডেট করার জন্য পুরো অবজেক্ট fetch -> parse -> modify -> stringify করতে হয়।
  - Redis Hash দিয়ে সরাসরি একটি ফিল্ড আপডেট বা রিড করা যায় (`HSET user:101 age 26`).
- **Endpoints**:
  - `POST /api/hash/user-profile` -> Saves user object in Hash.
  - `GET /api/hash/user-profile/:userId` -> Reads all fields or single field with `?field=email`.
  - `POST /api/hash/cart/add` -> Uses `HINCRBY` to manage shopping cart items.
  - `GET /api/hash/cart/:userId` -> Returns cart contents.

---

### 5. Message Queue & Activity Feed (Redis Lists)
- **Redis Commands**: `LPUSH`, `RPOP`, `LTRIM`, `LRANGE`
- **File**: `src/app/controller/list-redis.ts`
- **কেন List ব্যবহার করবেন?**:
  - Redis Lists হলো Doubly Linked List। শুরু বা শেষে ডাটা পুশ/পপ করার টাইম কমপ্লেক্সিটি $O(1)$।
  - **FIFO Queue**: Producer `LPUSH` করে, Consumer `RPOP` করে প্রসেস করে।
  - **Recent Activity Cap**: `LTRIM key 0 9` দিয়ে শুধুমাত্র শেষ ১০টি অ্যাক্টিভিটি রাখা যায়।
- **Endpoints**:
  - `POST /api/list/queue/push` -> Producer: Enqueue background email/job.
  - `POST /api/list/queue/pop` -> Consumer: Dequeue oldest job.
  - `POST /api/list/recent-activities` -> Logs activity capped at 10 entries via `LTRIM`.
  - `GET /api/list/recent-activities/:userId` -> Fetches recent activities.

---

### 6. Online Users & Mutual Interests (Redis Sets)
- **Redis Commands**: `SADD`, `SREM`, `SMEMBERS`, `SISMEMBER`, `SINTER`
- **File**: `src/app/controller/set-redis.ts`
- **কেন Set ব্যবহার করবেন?**:
  - Set-এ কোনো ডুপ্লিকেট ভ্যালু স্টোর হয় না।
  - `SISMEMBER` দিয়ে $O(1)$ সময়ে জানা যায় ইউজার অনলাইনে আছে কি না।
  - `SINTER` দিয়ে দুটি ইউজারের কমন ইন্টারেস্ট বা মিউচুয়াল ফ্রেন্ডস বের করা যায়।
- **Endpoints**:
  - `POST /api/set/online-status` -> Adds/Removes user from online set.
  - `GET /api/set/online-users` -> Returns list of all online users.
  - `GET /api/set/is-online/:userId` -> Instant boolean check if user is online.
  - `POST /api/set/interests` -> Stores user interest tags.
  - `GET /api/set/mutual-interests?user1=alice&user2=bob` -> Calculates common tags via `SINTER`.

---

### 7. Real-Time Leaderboards & Ranking (Sorted Sets / ZSET)
- **Redis Commands**: `ZADD`, `ZINCRBY`, `ZREVRANGE`, `ZREVRANK`, `ZSCORE`
- **File**: `src/app/controller/sorted-set-redis.ts`
- **কেন Sorted Set ব্যবহার করবেন?**: প্রতিটি মেম্বারের সাথে একটি `score` থাকে। ডেটা স্বয়ংক্রিয়ভাবে সাজানো থাকে। ১০ লাখ ইউজারের মধ্যেও мгণনাতে "Top 10 Player" এবং "ইউজারের র‍্যাংক কত" বের করা যায়।
- **Endpoints**:
  - `POST /api/leaderboard/submit-score` -> Adds or updates player score.
  - `POST /api/leaderboard/increment-score` -> Adds points (e.g. +150 points).
  - `GET /api/leaderboard/top?limit=10` -> Returns Top N players with rank & scores.
  - `GET /api/leaderboard/player-rank/:username` -> Returns exact rank and score for a user.

---

### 8. API Rate Limiting & Throttling (Fixed Window)
- **Redis Commands**: `INCR`, `EXPIRE`, `TTL`
- **File**: `src/app/controller/rate-limiter-redis.ts`
- **কেন Redis দিয়ে Rate Limiter বানাবেন?**: সেন্ট্রালাইজড Redis হওয়ার কারণে আপনার ব্যাকএন্ড সার্ভারের ১০টি ক্লাস্টার ইনস্ট্যান্স থাকলেও সবার জন্য একই লিমিট ট্র্যাক থাকবে। বটস বা ব্রুটফোর্স অ্যাটাক প্রতিরোধ করে।
- **Endpoints**:
  - `GET /api/rate-limit/test` -> Try clicking 6 times within 30 seconds; 6th request will be blocked with `429 Too Many Requests`.

---

### 9. Distributed Locking (Concurrency & Race Conditions)
- **Redis Commands**: `SET key token NX PX milliseconds`, Lua Script for safe release
- **File**: `src/app/controller/distributed-lock-redis.ts`
- **কেন Distributed Lock প্রয়োজন?**:
  - ফ্ল্যাশ সেলে ১টি মাত্র টিকিট বা প্রোডাক্ট স্টকে আছে। দুইজন একই মিলিসেকেন্ডে কিনলে যেন "Double Booking" না হয়।
  - `NX` নিশ্চিত করে শুধুমাত্র একজনই লক পাবে। কাজ শেষ হলে Lua Script দিয়ে নিরাপদে আনলক করা হয়।
- **Endpoints**:
  - `POST /api/lock/book-ticket` -> Acquires mutex lock, simulates booking work, safely releases lock.
  - `GET /api/lock/ticket-status/:ticketId` -> Checks current lock state and buyer.

---

### 10. Real-Time Event Broadcasting (Pub / Sub)
- **Redis Commands**: `PUBLISH channel message`, `SUBSCRIBE channel`
- **File**: `src/app/controller/pubsub-redis.ts`
- **কেন Pub/Sub ব্যবহার করবেন?**: Publisher জানে না কারা শুনছে (Decoupled Architecture)। চ্যানেলে ব্রডকাস্ট করলে সকল সক্রিয় সাবস্ক্রাইবাররা মুহূর্তেই বার্তা পেয়ে যায় (Real-time Chat, System Alerts, Microservice Event Bus)।
- **Endpoints**:
  - `POST /api/pubsub/publish` -> Broadcasts payload to channel.
  - `GET /api/pubsub/messages` -> Reads incoming messages captured by our dedicated subscriber connection.

---

### 11. Location Tracking & Nearby Search (Geospatial)
- **Redis Commands**: `GEOADD`, `GEODIST`, `GEOSEARCH`
- **File**: `src/app/controller/geo-redis.ts`
- **কেন Redis Geospatial?**: পাঠাও বা উবারের মতো "আমার আশেপাশে ৫ কিমির মধ্যে কোন কোন রাইডার আছে" অথবা "দুই রাইডারের মধ্যকার দূরত্ব কত" বের করতে Geohash অ্যালগরিদম ব্যবহার করে বিদ্যুৎ গতিতে রেডিয়াস কুয়েরি করে।
- **Endpoints**:
  - `POST /api/geo/add-location` -> Stores rider coordinates (Longitude & Latitude).
  - `GET /api/geo/distance?rider1=...&rider2=...&unit=km` -> Calculates exact distance.
  - `GET /api/geo/nearby?longitude=...&latitude=...&radiusKm=5` -> Finds all riders within radius.

---

### 12. Massive Scale Analytics (HyperLogLog & Bitmaps)
- **Redis Commands**: `PFADD`, `PFCOUNT`, `SETBIT`, `GETBIT`, `BITCOUNT`
- **File**: `src/app/controller/analytics-redis.ts`
- **কেন এই দুটি ডেটা স্ট্রাকচার ভিডিওর জন্য স্পেশাল?**:
  - **HyperLogLog (HLL)**: ১ কোটি ইউনিক আইপি গুনতে সেট ব্যবহার করলে মেগাবাইট/গিগাবাইট র‍্যাম লাগত। HLL মাত্র **১২ KB** ফিক্সড মেমোরি দিয়ে ০.৮১% নির্ভুলতায় কোটি কোটি ইউনিক ভিজিটর কাউন্ট করতে পারে!
  - **Bitmaps**: বিট লেভেলে (0 বা 1) ডেটা রাখে। ১ কোটি ইউজারের ডেইলি এক্টিভ ইউজার (DAU) বা উপস্থিতি ট্র্যাক করতে মাত্র **১.২ MB** র‍্যাম লাগে!
- **Endpoints**:
  - `POST /api/analytics/hll/visit` -> Records unique visitor with HyperLogLog.
  - `GET /api/analytics/hll/count?page=pricing` -> Returns estimated unique count.
  - `POST /api/analytics/bitmap/active` -> Sets user bit to 1 for given date.
  - `GET /api/analytics/bitmap/status?userId=42&date=...` -> Checks status & total active count.

---

### 13. Batching & Safe Money Transfers (Pipelines & Transactions)
- **Redis Commands**: `PIPELINE`, `MULTI`, `EXEC`, `DECRBY`, `INCRBY`
- **File**: `src/app/controller/batch-redis.ts`
- **কেন ব্যবহার করবেন?**:
  - **Pipeline**: প্রতি কমান্ডে ১টি করে নেটওয়ার্ক রাউন্ড-ট্রিপ না করে, ১০০টি কমান্ড এক প্যাকেটে পাঠিয়ে ১০-২০ গুণ স্পিড আপ করে।
  - **Transactions (MULTI/EXEC)**: ওয়ালেট ট্রান্সফার (টাকা মাইনাস ও প্লাস হওয়া) একটি সিঙ্গেল অ্যাটমিক ব্লকে নিশ্চিত করে।
- **Endpoints**:
  - `POST /api/batch/pipeline-demo` -> Demonstrates batch execution of commands.
  - `POST /api/batch/wallet-transfer` -> Atomic wallet balance transfer between users.

---

## 🎬 Tips for Recording Your Video / Tutorial (Bengali Outline)
1. **Intro**: Redis শুধু ক্যাশিং এর জন্য নয়, এটি একটি কমপ্লিট ইন-মেমোরি ডেটা স্ট্রাকচার স্টোর।
2. **Architecture**: Docker দিয়ে Redis রান করানো ও Express + ioredis কানেকশন দেখানো।
3. **Strings**: OTP Expiration ও Cache-Aside প্যাটার্ন লাইভ স্পিড টেস্ট (1500ms vs 2ms) পোস্টম্যানে দেখানো।
4. **Hashes vs Strings**: কেন JSON string এর চেয়ে Hash বেশি এফিশিয়েন্ট।
5. **Lists & Sets**: Queue ও Online User ট্র্যাকার।
6. **ZSET Leaderboard**: রিয়েলটাইম গেম লিডারবোর্ড ও টপ প্লেয়ার র‍্যাংকিং।
7. **Production Features**: Rate Limiting ও Distributed Lock (Double Booking প্রতিরোধ)।
8. **Advanced / Interview Favorite**: HyperLogLog (12 KB ফিক্সড মেমোরি ম্যাজিক) ও Bitmaps।
9. **Transactions**: ওয়ালেট ট্রান্সফার ও পাইপলাইনিং।

Happy Coding & Content Creation! 🚀
