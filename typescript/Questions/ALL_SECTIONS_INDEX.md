# 📚 Backend Interview Question Bank (Batch 1) - Master Index
> **Author / Resource:** Shohan | Node.js Backend | Mid → Senior  
> **Marks Legend:** ⭐ = সবচেয়ে বেশি আসে (Frequently Asked) | 🔥 = Senior Level / Deep Concept  
> **Golden Rule of Answering:** প্রতিটি প্রশ্নের উত্তর: **কী (What) → কেন (Why) → Trade-off → আমার Project এ কোথায় ব্যবহার করেছি**

---

## 📑 Table of Contents (সকল সেকশন)

1. [JavaScript | Core Concepts](#1-javascript--core-concepts)
2. [JavaScript | Output Prediction](#2-javascript--output-prediction)
3. [JavaScript | Deep Dive](#3-javascript--deep-dive)
4. [TypeScript | All Questions (🎯 Today's Target)](#4-typescript--all-questions-🎯-todays-target)
5. [Node.js | Core](#5-nodejs--core)
6. [Node.js | Advanced](#6-nodejs--advanced)
7. [Node.js | API Scenarios](#7-nodejs--api-scenarios)
8. [Express & API Design](#8-express--api-design)
9. [Architecture & Design Patterns](#9-architecture--design-patterns)
10. [Security | Auth & Basics](#10-security--auth--basics)
11. [Security | Advanced](#11-security--advanced)
12. [SQL & PostgreSQL | Core](#12-sql--postgresql--core)
13. [SQL & PostgreSQL | Query Challenges](#13-sql--postgresql--query-challenges)
14. [SQL & PostgreSQL | Advanced](#14-sql--postgresql--advanced)
15. [MongoDB & Mongoose (Core + Advanced)](#15-mongodb--mongoose-core--advanced)
16. [ORM (Prisma)](#16-orm-prisma)
17. [Database Design](#17-database-design)
18. [Database, Redis, Queue | Scenarios](#18-database-redis-queue--scenarios)
19. [Redis & Caching | Core](#19-redis--caching--core)
20. [Redis, Kafka & Messaging | Advanced](#20-redis-kafka--messaging--advanced)
21. [Queue & Background Jobs](#21-queue--background-jobs)
22. [Real-time (Socket.IO)](#22-real-time-socketio)
23. [Payments & Webhooks](#23-payments--webhooks)
24. [System Design | Fundamentals](#24-system-design--fundamentals)
25. [System Design | Deep Dives](#25-system-design--deep-dives)
26. [System Design | Round 2 (Scenario Twists)](#26-system-design--round-2-scenario-twists)
27. [Networking | Core](#27-networking--core)
28. [Networking, OS & Linux | Advanced](#28-networking-os--linux--advanced)
29. [OS & Linux | Core](#29-os--linux--core)
30. [Git & GitHub](#30-git--github)
31. [Docker, Nginx, CI/CD & Cloud | Core](#31-docker-nginx-cicd--cloud--core)
32. [Docker, Kubernetes & AWS | Advanced](#32-docker-kubernetes--aws--advanced)
33. [DevOps | Production Scenarios](#33-devops--production-scenarios)
34. [Testing & Observability | Core](#34-testing--observability--core)
35. [Testing & Code Quality | Advanced](#35-testing--code-quality--advanced)
36. [Performance & Production Debugging](#36-performance--production-debugging)
37. [AI Engineering | Core](#37-ai-engineering--core)
38. [AI Engineering | Scenarios](#38-ai-engineering--scenarios)
39. [AI Engineering | Advanced](#39-ai-engineering--advanced)
40. [n8n & Automation](#40-n8n--automation)
41. [Frontend (Basics)](#41-frontend-basics)
42. [DSA | Algorithms](#42-dsa--algorithms)
43. [DSA | Coding Round (JS/Node Hands-on)](#43-dsa--coding-round-jsnode-hands-on)
44. [Resume Deep-Dive](#44-resume-deep-dive)
45. [Behavioral & HR | Core](#45-behavioral--hr--core)
46. [Behavioral | English Communication](#46-behavioral--english-communication)
47. [Rapid Fire (All Topics)](#47-rapid-fire-all-topics)

---

### 1. JavaScript | Core Concepts
1. What is a closure? Give a real use case. ⭐
2. Why does var in a loop with setTimeout print the same value? How to fix? ⭐
3. Explain hoisting for var, let, const, and functions. ⭐
4. What is the Temporal Dead Zone?
5. What is the scope chain? Lexical vs dynamic scope.
6. What is an execution context? Creation vs execution phase.
7. Explain the 4 rules of this. ⭐
8. Why does this get lost when a method is passed as a callback?
9. Difference between call, apply, bind. Write a bind polyfill. ⭐
10. How do arrow functions handle this?
11. What does the new keyword do internally? ⭐
12. Explain the prototype chain. `__proto__` vs `prototype`. ⭐
13. How does class inheritance work under the hood?
14. Primitive vs reference types. Pass by value or reference? ⭐
15. `==` vs `===`. Explain type coercion with examples. ⭐
16. Why is `0.1 + 0.2 !== 0.3`? How to handle money?
17. null vs undefined. Why `typeof null === 'object'`?
18. `??` vs `||`. When does it matter?
19. Shallow vs deep copy. How to deep clone? Limits of `JSON.parse(JSON.stringify())`. ⭐
20. `Object.freeze` vs `seal` vs `const`.
21. Map vs Object. When WeakMap?
22. Explain the event loop. ⭐🔥
23. Microtask vs macrotask. Predict output of mixed setTimeout, Promise, process.nextTick. ⭐
24. Callback hell and how Promises solve it.
25. `Promise.all` vs `allSettled` vs `race` vs `any`. ⭐
26. Sequential vs parallel await. How to run 1000 tasks with concurrency limit 10? 🔥
27. How does error handling work in async/await? What if you forget await?
28. What is an unhandled rejection? What happens in Node?
29. Implement debounce and throttle. ⭐
30. What is currying? Implement curry.
31. What is memoization? Implement it. When is it harmful?
32. What are higher-order functions? Examples.
33. ES Modules vs CommonJS differences. ⭐
34. Generators and iterators: what and why?
35. What are Symbol and Proxy used for?
36. How does garbage collection work (mark & sweep)? ⭐
37. Common causes of memory leaks in JS/Node. ⭐
38. Implement `Promise.all`, `Array.map`, `reduce`, `flatten`.
39. Implement an EventEmitter.
40. How would you implement retry with exponential backoff?

---

### 2. JavaScript | Output Prediction
1. `console.log(a); var a = 1;` vs `let a = 1;` → কি print হয়?
2. `for (var i=0;i<3;i++) setTimeout(()=>console.log(i))` → output? `let` দিলে?
3. Order: `setTimeout`, `Promise.then`, `process.nextTick`, sync log ⭐
4. Order: async function এ `await` এর আগে-পরের log ⭐
5. `setImmediate` vs `setTimeout(0)` inside an I/O callback.
6. `[1,2,3].map(parseInt)` → output?
7. `[10,9,1].sort()` → output?
8. `typeof NaN`, `NaN === NaN`, `[] + {}`, `[] == ![]`
9. `0 || 1 ?? 2`, `null ?? 'a'`, `0 ?? 'a'`
10. `const obj = {a:1}; const b = obj; b.a = 2;` → `obj.a`?
11. Method extracted: `const f = obj.method; f()` → `this`?
12. Arrow function inside object method: `this` কি?
13. Closure counter: দুটি আলাদা counter instance এ কি হয়?
14. `Promise.resolve().then(()=>{throw new Error()}).catch(...).then(...)` → কোনটা চলবে?
15. `await` ছাড়া async function return → কি পাই?
16. `Promise.all` এ একটা reject হলে বাকিগুলোর কি হয়?
17. `forEach` এ `await` দিলে কেন কাজ করে না? ⭐
18. `delete`, `Object.freeze` এর পর property বদলালে কি (strict mode এ)?
19. `JSON.stringify` এ undefined, function, Date, NaN কি হয়?
20. `new Array(3)` vs `Array(3).fill()` → map কাজ করে?

---

### 3. JavaScript | Deep Dive
1. How does V8 compile JS (Ignition, TurboFan, JIT)?
2. What are hidden classes and why do they matter for performance?
3. What is the difference between Array and typed arrays?
4. How do async functions desugar to Promises/generators?
5. What is a thenable? How does await treat it?
6. How does Promise.race behave with timeout patterns? Why does the loser keep running?
7. How do you cancel a Promise? AbortController internals.
8. What are the pitfalls of async in Array.map / forEach / reduce?
9. What is the difference between Object.assign and spread?
10. What is a getter trap vs Object.defineProperty?
11. How does WeakRef / FinalizationRegistry work? When to use?
12. What is tail-call optimization? Does Node support it?
13. What is the difference between for...in, for...of, forEach?
14. How does Symbol.iterator make a custom object iterable?
15. How does JSON.stringify handle circular references? Fix?
16. What are tagged template literals used for (SQL safety)?
17. What is event delegation and why it works (bubbling vs capturing)?
18. How does import() dynamic import differ from require?
19. What is top-level await? Limits?
20. How do you detect and avoid prototype pollution?
21. Why is eval / new Function dangerous?

---

### 4. TypeScript | All Questions (🎯 Today's Target)
> বিস্তারিত ফোল্ডার: [`01-typescript/`](./01-typescript/)
1. type vs interface. ⭐
2. any vs unknown vs never. ⭐
3. What are generics? Write a constrained generic function. ⭐🔥
4. Explain union, intersection, and discriminated unions. ⭐
5. What is type narrowing? Custom type guards.
6. Utility types: Partial, Pick, Omit, Record, ReturnType. ⭐
7. keyof, typeof, indexed access types.
8. Mapped and conditional types. What does infer do?
9. Does TypeScript exist at runtime? Type erasure.
10. Structural vs nominal typing.
11. How do you validate runtime data? Zod vs class-validator.
12. How do you extend Express Request type?
13. What does strict mode enable?
14. Enum vs const object vs union literal.
15. satisfies vs type assertion as.
16. What are branded types in TypeScript? Use case.
17. How do you type a function that returns different types based on input (overloads vs conditional)?
18. readonly vs as const vs Object.freeze.
19. What is declaration merging? Module augmentation?

---

### 5. Node.js | Core
1. Explain Node architecture: V8, libuv, thread pool. ⭐
2. Explain the 6 phases of the event loop. ⭐🔥
3. process.nextTick vs setImmediate vs setTimeout(0) vs Promise. ⭐
4. Node is single-threaded, so how does it handle thousands of requests? ⭐
5. Which operations use the libuv thread pool? How to change its size?
6. How do you handle CPU-intensive work in Node? ⭐
7. cluster vs worker_threads vs child_process. ⭐🔥
8. How does cluster distribute connections? Why round-robin?
9. What are streams? Types of streams. ⭐
10. What is backpressure and how to handle it? ⭐🔥
11. How do you process a 5GB file without crashing? ⭐
12. Buffer vs string. When do you use Buffer?
13. fs.readFile vs createReadStream.
14. How does require work? Module cache and circular dependency.
15. What does package.json exports do?
16. How to implement graceful shutdown? ⭐🔥
17. How do you handle uncaughtException and unhandledRejection?
18. How do you find and debug a memory leak in production? ⭐🔥
19. How do you detect event loop blocking?
20. How do you profile a slow Node API?
21. What is AsyncLocalStorage? Use for request ID.
22. What are EventEmitter pitfalls (memory leak warning)?
23. How does Node handle HTTP keep-alive and timeouts?
24. crypto: hash vs HMAC vs encryption. timingSafeEqual why?
25. How do you manage environment config safely? 12-factor.
26. npm vs yarn vs pnpm. What is a lockfile? semver ranges.
27. How to reduce Node memory usage? --max-old-space-size.
28. How would you scale a Node app to 100k concurrent users? 🔥

---

### 6. Node.js | Advanced
1. How does libuv handle network I/O vs file I/O differently? ⭐
2. What is uv_run loop iteration? Where do Promises run?
3. Why can setTimeout(fn, 0) fire after setImmediate outside I/O?
4. How do you limit concurrency of outgoing HTTP calls? (agent, maxSockets)
5. What is HTTP keep-alive agent and why reuse connections?
6. How do you stream a file download with Range support?
7. How do you pipe a stream to S3 without buffering entire file?
8. How do you handle backpressure on a WebSocket?
9. What happens when you await inside a stream data handler?
10. How does worker_threads share memory? When is it worse than a single thread?
11. How would you build a worker pool (Piscina concept)?
12. How do you pass large data to a child process efficiently?
13. How do you do zero-downtime restart with cluster?
14. How does the http server handle slowloris? Timeouts to set.
15. What is server.headersTimeout / requestTimeout?
16. How do you profile with --prof, --cpu-prof, clinic doctor? 🔥
17. What does a flame graph show? How do you read it?
18. What does a heap snapshot comparison tell you?
19. How do you detect a leaking EventEmitter listener?
20. What is the diagnostics_channel / perf_hooks use?
21. How do you secure child_process.exec against injection?
22. spawn vs exec vs execFile vs fork.
23. How do you implement a custom Transform stream (e.g., CSV to JSON)?
24. What are Node's AbortSignal.timeout and util.promisify for?
25. How do you design a plugin/module system in Node?

---

### 7. Node.js | API Scenarios
1. API এ 5000 req/sec আসছে, server সার্ভিস দিচ্ছে না। step by step কি করবেন? ⭐
2. একটা endpoint এ CSV upload (500MB) → process → DB insert. Design করুন. ⭐
3. বহু user একই সময়ে একই resource update করছে → race condition কিভাবে ঠেকাবেন? ⭐
4. থার্ড পার্টি API ২০ সেকেন্ড লাগাচ্ছে, আপনার API কি করবে? (timeout, circuit breaker, queue)
5. একই payment request দুইবার এল। কিভাবে একবার চালাবেন? ⭐🔥
6. Server restart হলে in-flight request হারায়। কি করবেন? ⭐
7. Memory ধীরে বাড়ছে প্রতি ১০ ঘণ্টায় restart লাগছে। কিভাবে খুঁজবেন? ⭐
8. Login API এ brute force আক্রমণ। কি করবেন?
9. Admin dashboard এ ভারী report নামাতে পুরো API slow হয়ে যাচ্ছে। কি করবেন?
10. একটা endpoint এ বারবার একই DB query যাচ্ছে, optimize করুন।
11. বড় response (50MB JSON) কিভাবে পাঠাবেন?
12. Microservice A কে B কল করতে হবে, B down। design?
13. একটা endpoint এ user প্রতি পৃথক permission, কিভাবে scalable রাখবেন?
14. পুরনো API break না করে নতুন field যোগ করবেন কিভাবে?
15. সব API এ কিভাবে request tracing যোগ করবেন?
16. Cron job ২ instance এ দুইবার চলছে। fix? ⭐
17. এক request এ ৩টি external API call, কিভাবে fast করবেন?
18. Webhook endpoint এ বহু duplicate আসছে। কিভাবে সামলাবেন? ⭐
19. Soft delete করা user আবার একই email দিয়ে register করতে চায়। কি করবেন?
20. বড় table এ column রিনেম করতে হবে, downtime ছাড়া।

---

### 8. Express & API Design
1. How does the Express middleware chain work? ⭐
2. How does error-handling middleware work (4 params)? ⭐
3. How do you structure a large Express project? ⭐
4. Controller → service → repository: why separate?
5. PUT vs PATCH vs POST. Idempotent vs safe methods. ⭐
6. Which status code for: validation fail, duplicate, unauthorized, forbidden, rate limit? ⭐
7. Offset vs cursor pagination. Why is offset slow? ⭐🔥
8. How do you design API versioning?
9. What is an idempotency key? How do you implement it? ⭐🔥
10. How do you design a consistent error response?
11. How do you implement rate limiting? Algorithms. ⭐
12. How do you handle file upload? Why presigned URL? ⭐
13. How do you handle long-running requests? (202, polling, webhook)
14. REST vs GraphQL vs gRPC. ⭐
15. What is the N+1 problem in GraphQL? DataLoader.
16. How do you implement request validation (Zod/Joi)?
17. What is HATEOAS? Do you use it?
18. ETag and Cache-Control: how do you cache API responses?
19. How do you design a bulk API?
20. How do you document APIs? OpenAPI.
21. Express vs Fastify vs NestJS. ⭐
22. What is dependency injection? Why useful for testing?
23. How do you make APIs backward compatible?
24. How do you handle partial failures in an API?
25. How would you design a public API for third-party developers? 🔥

---

### 9. Architecture & Design Patterns
1. Explain SOLID with Node examples. ⭐
2. Dependency injection without a framework.
3. Repository vs Active Record pattern.
4. Service layer vs domain layer. Anemic domain model?
5. Clean/hexagonal architecture: ports and adapters.
6. DDD basics: entity, value object, aggregate, bounded context. 🔥
7. CQRS and event sourcing: trade-offs. 🔥
8. Strategy, factory, observer, singleton, adapter: Node examples.
9. When is a singleton harmful (testing, cluster)?
10. How do you structure a monorepo (Turborepo/Nx)? Pros, cons?
11. How do you manage shared code across microservices?
12. What is the strangler fig pattern?
13. API gateway vs BFF (backend for frontend).
14. How do you design service-to-service auth (mTLS, JWT, internal token)?
15. How do you version events and schemas (schema registry)?
16. How do you handle distributed tracing across services?
17. How do you avoid a distributed monolith?
18. Feature flags: design and risks.
19. Config management across environments.
20. How do you handle backward-incompatible DB changes with multiple app versions running?
21. What is the 12-factor app? Which factors do people break?
22. How do you make a service idempotent end to end?
23. What is the difference between orchestration and choreography?
24. How do you design a plugin architecture for integrations (Twilio, Brevo, SendGrid)?
25. How do you abstract third-party providers so you can swap them?

---

### 10. Security | Auth & Basics
1. Session vs JWT. Trade-offs. ⭐
2. Access + refresh token flow. How does rotation work? ⭐🔥
3. How do you revoke a JWT?
4. Where to store tokens: localStorage vs httpOnly cookie? ⭐
5. Explain OAuth 2.0 authorization code flow + PKCE. ⭐
6. OAuth vs OIDC.
7. RBAC vs ABAC. How do you implement permissions? ⭐
8. bcrypt vs argon2. Why salt?
9. How do you design password reset securely?
10. How do you implement 2FA/TOTP?
11. OWASP Top 10: name and explain 5. ⭐
12. How do you prevent SQL/NoSQL injection? ⭐
13. XSS vs CSRF. Prevention. ⭐
14. What is IDOR? Give an example in your project. ⭐
15. What is SSRF?
16. What is CORS and a preflight request? ⭐
17. What does helmet do? CSP?
18. httpOnly, secure, sameSite cookie flags. ⭐
19. How do you verify a webhook signature? Why raw body? ⭐
20. What is a replay attack? Prevention.
21. How do you store and rotate secrets?
22. How do you prevent brute-force login?
23. What is mass assignment?
24. How do you secure file uploads?
25. How do you handle PII and GDPR for EU clients? 🔥
26. How do you secure Socket.IO connections?

---

### 11. Security | Advanced
1. How does JWT signature verification work (HS256 vs RS256)? ⭐
2. What is the alg: none attack?
3. How do you implement refresh token reuse detection? 🔥
4. How do you design API keys (hashed storage, prefix, scope, rotation)?
5. How does CSRF token / double-submit cookie work?
6. What is clickjacking? How do you prevent it?
7. How does CSP stop XSS? What is nonce?
8. What is HSTS? What does preload do?
9. How do you prevent timing attacks on token comparison?
10. How do you store card data or avoid it (tokenization)?
11. How do you secure internal admin dashboards?
12. How do you implement audit logging for compliance?
13. How do you encrypt data at rest vs in transit vs application level? 🔥
14. What is envelope encryption / KMS?
15. How do you implement field-level encryption for PII?
16. What is a JWT kid header and key rotation (JWKS)?
17. How do you protect against enumeration (login, reset, signup)?
18. How do you prevent open redirect vulnerability?
19. What is path traversal? Prevention in file serving.
20. What is zip slip? Unsafe deserialization?
21. How do you handle supply chain risk in npm (lockfile, audit, provenance)? ⭐
22. What is ReDoS? How do you avoid it?
23. How do you secure WebSocket origin and message validation?
24. How do you prevent webhook endpoint abuse (IP allowlist, signature, timestamp)?
25. What is the principle of least privilege in AWS IAM? Example policy.

---

### 12. SQL & PostgreSQL | Core
1. Inner vs left vs full join. Write a query for users with no orders. ⭐
2. WHERE vs HAVING.
3. Subquery vs CTE. Recursive CTE use case.
4. Window functions: ROW_NUMBER, RANK, LAG. Top-N per group. ⭐🔥
5. How does a B-tree index work? ⭐
6. Composite index: why column order matters? ⭐🔥
7. Covering index, partial index, when to use? ⭐
8. Why might the planner ignore your index? ⭐
9. How do you read EXPLAIN ANALYZE? ⭐🔥
10. Seq scan vs index scan vs bitmap scan.
11. How do you debug a slow query? ⭐
12. Over-indexing: what is the cost?
13. Explain ACID. ⭐
14. Isolation levels and anomalies (dirty, non-repeatable, phantom). ⭐🔥
15. What is MVCC?
16. SELECT FOR UPDATE, SKIP LOCKED. When to use? ⭐
17. Optimistic vs pessimistic locking. ⭐
18. How do you prevent double-spending in a wallet? ⭐🔥
19. What is a deadlock? How do you avoid it? ⭐
20. What is the N+1 problem? How to detect and fix? ⭐
21. What is connection pooling? PgBouncer? Pool exhaustion?
22. View vs materialized view.
23. How do you implement upsert (ON CONFLICT)?
24. JSONB: when to use? How to index?
25. How does VACUUM work? What is bloat?
26. Table partitioning: when and how?
27. Replication: sync vs async, replication lag issue.
28. How do you do zero-downtime migration? ⭐🔥
29. How do you add a column to a 100M row table safely?
30. Soft delete: pros, cons, index impact.
31. How would you implement full-text search in Postgres?
32. Backup and point-in-time recovery.

---

### 13. SQL & PostgreSQL | Query Challenges
1. 2nd highest salary (তিনভাবে). ⭐
2. Top 3 products per category (window). ⭐
3. Duplicate email খুঁজে বের করা ও delete.
4. Users with no orders.
5. Running total of daily revenue.
6. Month-over-month growth (LAG).
7. Consecutive login days (gaps and islands). 🔥
8. Customers who bought A but not B.
9. Median salary.
10. Employee → manager hierarchy (recursive CTE).
11. Pagination query (keyset) লিখুন. ⭐
12. Wallet balance update safely (transaction + lock). ⭐🔥
13. Upsert with ON CONFLICT.
14. Top N users by spend in last 30 days, with index suggestion.
15. Query এ LIKE '%abc%' কেন slow? Fix?
16. COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col).
17. NOT IN vs NOT EXISTS (NULL trap). ⭐
18. EXISTS vs IN vs JOIN performance.
19. Deadlock হয় এমন দুটি transaction লিখুন, তারপর fix করুন.
20. 100M row table এ ORDER BY created_at LIMIT 20 slow. কী করবেন?

---

### 14. SQL & PostgreSQL | Advanced
1. How does Postgres store rows (heap, TOAST, pages)?
2. What is WAL? How does it relate to replication and crash recovery? 🔥
3. Logical vs physical replication.
4. What causes table bloat? How does autovacuum work?
5. How does the query planner choose a plan? What if statistics are stale (ANALYZE)?
6. Hash join vs merge join vs nested loop: when each?
7. BRIN vs GIN vs GiST vs B-tree: when each?
8. What is index-only scan? Visibility map?
9. How do you index for ORDER BY ... LIMIT + filter?
10. How do you index JSONB for key lookups vs containment?
11. What is advisory lock use case?
12. SERIALIZABLE isolation: retry strategy for serialization failure. 🔥
13. How do you implement a queue on Postgres (SKIP LOCKED)?
14. How do you do online index creation (CONCURRENTLY)?
15. How do you handle long-running transactions and their danger?
16. What are generated columns and exclusion constraints (booking overlap)? 🔥
17. How do you implement row-level security for multi-tenancy?
18. How do you design time-series data in Postgres (partitioning, retention)?

---

### 15. MongoDB & Mongoose (Core + Advanced)
1. Embed vs reference. How do you decide? ⭐🔥
2. What is the 16MB limit? Unbounded array problem. ⭐
3. Explain compound index and the ESR rule. 🔥
4. TTL index use cases.
5. Aggregation pipeline stages. $lookup performance. ⭐
6. How do you optimize a slow aggregation?
7. Does MongoDB support transactions? When needed? ⭐
8. Replica set: election, primary, secondary. ⭐
9. Read concern vs write concern vs read preference.
10. What is sharding? How to choose a shard key? ⭐🔥
11. populate vs $lookup. N+1 in Mongoose.
12. What does lean() do?
13. Mongoose middleware/hooks and pitfalls.
14. How do you handle schema migration in MongoDB?
15. SQL vs NoSQL: when to choose which? ⭐🔥
16. Why did you choose MongoDB for Doerly? Would you change? ⭐
17. Where does MongoDB sit in CAP?
18. How do you handle money and concurrency in MongoDB?
19. How do you model chat messages at scale?
20. Change streams: use cases.
21. Mongo: how does the WiredTiger storage engine work (basic)?
22. Mongo: what happens during a replica set failover for in-flight writes? 🔥
23. Mongo: how do you choose between $lookup and denormalization?
24. Mongo: what are covered queries?
25. Mongo: jumbo chunks and balancer issues.
26. Mongo: how do you enforce schema (JSON schema validation)?
27. Mongo: how do you migrate data safely with zero downtime?

---

### 16. ORM (Prisma)
1. Prisma vs TypeORM vs Drizzle vs Sequelize. ⭐
2. include vs select. How do you avoid N+1? ⭐
3. How do $transaction (sequential vs interactive) differ? ⭐
4. migrate dev vs migrate deploy.
5. How do you run raw SQL safely?
6. Prisma connection pooling in serverless.
7. Common Prisma error codes (P2002, P2025).
8. Limits of ORMs: when do you drop to raw SQL?
9. How do you implement soft delete in Prisma?
10. How do you test code that uses Prisma?

---

### 17. Database Design
1. Explain normalization 1NF to 3NF. When to denormalize? ⭐
2. Design schema: e-commerce / booking / chat / marketplace. ⭐
3. How do you model many-to-many?
4. How do you model a polymorphic relation?
5. Design a wallet/ledger system. ⭐🔥
6. Why integer cents instead of float?
7. How do you keep an audit log?
8. UUID vs auto-increment vs ULID. ⭐
9. Multi-tenancy approaches. ⭐🔥
10. How do you model status/state machine (order, job)?
11. How do you design for soft delete + unique constraints?
12. How do you model tree/comment hierarchy?
13. How do you design a notification table at scale?
14. How do you design a subscription/billing schema?
15. How do you archive old data?
16. How do you design for reporting without hurting OLTP?

---

### 18. Database, Redis, Queue | Scenarios
1. ১০ লাখ user এর leaderboard কিভাবে real-time রাখবেন? ⭐
2. Cache এ stale data দেখাচ্ছে। কেন হয়, কি করবেন?
3. Redis এ 1M key TTL একই সময়ে expire → DB মাথায় চাপ। fix?
4. Redis memory full হয়ে গেছে। কি করবেন?
5. Queue এ ১ লাখ job জমেছে, worker ধীর। কি করবেন? ⭐
6. একটা job fail হয়ে বারবার retry হচ্ছে ও email বারবার যাচ্ছে। কেন, fix? ⭐
7. Order তৈরি + payment + inventory + notification: এক service এ বিফল হলে? Saga দিয়ে বলুন। ⭐🔥
8. DB থেকে সময়মতো event queue তে পাঠাতে চাই, দুটো সমান সঙ্গে কিভাবে নিশ্চিত করবেন? (outbox)
9. Read-heavy table বাড়ছে, write slow। কি করবেন?
10. বহু tenant এক DB, এক tenant সব resource খাচ্ছে (noisy neighbor)। fix?
11. DB migration একটা environment এ ফেল করেছে। কি করবেন?
12. Mongo query slow, explain দেখাচ্ছে COLLSCAN। কি করবেন?
13. Chat message collection বড় হচ্ছে, কিভাবে shard/archive?
14. User এর balance মিলছে না। কিভাবে কারণ খুঁজবেন (ledger audit)? ⭐🔥
15. Backup restore করা নির্ভরযোগ্য কিনা কিভাবে জানবেন?
16. Idempotent consumer লিখুন (processed-ids table). ⭐
17. Distributed lock ছাড়া কি করা যায় (DB unique constraint)?
18. সবাই একই সময়ে একটা item কিনতে চাইছে (flash sale / last slot booking). Design? ⭐

---

### 19. Redis & Caching | Core
1. Why is Redis fast if single-threaded? ⭐
2. Redis data types and a use case for each. ⭐
3. Cache-aside vs write-through vs write-back. ⭐
4. How do you handle cache invalidation? ⭐🔥
5. Cache stampede, penetration, avalanche. Solutions. ⭐🔥
6. Eviction policies: LRU vs LFU.
7. How do you implement a rate limiter in Redis? ⭐
8. How do you implement a distributed lock? Risks of Redlock. ⭐🔥
9. RDB vs AOF.
10. Sentinel vs Cluster.
11. Pub/Sub vs Streams.
12. What is a hot key / big key problem?
13. Why not use KEYS * ?
14. How do you use Redis for sessions and leaderboards?
15. What if Redis goes down? Fallback design. ⭐
16. What do you cache, and what should you never cache?
17. How do you cache user-specific data?
18. Redis transactions vs Lua scripts.

---

### 20. Redis, Kafka & Messaging | Advanced
1. How does Redis cluster route keys (hash slots, MOVED)?
2. What are Redis hash tags and why do they matter for multi-key ops?
3. How does Redis replicate and what causes data loss on failover?
4. How do you implement a sliding window rate limiter with sorted sets?
5. How do you implement a reliable queue with Redis Streams and consumer groups?
6. BullMQ: what Redis structures does it use? Why maxmemory-policy noeviction? 🔥
7. How do you handle Redis connection storms on reconnect?
8. How do you prevent cache stampede with request coalescing / locking / jitter TTL?
9. What are the dangers of caching with write-behind?
10. Kafka: why is it fast (sequential I/O, page cache, zero-copy)?
11. Kafka: how do partitions affect ordering and parallelism? ⭐
12. Kafka: consumer rebalance and its impact.
13. Kafka: how do you get exactly-once semantics?
14. Kafka: retention vs compaction.
15. Kafka: how do you choose the partition key?
16. RabbitMQ: exchange types (direct, topic, fanout), ack, prefetch.
17. How do you handle message ordering with retries?
18. How do you design a retry topology (retry queues with delays, DLQ)?
19. How do you replay events safely?
20. How do you monitor consumer lag?
21. SQS standard vs FIFO. Visibility timeout?
22. How do you design for at-least-once with idempotent handlers?
23. How do you handle large payloads in messages (claim check pattern)?
24. What is the transactional outbox + CDC (Debezium) approach?
25. What is backpressure in message-driven systems?

---

### 21. Queue & Background Jobs
1. Why use a queue? When not? ⭐
2. How does BullMQ work on top of Redis?
3. Retry, backoff, delayed, repeatable jobs. ⭐
4. How do you make a job idempotent? ⭐🔥
5. What is a dead letter queue? ⭐
6. What is a stalled job?
7. How do you shut down workers gracefully?
8. RabbitMQ vs Kafka vs SQS vs BullMQ. ⭐🔥
9. Kafka: partition, consumer group, offset.
10. At-most / at-least / exactly-once delivery. ⭐
11. How do you guarantee ordering?
12. Outbox pattern: why and how? ⭐🔥
13. Saga pattern. Choreography vs orchestration. ⭐
14. How do you handle poison messages?
15. How do you scale workers? Concurrency vs instances.
16. How do you monitor queue health?
17. How do you schedule reminders and job expiry at scale (Doerly)? ⭐

---

### 22. Real-time (Socket.IO)
1. WebSocket vs SSE vs long polling. ⭐
2. How does the WebSocket handshake work?
3. How does Socket.IO differ from raw WebSocket?
4. How do you scale Socket.IO across servers? ⭐🔥
5. Why sticky sessions? What breaks without them? ⭐
6. How does the Redis adapter work? ⭐
7. Cluster + Socket.IO adapter: how did you set it up? ⭐🔥
8. How do you authenticate sockets?
9. Rooms vs namespaces.
10. How do you guarantee message delivery and ordering?
11. How do you handle reconnection and missed messages?
12. How do you implement presence/online status?
13. How do you handle 100k concurrent connections? File descriptors?
14. How do you design chat message storage?
15. How does WebRTC/Agora work? STUN/TURN/SFU.
16. How do you deduct wallet balance in real time safely (TheraSphere)? ⭐🔥
17. How do you load test WebSockets?

---

### 23. Payments & Webhooks
1. Stripe PaymentIntent flow. ⭐
2. How does Stripe Connect work? Payout and commission flow. ⭐🔥
3. How do you handle Stripe webhooks securely? ⭐
4. How do you make webhook handling idempotent? ⭐🔥
5. What if a webhook arrives twice or out of order? ⭐
6. Why respond 200 quickly and process async?
7. How do you prevent double charge? ⭐🔥
8. How do you handle refunds and disputes?
9. How do you design payment-confirmed hiring (Doerly)? ⭐
10. How do you reconcile Stripe with your DB?
11. How do you handle failed payments and retries?
12. How do you verify App Store / Play subscriptions server-side?
13. What is PCI scope? Why not store cards?
14. How do you test payments and webhooks locally?

---

### 24. System Design | Fundamentals
1. How do you approach a system design question? ⭐
2. Vertical vs horizontal scaling.
3. Explain CAP theorem with a real example. ⭐
4. Strong vs eventual consistency.
5. Latency vs throughput.
6. L4 vs L7 load balancer. Algorithms. ⭐
7. Reverse proxy vs forward proxy vs API gateway.
8. CDN: how does it work? What to cache?
9. Replication vs sharding. ⭐
10. Sharding strategies. Hot shard? ⭐🔥
11. Consistent hashing: why and how? 🔥
12. Read replicas and replication lag.
13. CQRS: when?
14. Monolith vs microservices. When to split? ⭐🔥
15. Sync vs async communication between services.
16. Circuit breaker, retry with jitter, timeout, bulkhead. ⭐🔥
17. Rate limiting algorithms: token bucket, sliding window. ⭐
18. Distributed transactions: 2PC vs saga.
19. Design a URL shortener. ⭐
20. Design a rate limiter. ⭐
21. Design a notification system. ⭐
22. Design a chat app (WhatsApp/Messenger). ⭐🔥
23. Design a payment / wallet system. ⭐🔥
24. Design a live-streaming / video platform. 🔥
25. Design a ride/service marketplace (Doerly-like). ⭐
26. Design file upload and storage service.
27. Design a news feed.
28. Design a job scheduler.
29. Design an e-signature system with audit trail. 🔥
30. Design search autocomplete.
31. Do a back-of-envelope estimation for 10M users. ⭐
32. How do you find a bottleneck in a system?
33. How do you design for high availability and failover?
34. How do you handle a traffic spike 10x?
35. How do you design for multi-region?

---

### 25. System Design | Deep Dives
1. URL shortener: ID কিভাবে generate (base62, counter, hash collision)?
2. Rate limiter: distributed, multi-instance, Redis Lua.
3. Chat: message ordering, delivery status, offline push, group chat fan-out. ⭐
4. Notification system: push/email/SMS, priority, retry, user preference, dedup.
5. Payment/wallet: ledger, idempotency, reconciliation, refund. ⭐🔥
6. Live streaming: ingest, transcode, HLS/DASH, CDN, chat. 🔥
7. Video upload: chunk, presigned, async transcode, thumbnail.
8. Marketplace: search, matching, commission, escrow, dispute.
9. Booking system: double booking prevention, hold/expire.
10. News feed: fan-out on write vs read. 🔥
11. File storage (Drive-like): dedup, chunking, sync, sharing permission.
12. Search autocomplete: trie, cache, ranking.
13. Distributed job scheduler: exactly-once trigger, leader election.
14. API gateway design: auth, rate limit, routing.
15. Feature flag / config service.
16. Audit-trail e-signature: hash chain, tamper proof, KYC. 🔥
17. Analytics/event pipeline: ingest, Kafka, batch vs stream.
18. Multi-tenant SaaS: isolation, billing, per-tenant limit. ⭐
19. Credit/usage metering system for AI features. ⭐
20. Real-time collaborative editing (basics: OT vs CRDT).
21. Location-based service (nearby providers, geohash). ⭐
22. Review/rating system at scale, fraud prevention.
23. Web crawler.
24. Design for GDPR delete/export requests.
25. Migrate monolith to microservices without downtime.

---

### 26. System Design | Round 2 (Scenario Twists)
1. Your chat app grows 100x. What breaks first? Second? ⭐🔥
2. Design so a single user can't DoS others (fairness, quotas).
3. Design a multi-region active-active system. Conflict resolution?
4. Design idempotent bulk import with partial failure and resume.
5. Design a notification system respecting quiet hours and time zones.
6. Design a refund and dispute flow with ledger entries.
7. Design a coupon/referral system preventing abuse.
8. Design an inventory reservation system with expiry.
9. Design a subscription system with proration and webhooks (RevenueCat/Stripe).
10. Design an admin impersonation feature safely with audit.
11. Design a data export (GDPR) for a huge account.
12. Design a global unique ID generator (Snowflake).
13. Design a distributed counter (likes) with high write rate.
14. Design an event-driven order pipeline with failure compensation.
15. Design a media processing pipeline (resize, moderate, transcode).
16. Design a webhook delivery system for your own customers (retry, signing, DLQ).
17. Design an OTP/SMS verification system with cost control (Twilio).
18. Design a real-time presence and typing indicator at scale.
19. Design an API with per-plan rate limits and usage billing.
20. Design a search service (Elasticsearch sync, reindex, relevancy).
21. Design a reconciliation job between your DB and Stripe.
22. Design a leader election for a scheduler (Redis/etcd).
23. Design a secure file sharing link system (expiry, one-time).
24. Design a moderation pipeline with AI + human review.
25. Design an AI chat product: streaming, credits, history, RAG, cost control. ⭐🔥

---

### 27. Networking | Core
1. What happens when you type a URL in the browser? ⭐🔥
2. TCP vs UDP. ⭐
3. TCP 3-way handshake and 4-way close. ⭐
4. TCP flow control vs congestion control.
5. What is TIME_WAIT?
6. HTTP/1.1 vs HTTP/2 vs HTTP/3. ⭐
7. How does HTTPS/TLS handshake work? ⭐
8. What is a certificate chain? What is mTLS?
9. How does DNS resolution work? ⭐
10. A, AAAA, CNAME, MX, TXT, NS records. TTL and propagation. ⭐
11. What is a CDN? Anycast?
12. Proxy vs reverse proxy vs VPN.
13. NAT, firewall, subnet basics.
14. How do you debug a network issue? (curl -v, dig, traceroute)
15. Keep-alive and connection reuse.
16. What is CORS from a network perspective?
17. How does WebSocket upgrade work over HTTP?
18. How do you point a domain to a VPS and set up SSL? ⭐

---

### 28. Networking, OS & Linux | Advanced
1. How does TCP handle packet loss and retransmission?
2. What is Nagle's algorithm? TCP_NODELAY?
3. What causes ECONNRESET, ETIMEDOUT, ECONNREFUSED, EADDRINUSE, EMFILE? ⭐
4. How do you raise the file descriptor limit (ulimit, systemd LimitNOFILE)? ⭐
5. What is the C10K problem? How does epoll solve it?
6. How does a load balancer detect unhealthy nodes?
7. What is connection draining?
8. What is HTTP/2 head-of-line blocking vs HTTP/3?
9. How does QUIC differ from TCP+TLS?
10. What is SNI and why does one IP host many HTTPS sites?
11. What is OCSP stapling / certificate pinning?
12. How does DNS caching, negative caching, and TTL affect deploy migrations? ⭐
13. What is anycast and GeoDNS?
14. How does a CDN decide cache hit/miss (Vary, cache key)?
15. How do you debug packet-level issues (tcpdump, Wireshark basics)?
16. What is the difference between a process crash, OOM kill, and graceful exit (exit codes, dmesg)?
17. What is cgroup and how do Docker memory limits relate to Node heap?
18. Why Node in Docker needs --max-old-space-size tuning?
19. What is load average? How do you interpret it?
20. What are iowait, steal, swap in top?
21. How do you trace a slow syscall (strace)?
22. What is log rotation (logrotate)? Why Docker logs fill disks?
23. How do you set up a firewall (ufw/iptables basics) for a VPS?
24. How do you harden SSH (disable password, fail2ban, non-default port)?
25. How do you set up swap safely on a small VPS?

---

### 29. OS & Linux | Core
1. Process vs thread. ⭐
2. What is a context switch?
3. Virtual memory and paging. What is swap?
4. Stack vs heap.
5. Deadlock: 4 conditions. Mutex vs semaphore.
6. What is a file descriptor? Too many open files error. ⭐
7. Blocking vs non-blocking I/O. What is epoll? ⭐
8. SIGTERM vs SIGKILL vs SIGINT. ⭐
9. Zombie and orphan processes.
10. What does OOM killer do?
11. How do you check which process uses a port? ⭐
12. How do you find high CPU or memory usage? ⭐
13. How do you read logs on a server? (tail, grep, journalctl)
14. chmod and permission numbers.
15. What is systemd? Create a service.
16. What is cron? Write one.
17. How do you troubleshoot a disk full issue?
18. SSH keys vs password. Server hardening basics.

---

### 30. Git & GitHub
1. merge vs rebase. When to use which? ⭐
2. reset soft vs mixed vs hard. revert vs reset. ⭐
3. What is cherry-pick? Use case.
4. How do you recover a lost commit (reflog)? ⭐🔥
5. stash use cases.
6. How do you resolve merge conflicts?
7. Interactive rebase and squash.
8. git bisect: what for?
9. Git Flow vs trunk-based vs GitHub Flow. ⭐
10. How do you handle a hotfix in production?
11. You pushed a secret. What do you do? ⭐
12. How do you review a PR well?
13. Branch protection and CODEOWNERS.
14. GitHub Actions: workflow, secrets, cache, matrix.
15. Semantic versioning and conventional commits.

---

### 31. Docker, Nginx, CI/CD & Cloud | Core
1. Image vs container. ⭐
2. How do Docker layers and caching work? ⭐
3. Multi-stage build: why? ⭐
4. CMD vs ENTRYPOINT.
5. How do you reduce image size? Non-root user?
6. Volumes vs bind mounts. Docker networking.
7. docker-compose use cases. Healthcheck.
8. Why does Node as PID 1 cause issues?
9. Nginx as a reverse proxy. Sample config. ⭐
10. How do you set up SSL with Certbot?
11. How do you proxy WebSockets in Nginx? ⭐
12. Nginx load balancing algorithms.
13. PM2 cluster mode. Zero-downtime reload. ⭐
14. Design a CI/CD pipeline for your project. ⭐
15. Blue-green vs rolling vs canary. ⭐
16. How do you roll back a bad deploy? ⭐
17. EC2 vs Lambda vs ECS. When which?
18. S3 presigned URLs. Lifecycle rules. IAM least privilege. ⭐
19. Security groups and VPC basics.
20. What is Kubernetes? Pod, deployment, service, ingress.
21. What is Infrastructure as Code?
22. VPS vs managed cloud trade-offs. Cost optimization.
23. How do you manage env vars across dev/staging/prod?

---

### 32. Docker, Kubernetes & AWS | Advanced
1. How do you write a production Dockerfile for Node (multi-stage, non-root, healthcheck, signals)? ⭐
2. How do you handle secrets in Docker (not in image, build args pitfalls)?
3. docker-compose vs Swarm vs Kubernetes: when each?
4. How do you do rolling updates in Docker Compose?
5. How do you debug a container that exits immediately?
6. What is a Docker layer cache bust and how do you order Dockerfile steps?
7. Kubernetes: pod, replicaset, deployment, service types, ingress. ⭐
8. K8s: liveness vs readiness vs startup probes.
9. K8s: HPA, resource requests vs limits, OOMKilled.
10. K8s: ConfigMap vs Secret. Rolling update vs recreate.
11. How do you handle graceful shutdown in K8s (preStop, terminationGracePeriod)? 🔥
12. How do sticky sessions work in K8s ingress?
13. AWS: EC2 vs ECS vs Fargate vs Lambda: cost/ops trade-offs.
14. AWS: ALB vs NLB vs API Gateway.
15. AWS: RDS Multi-AZ vs read replica.
16. AWS: S3 consistency, storage classes, lifecycle, versioning, CORS.
17. AWS: CloudFront + S3 for static/media delivery. Signed URLs/cookies.
18. AWS: SQS vs SNS vs EventBridge vs Kinesis.
19. AWS: IAM roles vs users vs policies. Instance profile.
20. AWS: VPC, public vs private subnet, NAT gateway, security groups vs NACL.
21. AWS: CloudWatch logs/metrics/alarms. X-Ray tracing.
22. How do you control cloud cost (right-sizing, reserved, spot, budgets)?
23. How do you design backup + disaster recovery (RPO/RTO)? ⭐
24. Terraform: state, plan/apply, modules, drift.
25. GitHub Actions: build, test, push image, deploy via SSH. Where do secrets live? ⭐

---

### 33. DevOps | Production Scenarios
1. Deployment নতুন version এ 500 error। first 10 minutes কি করবেন? ⭐🔥
2. VPS এ disk 100%। কিভাবে খুঁজবেন? Docker logs এর কারণ?
3. SSL certificate expire হয়েছে। prevent কিভাবে?
4. Domain পরিবর্তন করে নতুন server দিলাম, তবু পুরনো সাইট দেখাচ্ছে। কেন? (DNS TTL)
5. Nginx 502/504 পাচ্ছে। কারণ কি? ⭐
6. Container বারবার restart হচ্ছে (CrashLoop/OOM)। debug?
7. Zero-downtime deploy কিভাবে করবেন (PM2/Docker)? ⭐
8. Secret leak হয়েছে (.env push)। incident response?
9. DB credentials rotate করতে হবে downtime ছাড়া।
10. Staging ও production এর পার্থক্য থাকলে কি সমস্যা?
11. CI এ test flaky। কি করবেন?
12. এক VPS থেকে ২-৩ server এ scale করতে কি কি দরকার (sticky, shared session, shared storage)? ⭐
13. S3 bucket public হয়ে গেছে। কি করবেন?
14. Log এ sensitive data ঢুকেছে। কি করবেন?
15. Monitoring কিছু নেই। ১ দিনে কি set up করবেন?

---

### 34. Testing & Observability | Core
1. Test pyramid. Unit vs integration vs e2e. ⭐
2. Mock vs stub vs spy. ⭐
3. How do you test an Express API (Supertest)?
4. How do you test code with a database?
5. How do you test webhooks and queues?
6. What is a good coverage target? Limits of coverage.
7. Logs vs metrics vs traces. ⭐
8. How do you add request ID / correlation ID? 🔥
9. Structured logging: Pino vs Winston.
10. What do you monitor in a Node app? ⭐
11. Liveness vs readiness probes.
12. What are SLI, SLO, SLA?
13. How do you set up alerts without noise?

---

### 35. Testing & Code Quality | Advanced
1. How do you test time-dependent code (fake timers)?
2. How do you test race conditions?
3. Contract testing vs e2e for microservices (Pact).
4. How do you seed and isolate test databases (transactions, testcontainers)? ⭐
5. How do you test Stripe webhooks (fixtures, signature)? ⭐
6. How do you test Socket.IO events?
7. How do you test BullMQ jobs and retries?
8. How do you mock third-party APIs (nock, MSW)?
9. Mutation testing: what and why?
10. How do you handle flaky tests?
11. How do you load test and set performance budgets in CI?
12. What do you look for in a code review? Checklist. ⭐
13. How do you enforce quality (ESLint, Prettier, Husky, SonarQube)?
14. How do you manage technical debt with deadlines? ⭐
15. How do you write a good README / ADR (architecture decision record)? 🔥
16. How do you roll out risky changes (feature flag, canary, dark launch)?
17. How do you handle database migrations in CI/CD?
18. How do you do error budgeting?
19. What is chaos engineering? Basic example.
20. How do you set up error alerting without alert fatigue?
21. What do you log, and what must you never log?
22. How do you design dashboards for a Node API (RED/USE method)? 🔥
23. How do you debug an issue that only happens in production?
24. How do you write a postmortem (blameless)? ⭐
25. How do you onboard to a legacy codebase with no tests?

---

### 36. Performance & Production Debugging
1. API is slow in production. How do you debug? ⭐🔥
2. CPU at 100%. What do you do? ⭐
3. Memory keeps growing. What do you do? ⭐
4. DB connections exhausted. Causes and fixes. ⭐
5. How do you find the slowest queries?
6. How do you load test (k6/Artillery)? What do you measure?
7. Describe a production incident you handled. ⭐🔥
8. How do you do a postmortem?
9. How do you reduce API latency by 50%?
10. How do you handle a third-party API outage?
11. Tell me about the biggest mistake you made in production. ⭐
12. How do you deploy safely on Friday evening?

---

### 37. AI Engineering | Core
1. What are tokens? Context window? ⭐
2. Temperature vs top-p.
3. Why do LLMs hallucinate? How do you reduce it? ⭐
4. Prompting vs RAG vs fine-tuning. When which? ⭐🔥
5. How do you get reliable structured JSON output? ⭐
6. What is function/tool calling? Flow. ⭐
7. How do you stream LLM responses to a client?
8. How do you control LLM API cost? Prompt caching? ⭐
9. Retry, rate limit, timeout, fallback model handling.
10. Explain RAG end to end. ⭐🔥
11. What are embeddings? Cosine similarity.
12. Chunking strategies. How do you choose size?
13. pgvector vs Pinecone vs Qdrant.
14. Hybrid search and reranking.
15. How do you evaluate a RAG/LLM system? ⭐
16. What is prompt injection? How do you defend? ⭐🔥
17. How do you handle PII sent to LLM APIs?
18. What is an AI agent? Agent vs workflow. ⭐
19. What is MCP?
20. Design an AI credit/usage billing system (jctranz project). ⭐
21. How do you run long AI jobs in the backend (queue + webhook)? ⭐
22. Design a voice AI pipeline (STT → LLM → TTS). Latency?
23. How do you version and test prompts?
24. Your resume says "AI-assisted development with manual technical review". What exactly do you review? ⭐🔥
25. How do you not blindly trust AI-generated code? Give an example bug you caught.

---

### 38. AI Engineering | Scenarios
1. LLM chatbot কোম্পানির policy document থেকে উত্তর দেবে। পুরো architecture? ⭐
2. Chatbot মিথ্যা উত্তর দিচ্ছে। কিভাবে কমাবেন? ⭐
3. LLM bill ৩ গুণ হয়েছে। কি করবেন?
4. User সিস্টেম prompt leak করতে চাইছে। কিভাবে ঠেকাবেন? ⭐
5. সবাই একই প্রশ্ন করছে, response cache কিভাবে (semantic cache)?
6. LLM API ৩০ সেকেন্ড লাগাচ্ছে। UX ও backend design?
7. বড় PDF (500 পৃষ্ঠা) থেকে Q&A। chunking/retrieval কিভাবে?
8. Credit-based AI usage: কিভাবে token মেপে credit কাটবেন? Failed call এ refund?
9. Agent infinite loop এ পড়েছে। guard কি?
10. AI কোড PR এ security bug ঢুকিয়েছে। আপনার review process কি? ⭐🔥
11. Model deprecate হলে কিভাবে migrate করবেন নিরাপদে?
12. Client এর sensitive data OpenAI তে যাবে কি না — client কে কি বলবেন?
13. AI feature এর quality মাপবেন কিভাবে (eval set, metrics)?
14. Function calling এ LLM ভুল argument দিলে?

---

### 39. AI Engineering | Advanced
1. How does attention / transformer work at a high level?
2. What is KV cache and why does prompt caching save cost?
3. How do you choose chunk size and overlap? What breaks with bad chunking?
4. What is HNSW? Why approximate nearest neighbor?
5. How do you update embeddings when documents change?
6. How do you do multi-tenant RAG with data isolation? ⭐🔥
7. How do you reduce latency in RAG (parallel retrieval, caching, smaller model)?
8. Query rewriting, HyDE, multi-query: when do they help?
9. How do you handle long context vs RAG trade-off?
10. What are structured outputs / JSON mode / grammar constraints? Failure modes?
11. How do you validate tool-call arguments before executing (Zod)? ⭐
12. How do you make tool use safe (allowlist, confirmation, sandbox)? 🔥
13. How do you handle prompt injection from retrieved documents? 🔥
14. How do you design agent memory (summary, vector, DB)?
15. How do you evaluate agents (trajectory, task success)?
16. How do you set up LLM observability (traces, cost per user)?
17. How do you do A/B tests on prompts and models?
18. How do you fall back between providers (OpenAI, Anthropic, Gemini)? Abstraction layer?
19. How do you rate limit and queue LLM calls (tokens-per-minute)?
20. How do you stream via SSE through Nginx (buffering off)?
21. How do you design per-user token budgets and credits atomically? ⭐
22. What is fine-tuning vs LoRA vs distillation? When worth it?
23. How do you handle PII/redaction before and after LLM calls?
24. What is speech latency budget (STT + LLM + TTS) and how to cut it?
25. How do you test non-deterministic outputs in CI?

---

### 40. n8n & Automation
1. When n8n and when your own backend? ⭐🔥
2. Walk through your AI newsletter workflow end to end. ⭐
3. How does webhook-resume (Wait node) work?
4. How do you handle errors and retries in n8n? ⭐
5. How do you avoid duplicate execution?
6. How do you self-host and scale n8n (queue mode)?
7. How do you manage credentials and secrets?
8. How do you version control and test workflows?
9. n8n Code node: when and risks.
10. How do you handle rate limits of external APIs in a workflow?

---

### 41. Frontend (Basics)
1. How does React re-render? How do you prevent unnecessary renders?
2. useEffect pitfalls. useMemo vs useCallback.
3. Context vs Redux Toolkit.
4. SSR vs SSG vs ISR vs CSR. ⭐
5. Next.js App Router vs Pages Router. Server components.
6. Cookies vs localStorage vs sessionStorage.
7. How do you integrate JWT refresh flow on the frontend?
8. How do you optimize page load?

---

### 42. DSA | Algorithms
1. Two Sum (hash map). ⭐
2. Longest substring without repeating characters (sliding window). ⭐
3. Valid parentheses (stack).
4. Merge intervals.
5. Binary search and variations.
6. Reverse linked list. Detect cycle.
7. BFS/DFS on tree and graph.
8. LRU cache implementation. ⭐🔥
9. Top K frequent elements (heap).
10. Group anagrams.
11. Rate limiter implementation (sliding window).
12. Big-O of common operations (array, map, sort).
13. Basic DP: climbing stairs, coin change.
14. Design a trie for autocomplete.

---

### 43. DSA | Coding Round (JS/Node Hands-on)
1. Implement `Promise.allSettled`, `Promise.race`, `Promise.any`.
2. Implement a promise pool with concurrency N.
3. Implement retry with exponential backoff + jitter.
4. Implement LRU cache (Map-based, O(1)). ⭐
5. Implement a rate limiter (token bucket) class.
6. Implement debounce with leading/trailing options.
7. Implement deep clone handling Date, Map, Set, circular refs.
8. Implement EventEmitter with `once`, `off`.
9. Implement a simple dependency injection container.
10. Implement a pub/sub with wildcard topics.
11. Write an Express middleware: request logger with request ID.
12. Write an Express middleware: async error wrapper.
13. Write a JWT auth + role guard middleware.
14. Write rate-limit middleware using Redis.
15. Write an idempotency-key middleware (store response).
16. Write a Stripe webhook handler with raw body + signature + dedupe.
17. Write a streaming CSV parser that inserts in batches.
18. Write a graceful shutdown handler (HTTP, DB, Redis, queue).
19. Write a BullMQ worker with retry, backoff, and DLQ handling.
20. Write a Socket.IO server with Redis adapter and auth middleware.
21. Write a Prisma transaction that moves wallet balance safely.
22. Write a cursor pagination endpoint.
23. Write a function to flatten nested comments into a tree.
24. Write an in-memory cache with TTL and max size.
25. Write a simple job scheduler that avoids double-run across instances.

---

### 44. Resume Deep-Dive
**TheraSphere**
1. কেন cluster + Socket.IO adapter লাগল? আগে কি সমস্যা ছিল?
2. Sticky session কিভাবে সমাধান করলেন? Nginx না Node level?
3. Round-robin vs sticky: কোথায় কিসের জন্য?
4. Real-time wallet deduction কিভাবে safe করলেন? Race condition?
5. Agora token flow কি? কোথায় generate হয়?
6. BullMQ এ কোন কোন job? কেন queue, সরাসরি না?
7. Referral reward + payout + invoicing data model কিভাবে করলেন?
8. ১০০০ concurrent live viewer হলে কি break করবে?
9. কি দিয়ে সবচেয়ে কঠিন bug ধরলেন?

**Doerly**
- Payment-confirmed hiring flow এককথায় আঁকুন।
- Stripe Connect: কোন account type? কেন? Commission কিভাবে কাটলেন?
- Webhook duplicate / out-of-order কিভাবে সামলালেন? ⭐
- Payout fail হলে কি হয়?
- Job expiry/reminder কিভাবে করলেন (BullMQ delayed)? Redis restart এ job হারালে?
- MongoDB + Prisma: কেন এই সিদ্ধান্ত? transaction সমস্যা?
- Solo হয়ে backend + admin dashboard — কিভাবে time manage?
- এখন আবার লিখলে কি পরিবর্তন করতেন?

**Newsletter / n8n**
- Pipeline তিনটি OpenAI stage কেন? একটা prompt এ কেন নয়?
- Structured output কিভাবে enforce? Invalid JSON আসলে?
- Swiss German translation এর quality কিভাবে যাচাই?
- Approval webhook-resume কিভাবে? Timeout হলে?
- HTML escape কেন? কি attack ঠেকালেন (injection)?

**General (resume)**
- "Sole backend owner of 5 production SaaS" — সবগুলো কিভাবে সামলাই? ⭐
- $19,968 revenue / 15+ projects — আপনার নিজস্ব contribution কি? (সৎভাবে বলুন)
- "Production deployment: Docker, Nginx, DNS" — একটা deployment এ কি ভুল হয়েছিল?
- Express/Mongo/Prisma — নিজের কোন skill সবচেয়ে দুর্বল মনে করেন?
- Resume তে "Node.js Cluster" — দিয়ে কি measurable উন্নতি হয়েছিল (numbers)?
- Resume তে OAuth — কোথায়, কোন flow ব্যবহার করেছেন?

---

### 45. Behavioral & HR | Core
1. Tell me about yourself (60 seconds). ⭐
2. Walk me through your most complex project. ⭐🔥
3. Biggest technical challenge and how you solved it. ⭐
4. A time you failed or made a mistake.
5. A conflict with a teammate or client. ⭐
6. How do you handle changing client requirements / scope creep? ⭐
7. How do you handle tight deadlines?
8. How do you prioritize across multiple concurrent projects? ⭐
9. Being the sole backend owner of 5 platforms: how do you manage risk? ⭐🔥
10. How do you explain technical trade-offs to a non-technical client?
11. How do you review others' code?
12. How do you keep learning?
13. Why are you leaving your current company?
14. Why do you want to join us? Where do you see yourself in 3 years?
15. Salary expectation and notice period.
16. Do you have questions for us? (prepare 3)
17. Your resume lists "Forward-Deployed Engineering" as an interest. What does it mean to you?
18. How do you work with remote and cross-functional teams (Flutter, AI, UI/UX)?

---

### 46. Behavioral | English Communication
1. Introduce yourself in 60 seconds, in English. ⭐
2. Explain event loop to a non-technical person in 30 seconds.
3. Explain Redis to a client in plain English.
4. Describe a time you disagreed with a client and what you did. ⭐
5. Describe a time you pushed back on a deadline.
6. Tell me about a project you're most proud of and why.
7. Describe a time you had to learn a new technology quickly.
8. How do you give bad news to a client (delay, bug)? ⭐
9. How do you handle unclear requirements? ⭐
10. How do you estimate a task? What if you're wrong?
11. Describe a time you improved performance with numbers.
12. Describe a time you made a wrong architectural decision.
13. How do you decide build vs buy? (Stripe, Auth0, n8n)
14. How do you prioritize when everything is urgent?
15. How do you communicate across time zones (Greece, Germany, USA)?
16. How do you document your work for others?
17. How would you mentor a junior developer?
18. How do you handle burnout or overload as sole owner?
19. What are your strengths and weaknesses (genuine, with example)?
20. Where is your English weakest, and how are you improving it?
21. What is your ideal team and manager style?
22. What would you do in your first 30/60/90 days?
23. Why should we hire you over a more senior candidate? ⭐
24. How do you evaluate a job offer beyond salary?
25. Ask the interviewer: team size, on-call, tech debt, growth, deployment frequency, AI usage.

---

### 47. Rapid Fire (All Topics)
1. PUT vs PATCH?
2. 401 vs 403?
3. JWT এর তিন অংশ?
4. CORS কেন লাগে?
5. localStorage vs cookie?
6. Index এর downside?
7. DELETE vs TRUNCATE?
8. UNION vs UNION ALL?
9. Primary vs unique key?
10. char vs varchar vs text?
11. Redis vs Memcached?
12. TTL কি?
13. Push vs pull queue?
14. Kafka vs RabbitMQ এক লাইনে?
15. Monolith এর সুবিধা?
16. Idempotent কি?
17. Stateless service কেন ভালো?
18. Horizontal scaling এর সমস্যা?
19. Cache hit ratio কি?
20. CDN কি cache করে?
21. SIGTERM কি?
22. Docker vs VM?
23. Port 80/443/22/5432/6379/27017?
24. git pull vs git fetch?
25. npm ci vs npm install?
26. dependencies vs devDependencies?
27. require vs import?
28. Callback vs Promise?
29. let vs var?
30. Event loop এক লাইনে?
31. Webhook vs polling?
32. SSE vs WebSocket?
33. REST vs RPC?
34. SQL injection এক লাইনে prevent?
35. Hash vs encrypt?
36. Access vs refresh token?
37. Rate limit হলে কোন code?
38. Blue-green কি?
39. SLA vs SLO?
40. Embedding কি?
