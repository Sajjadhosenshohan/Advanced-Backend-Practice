/**
 * ============================================================================
 * 📌 Q19: What is Declaration Merging? Module Augmentation? 🔥 (Senior Level)
 * ============================================================================
 *
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 Declaration Merging    ➔ একই নামের দুটি ডিক্লেয়ারেশনকে (মূলত `interface` বা `namespace`)
 *                               টাইপস্ক্রিপ্ট কম্পাইলার স্বয়ংক্রিয়ভাবে একটি একক ইন্টারফেসে মার্জ করে ফেলে।
 *
 * 🔹 Module Augmentation   ➔ কোনো বিদ্যমান থার্ড-পার্টি npm প্যাকেজের (যেমন `express` বা `socket.io`)
 *                               মূল সোর্স কোড না ছুঁয়ে বাইরে থেকে তার টাইপ বাড়িয়ে নতুন ফিল্ড যোগ করার আর্কিটেকচার।
 *
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • `type` অ্যালিয়াসে কখনোই Declaration Merging করা যায় না!
 *   • একই ফাইলে বা প্রজেক্টে দুবার `type User = ...` লিখলে সাথে সাথে `Duplicate identifier` কম্পাইল এরর দেবে।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 কখন কোনটা কীভাবে কাজ করে? (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬────────────────────────────────┬─────────────────────────────┐
 * │ বৈশিষ্ট্য                 │      Declaration Merging       │     Module Augmentation 🏆  │
 * ├───────────────────────────┼────────────────────────────────┼─────────────────────────────┤
 * │ প্রযোজ্য উপাদান          │ নিজস্ব ইন্টারফেস ও নেমস্পেস    │ এক্সটার্নাল npm মডিউল ও লাইব্রেরি│
 * │ সিনট্যাক্স                │ interface Name { ... }         │ declare module "express" { }│
 * │ ব্যবহার                   │ প্লাগইন সিস্টেম ও বড় স্কিমা    │ req.user, Socket Auth ডেটা  │
 * └───────────────────────────┴────────────────────────────────┴─────────────────────────────┘
 *
 * 📌 গোল্ডেন রুল:
 *   • লাইব্রেরির টাইপ এক্সটেন্ড করতে `declare module "name"` বা `declare global` ব্যবহার করুন।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "Declaration merging occurs when the TypeScript compiler merges two or more declarations
 *    with the same name into a single definition:
 *    1. It works automatically with interfaces and namespaces, but not type aliases.
 *    2. Module Augmentation leverages declaration merging to extend third-party library types,
 *       like adding 'user?: AuthPayload' to Express.Request or augmenting NodeJS.ProcessEnv.
 *       It allows us to maintain strict type safety across our backend without forking external packages."
 *
 * 🇧🇩 বাংলায়:
 *   "ডিক্লেয়ারেশন মার্জিং হলো যখন কম্পাইলার একই নামের একাধিক ডিক্লেয়ারেশনকে একটি একক ডেফিনিশনে যুক্ত করে:
 *    ১. এটি শুধুমাত্র interface এবং namespace এ স্বয়ংক্রিয়ভাবে কাজ করে, type অ্যালিয়াসে কাজ করে না।
 *    ২. Module Augmentation এই ডিক্লেয়ারেশন মার্জিং ব্যবহার করে থার্ড-পার্টি লাইব্রেরির টাইপ বাড়ায়;
 *       যেমন Express.Request এ 'user?: AuthPayload' যোগ করা বা NodeJS.ProcessEnv এক্সটেন্ড করা।
 *       ফলে লাইব্রেরির কোড না ছুঁয়েও পুরো ব্যাকএন্ড জুড়ে শতভাগ টাইপসেফটি বজায় রাখা যায়।"
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: Declaration Merging এ মেথড ওভারলোডিংয়ের প্রায়োরিটি কীভাবে নির্ধারিত হয়?
 *    👉 উত্তর: পরবর্তী (Later) ডিক্লেয়ারেশনের মেথড সিগনেচার আগে প্রাধান্য পায় (Higher precedence)।
 *             তবে স্ট্রিং লিটারাল প্যারামিটার থাকলে তা সবার আগে প্রায়োরিটি পায়।
 *
 * 🔹 F2: .d.ts ফাইলে declare global এর নিচে export {} কেন লিখতে হয়?
 *    👉 উত্তর: ফাইলে কোনো ইমপোর্ট/এক্সপোর্ট না থাকলে TS সেটিকে গ্লোবাল স্ক্রিপ্ট মনে করে।
 *             ফাইলটিকে মডিউল হিসেবে চিহ্নিত করতেই `export {}` যোগ করতে হয়।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I used module augmentation to extend Express.Request with 'currentUser' and 'requestId',
 *    giving all our route handlers typed access to auth sessions and tracing IDs."
 *
 * 🇧🇩 বাংলা:
 *   "আমি মডিউল অগমেন্টেশন ব্যবহার করে Express.Request এ 'currentUser' এবং 'requestId' ইনজেক্ট করেছি,
 *    যার ফলে সব রাউট হ্যান্ডলারে সেশন ও ট্রেস আইডির স্বয়ংক্রিয় অটোকমপ্লিশন নিশ্চিত হয়েছে।"
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. type User = { id: string }; type User = { name: string }; কি মার্জ হবে?
 * 2. interface User = { id: string }; interface User = { name: string }; কি মার্জ হবে?
 *
 * 💬 উত্তর:
 * 1. না, ডুপ্লিকেট এরর দেবে।
 * 2. হ্যাঁ, interface হওয়ায় দুটি ফিল্ডই জোড়া লেগে যাবে।
 * ============================================================================
 */

console.log(
  "==================================================================",
);
console.log("🔥 RUNNING: Q19 - Declaration Merging & Module Augmentation");
console.log(
  "==================================================================\n",
);

// ১. Interface Declaration Merging:
interface ServerPluginConfig {
  pluginName: string;
}

// অন্য ফাইল থেকে এসে ফিল্ড যোগ:
interface ServerPluginConfig {
  version: string;
  enabled: boolean;
}

const configDemo: ServerPluginConfig = {
  pluginName: "RateLimiter",
  version: "2.1.0",
  enabled: true,
};
console.log("✅ ১. Declaration Merging Config:", configDemo);

// ২. Global ProcessEnv Augmentation ডেমো:
// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       DATABASE_REPLICA_URL?: string;
//     }
//   }
// }
process.env.DATABASE_REPLICA_URL = "postgres://read-replica:5432/db";
console.log("✅ ২. Augmented ProcessEnv:", process.env.DATABASE_REPLICA_URL);

console.log(
  "\n💡 রিভিশন সামারি: লাইব্রেরির টাইপ বাড়াতে Module Augmentation সেরা!\n",
);
