/**
 * ============================================================================
 * 🚀 BACKEND RECAP & INTERVIEW PRACTICE SYSTEM — MASTER HUB (app.ts)
 * ============================================================================
 * এই ফাইলটি আপনার সম্পূর্ণ ব্যাকএন্ড ইন্টারভিউ প্র্যাকটিসের সেন্ট্রাল কন্ট্রোল সেন্টার।
 * এখান থেকে আপনি TypeScript, Node.js, Docker, Database, System Design ইত্যাদি
 * প্রতিটি টপিক এক এক করে অথবা একসাথে রান ও টেস্ট করতে পারবেন।
 * 
 * 🛠️ রান করার নিয়ম (CLI Commands):
 * 1. সবগুলো TypeScript প্রশ্ন একসাথে রান করতে:
 *    npm run dev -- ts all
 * 
 * 2. নির্দিষ্ট যেকোনো একটি প্রশ্ন রান করতে (যেমন Q03 বা Q11):
 *    npm run dev -- ts 3
 *    npm run dev -- ts 11
 * 
 * 3. সাধারণ মেনু দেখতে:
 *    npm run dev
 * ============================================================================
 */

import { spawnSync } from "child_process";
import path from "path";
import fs from "fs";

// মডিউল রেজিস্ট্রি: ভবিষ্যতে নতুন টপিক (Docker, Node.js, Redis) এখানে সহজে যোগ করা যাবে
interface PracticeModule {
  id: string;
  title: string;
  description: string;
  status: "ACTIVE" | "UPCOMING";
  folderPath?: string;
}

const MODULE_REGISTRY: PracticeModule[] = [
  {
    id: "ts",
    title: "🎯 01. TypeScript Core & Advanced (Q01 - Q19)",
    description: "Generics, Utility Types, Discriminated Unions, Branded Types, Zod etc.",
    status: "ACTIVE",
    folderPath: "Questions/01-typescript",
  },
  {
    id: "node",
    title: "🟢 02. Node.js Core & Event Loop (Upcoming)",
    description: "Event Loop, Libuv, Streams, Worker Threads, Buffer, Cluster",
    status: "UPCOMING",
  },
  {
    id: "docker",
    title: "🐳 03. Docker & Containers (Upcoming)",
    description: "Multi-stage builds, Caching layers, Compose, PID 1, Non-root user",
    status: "UPCOMING",
  },
  {
    id: "db",
    title: "🐘 04. SQL, PostgreSQL & Database Design (Upcoming)",
    description: "Indexing, ACID, Query Optimization, Locks, Normalization",
    status: "UPCOMING",
  },
  {
    id: "redis",
    title: "⚡ 05. Redis, Queue & Caching (Upcoming)",
    description: "BullMQ, Pub/Sub, Distributed Lock, Cache Stampede, Rate Limiting",
    status: "UPCOMING",
  },
  {
    id: "system-design",
    title: "🏛️ 06. System Design & Microservices (Upcoming)",
    description: "Scalability, CAP Theorem, Sharding, Message Brokers, Outbox Pattern",
    status: "UPCOMING",
  },
];

// TypeScript ফাইলগুলোর ম্যাপিং (Q01 থেকে Q19)
const TS_FILES_MAP: Record<string, string> = {
  "1": "q01-type-vs-interface.ts",
  "01": "q01-type-vs-interface.ts",
  "2": "q02-any-vs-unknown-vs-never.ts",
  "02": "q02-any-vs-unknown-vs-never.ts",
  "3": "q03-generics-constrained-functions.ts",
  "03": "q03-generics-constrained-functions.ts",
  "4": "q04-unions-intersections-discriminated.ts",
  "04": "q04-unions-intersections-discriminated.ts",
  "5": "q05-type-narrowing-custom-guards.ts",
  "05": "q05-type-narrowing-custom-guards.ts",
  "6": "q06-utility-types.ts",
  "06": "q06-utility-types.ts",
  "7": "q07-keyof-typeof-indexed-access.ts",
  "07": "q07-keyof-typeof-indexed-access.ts",
  "8": "q08-mapped-conditional-infer.ts",
  "08": "q08-mapped-conditional-infer.ts",
  "9": "q09-runtime-type-erasure.ts",
  "09": "q09-runtime-type-erasure.ts",
  "10": "q10-structural-vs-nominal-typing.ts",
  "11": "q11-runtime-data-validation-zod.ts",
  "12": "q12-extending-express-request.ts",
  "13": "q13-strict-mode-compiler.ts",
  "14": "q14-enum-vs-const-object-vs-union.ts",
  "15": "q15-satisfies-vs-type-assertion.ts",
  "16": "q16-branded-types.ts",
  "17": "q17-overloads-vs-conditional-return.ts",
  "18": "q18-readonly-as-const-freeze.ts",
  "19": "q19-declaration-merging-augmentation.ts",
};

/**
 * নির্দিষ্ট যেকোনো ফাইল রান করার হেল্পার
 */
function executeTsFile(relativePath: string) {
  const fullPath = path.resolve(process.cwd(), relativePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ ফাইলটি পাওয়া যায়নি: ${relativePath}`);
    return;
  }

  console.log(`\n▶️ EXECUTING: ${relativePath}`);
  console.log("------------------------------------------------------------------");
  spawnSync(`npx tsx "${relativePath}"`, {
    stdio: "inherit",
    shell: true,
  });
  console.log("------------------------------------------------------------------\n");
}

/**
 * মেইন CLI রাউটার
 */
function main() {
  const args = process.argv.slice(2);
  const targetModule = args[0]?.toLowerCase();
  const subTarget = args[1]?.toLowerCase();

  console.log("\n============================================================================");
  console.log("🌟 BACKEND RECAP & INTERVIEW MASTER RUNNER (src/app.ts)");
  console.log("============================================================================");

  // ১. কোনো আর্গুমেন্ট না থাকলে মেনু প্রদর্শন:
  if (!targetModule) {
    console.log("\n📌 উপলব্ধ মডিউলসমূহ (Modules List):\n");
    MODULE_REGISTRY.forEach((mod) => {
      const badge = mod.status === "ACTIVE" ? "🟢 [ACTIVE - Ready to Run]" : "⏳ [UPCOMING - Target]";
      console.log(`  ${mod.title} ${badge}`);
      console.log(`     └─ ${mod.description}`);
    });

    console.log("\n💡 ব্যবহারের নিয়ম (How to Run Topics):");
    console.log("  • TypeScript নির্দিষ্ট প্রশ্ন রান করতে:  npm run dev -- ts <question_number>");
    console.log("    উদাহরণ: npm run dev -- ts 1");
    console.log("    উদাহরণ: npm run dev -- ts 3");
    console.log("    উদাহরণ: npm run dev -- ts 11");
    console.log("  • TypeScript সব প্রশ্ন একসাথে রান করতে: npm run dev -- ts all");
    console.log("  • অল-ইন-ওয়ান ডেমো টেস্ট করতে:          npm run practice\n");
    return;
  }

  // ২. TypeScript প্র্যাকটিস হ্যান্ডলার:
  if (targetModule === "ts" || targetModule === "typescript") {
    const tsFolder = fs.existsSync("Questions/01-typescript")
      ? "Questions/01-typescript"
      : "interview-questions/01-typescript";

    // সব প্রশ্ন একসাথে রান করা:
    if (subTarget === "all") {
      console.log("\n🚀 RUNNING ALL 19 TYPESCRIPT INTERVIEW QUESTIONS IN SEQUENCE...\n");
      for (let i = 1; i <= 19; i++) {
        const key = i.toString();
        const fileName = TS_FILES_MAP[key];
        if (fileName) {
          executeTsFile(`${tsFolder}/${fileName}`);
        }
      }
      console.log("🎉 ALL 19 TYPESCRIPT TOPICS COMPLETED!");
      return;
    }

    // নির্দিষ্ট প্রশ্ন রান করা (যেমন ts 3 বা ts 11):
    if (subTarget && TS_FILES_MAP[subTarget]) {
      const fileName = TS_FILES_MAP[subTarget];
      executeTsFile(`${tsFolder}/${fileName}`);
      return;
    }

    // ভুল আর্গুমেন্ট দিলে:
    console.log(`\n❌ নির্দিষ্ট প্রশ্নের নম্বর খুঁজে পাওয়া যায়নি: '${subTarget}'`);
    console.log("💡 সঠিক উদাহরণ: npm run dev -- ts 1 অথবা npm run dev -- ts 16");
    return;
  }

  // ৩. আপকামিং মডিউল (Node, Docker, DB etc.)
  const matchedModule = MODULE_REGISTRY.find((m) => m.id === targetModule);
  if (matchedModule) {
    console.log(`\n⏳ ${matchedModule.title}`);
    console.log(`   বিবরণ: ${matchedModule.description}`);
    console.log("   👉 এই মডিউলটি পরবর্তী টার্গেট হিসেবে সাজানো হবে। TypeScript শেষ হলে আমরা এটি শুরু করব!");
    return;
  }

  console.log(`\n❌ অজানা কমান্ড: '${targetModule}'`);
  console.log("💡 মেনু দেখতে লিখুন: npm run dev");
}

main();
