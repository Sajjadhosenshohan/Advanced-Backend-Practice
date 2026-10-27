/**
 * ============================================================================
 * 📌 Q03: What are Generics? Constrained Generic Function ⭐🔥
 * ============================================================================
 *
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 Generics (<T>)        ➔ টাইপকে হার্ডকোড না করে ভ্যারিয়েবল আকারে পাস করার কৌশল।
 *                             ফাংশন বা ক্লাস রিইউজেবল হবে, কিন্তু টাইপ সেফটি বিন্দু পরিমাণও কমবে না।
 *
 * 🔹 Constrained Generic   ➔ `<T extends HasId>` দিয়ে জেনেরিক টাইপকে শর্তে বেঁধে ফেলা।
 *                             "বক্সে যা খুশি পাস করতে পারেন, কিন্তু ওটাতে অবশ্যই 'id' ফিল্ড থাকতে হবে।"
 *
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • জেনেরিক অবজেক্টে সরাসরি `obj.id` পড়তে গেলে কম্পাইলার চিল্লাবে যতক্ষণ না আপনি
 *     `T extends { id: string }` শর্ত জুড়ে দিচ্ছেন। শর্ত ছাড়া T যেকোনো কিছু (এমনকি number) হতে পারে!
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 কখন কোনটা ব্যবহার করবেন? (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬──────────────────┬──────────────────┬────────────────────────┐
 * │ পদ্ধতি (Approach)         │   any ব্যবহার    │  Simple Generic  │  Constrained Generic   │
 * ├───────────────────────────┼──────────────────┼──────────────────┼────────────────────────┤
 * │ টাইপ সেফটি (Type Safety) │ ❌ ০% (ফাঁপা)    │ 🛡️ ১০০% সুরক্ষিত │ 🔒 ১০০% + নির্দিষ্ট ফিল্ড│
 * │ IDE Auto-completion       │ ❌ কোনো সাজেশন নেই│ ✅ ইনপুটের টাইপ  │ ✅ স্পেসিফিক ফিল্ড সাজেশন│
 * │ ব্যবহারের ক্ষেত্র         │ কখনোই নয়         │ ডেটা র‍্যাপার/অ্যারে│ DB রিপোজিটরি ও সার্ভিস │
 * └───────────────────────────┴──────────────────┴──────────────────┴────────────────────────┘
 *
 * 📌 গোল্ডেন রুল:
 *   • রিইউজেবল কোডে any পরিহার করে `<T>` ব্যবহার করুন।
 *   • আর কোনো নির্দিষ্ট ফিল্ডের উপস্থিতি দাবি করতে `<T extends Constraint>` ব্যবহার করুন।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "Generics allow us to write reusable, type-safe abstractions by parameterizing types:
 *    1. Instead of hardcoding types or losing safety with 'any', generics preserve the exact
 *       input type throughout the execution pipeline.
 *    2. When a generic function needs to access specific properties (like an 'id' or 'length'),
 *       we constrain it using the 'extends' keyword, like <T extends { id: string }>.
 *    In short: Generics give reusability without sacrificing compile-time type safety."
 *
 * 🇧🇩 বাংলায়:
 *   "জেনেরিকস হলো টাইপকে হার্ডকোড না করে প্যারামিটার আকারে পাস করে রিইউজেবল কোড লেখার উপায়:
 *    ১. 'any' লিখে টাইপ নষ্ট না করে জেনেরিকস ইনপুটের হুবহু টাইপ রিটার্ন পর্যন্ত ধরে রাখে (Type Preservation)।
 *    ২. আর যখন জেনেরিক অবজেক্টের ভেতর নির্দিষ্ট কোনো প্রোপার্টি (যেমন: id) এক্সেস করতে হয়,
 *       তখন 'extends' দিয়ে শর্ত বেঁধে দিতে হয়, যেমন: `<T extends { id: string }>’।
 *    সহজ কথায়: টাইপ সেফটি না হারিয়ে রিইউজেবল ব্যাকএন্ড রিপোজিটরি বানাতে জেনেরিকস সেরা।"
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: Generics এ একাধিক টাইপ প্যারামিটার কি ব্যবহার করা যায়?
 *    👉 উত্তর: হ্যাঁ, যেমন: `<T, U>`। উদাহরণস্বরূপ দুটি অবজেক্ট মার্জ করা:
 *             `function merge<T, U>(a: T, b: U): T & U`।
 *
 * 🔹 F2: `<T extends keyof Target>` এর কাজ কী?
 *    👉 উত্তর: এটি নিশ্চিত করে যে প্যারামিটারে যে কী (Key) পাস করা হবে তা অবশ্যই
 *             টার্গেট অবজেক্টের বৈধ কোনো প্রোপার্টির নাম হতে হবে। ভুল নাম দিলে কম্পাইলার আটকাবে।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I implemented a Generic Base Repository pattern: IBaseRepository<T extends { id: string }>
 *    to handle standard CRUD operations for all database entities while maintaining full type safety."
 *
 * 🇧🇩 বাংলা:
 *   "আমার ব্যাকএন্ড প্রজেক্টে আমি জেনেরিক বেস রিপোজিটরি <T extends { id: string }> বানিয়েছি
 *    যাতে সব ডেটাবেজ এন্টিটির জন্য একই ক্রাড (CRUD) মেথড টাইপসেফভাবে ব্যবহার করা যায়।"
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. function test<T>(x: T) { return x.id; } এ কেন কম্পাইল এরর দেয়?
 * 2. এররটি ফিক্স করতে T এর সাথে কী লিখতে হবে?
 *
 * 💬 উত্তর:
 * 1. কারণ T যেকোনো কিছু হতে পারে (যেমন number), যার মধ্যে id ফিল্ড নাও থাকতে পারে।
 * 2. লিখতে হবে: `<T extends { id: any }>`।
 * ============================================================================
 */

console.log(
  "==================================================================",
);
console.log("🔥 RUNNING: Q03 - Generics & Constrained Functions");
console.log(
  "==================================================================\n",
);

// ----------------------------------------------------------------------------
// ১. সিম্পল জেনেরিক ফাংশন (Type Preservation)
// ----------------------------------------------------------------------------
function wrapInBox<T>(item: T): { data: T; timestamp: number } {
  return {
    data: item,
    timestamp: Date.now(),
  };
}

const boxedNumber = wrapInBox(100); // data: number
const boxedUser = wrapInBox({ name: "Shohan" }); // data: { name: string }
console.log(
  "✅ ১. সিম্পল জেনেরিক বক্স:",
  boxedNumber.data,
  boxedUser.data.name,
);

// const Game = <T>(payload: T): { data: T; time: string } => {
//   return {
//     data: payload,
//     time: new Date().toISOString(),
//   };
// };

// console.log("Game", Game({ name: "Shohan", age: 24 }));

// ----------------------------------------------------------------------------
// ২. ইন্টারভিউ স্পেশাল: Constrained Generic Function (<T extends HasId>)
// ----------------------------------------------------------------------------
interface HasId {
  id: string | number;
}

// শর্ত: T অবজেক্টে অবশ্যই id থাকতে হবে:
function getEntityIdentity<T extends HasId>(entity: T): string {
  return `Entity ID: ${entity.id}`;
}

const userEntity = { id: "usr_404", email: "user@test.com" };
console.log(
  "✅ ২. Constrained Generic সফলভাবে এক্সিকিউট:",
  getEntityIdentity(userEntity),
);

// getEntityIdentity({ name: "Anonymous Task" });
// ❌ Error: Argument of type '{ name: string; }' is not assignable to 'HasId'.

// ----------------------------------------------------------------------------
// ৩. keyof Constraint দিয়ে টাইপসেফ প্রোপার্টি গেটার
// ----------------------------------------------------------------------------
function readProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const dbConfig = { host: "localhost", port: 5432, ssl: true };
const dbPort = readProperty(dbConfig, "port"); // Type: number
console.log("✅ ৩. keyof Constrained Property:", "Port is", dbPort);

console.log(
  "\n💡 রিভিশন সামারি: যে কোনো টাইপে <T>, আর নির্দিষ্ট ফিল্ডে <T extends Constraint>!\n",
);
