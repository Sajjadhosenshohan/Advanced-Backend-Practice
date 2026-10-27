/**
 * ============================================================================
 * 📌 Q13: What does `strict` mode enable? 💡 (Compiler Architecture)
 * ============================================================================
 * 
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 strict: true             ➔ tsconfig.json-এ এটি অন করলে টাইপস্ক্রিপ্ট কম্পাইলারের
 *                               একগুচ্ছ কড়া সিকিউরিটি গার্ড একসাথে সক্রিয় হয়ে যায়।
 * 
 * 🔹 strictNullChecks         ➔ `null` এবং `undefined` কে আলাদা ডিস্টিংক্ট টাইপ হিসেবে গণ্য করে।
 *                               জাভাস্ক্রিপ্টের "Cannot read properties of undefined" ক্র্যাশ চিরতরে বন্ধ করে।
 * 
 * 🔹 noImplicitAny            ➔ আপনি টাইপ না লিখলে কম্পাইলার যদি অনুমান করতে ব্যর্থ হয়,
 *                               তবে চুপিচুপি any না বানিয়ে কম্পাইল এরর ছুড়ে দেয়।
 * 
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • বড় লিগ্যাসি কোডবেসে প্রথম দিনেই `strict: true` অন করলে শত শত এররে বিল্ড আটকে যাবে।
 *   • সঠিক স্ট্র্যাটেজি হলো ধাপে ধাপে `noImplicitAny` ও `strictNullChecks` অন করা।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 strict: true এর অধীনস্থ মূল ফ্ল্যাগসমূহ (Core Flags Matrix)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬────────────────────────────────┬─────────────────────────────┐
 * │ ফ্ল্যাগ নাম                 │ কী দায়িত্ব পালন করে?           │ না থাকলে কী বিপদ?           │
 * ├───────────────────────────┼────────────────────────────────┼─────────────────────────────┤
 * │ strictNullChecks          │ null/undefined আলাদা টাইপ করে   │ রানটাইমে undefined ক্র্যাশ  │
 * │ noImplicitAny             │ অস্পষ্ট টাইপে any হওয়া আটকায়    │ টাইপসেফটি ড্রপ করে          │
 * │ strictPropertyInitialization│ ক্লাসের ফিল্ড ইনিশিয়ালাইজেশন চেক│ ক্লাসের অবজেক্টে খালি ভ্যালু│
 * │ strictBindCallApply       │ call/apply মেথডে স্ট্রিক্ট আর্গুমেন্ট│ ভুল আর্গুমেন্টে রানটাইম বাগ │
 * │ useUnknownInCatchVariables│ catch (e) এর ডিফল্ট টাইপ unknown| catch ব্লকে অসতর্ক any কোড  │
 * └───────────────────────────┴────────────────────────────────┴─────────────────────────────┘
 * 
 * 📌 গোল্ডেন রুল:
 *   • নতুন যেকোনো গ্রিনফিল্ড ব্যাকএন্ড প্রজেক্টে ডে-ওয়ান থেকে **`strict: true`** অন রাখুন।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "Enabling 'strict: true' turns on a suite of strict type-checking flags in the compiler:
 *    1. The most critical is 'strictNullChecks', which treats null and undefined as distinct types,
 *       forcing safe optional chaining and preventing runtime 'Cannot read properties of undefined' crashes.
 *    2. It also enables 'noImplicitAny', 'strictPropertyInitialization' on classes, and
 *       'useUnknownInCatchVariables', catching over 80% of preventable JavaScript bugs during compilation."
 * 
 * 🇧🇩 বাংলায়:
 *   "tsconfig-এ 'strict: true' অন করলে একগুচ্ছ কড়া কম্পাইলার ফ্ল্যাগ একসাথে অন হয়ে যায়:
 *    ১. সবচেয়ে গুরুত্বপূর্ণ হলো 'strictNullChecks'—যা null এবং undefined কে আলাদা টাইপ মনে করে
 *       ডেভেলপারকে অপশনাল চেইনিং করতে বাধ্য করে এবং রানটাইম ক্র্যাশ বন্ধ করে।
 *    ২. এছাড়া 'noImplicitAny', ক্লাসে ফিল্ড ইনিশিয়ালাইজেশন চেক এবং ক্যাচ ব্লকে unknown ফোর্স করে,
 *       যার ফলে জাভাস্ক্রিপ্টের প্রায় ৮০% সাধারণ বাগ কোড রান হওয়ার আগেই কম্পাইল টাইমে ধরা পড়ে।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: strict ছাড়া আর কোন দুটি ভালো কোড-কোয়ালিটি ফ্ল্যাগ আছে?
 *    👉 উত্তর: `"noUnusedLocals": true` (অব্যবহৃত ভ্যারিয়েবল আটকাতে) এবং  
 *             `"noUnusedParameters": true` (ফাংশনের অতিরিক্ত প্যারামিটার আটকাতে)।
 * 
 * 🔹 F2: useUnknownInCatchVariables ফ্ল্যাগটি কেন গুরুত্বপূর্ণ?
 *    👉 উত্তর: জাভাস্ক্রিপ্টে যে কেউ `throw "string"` বা `throw 404` করতে পারে। তাই ক্যাচ ব্লকে
 *             ডিফল্টভাবে `unknown` থাকলে ডেভেলপার বাধ্য হয়ে `if (err instanceof Error)` চেক করে।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "We enforce 'strict: true' in our tsconfig.json and CI pipeline to ensure zero unhandled
 *    null references and prevent 'any' pollution across our microservices."
 * 
 * 🇧🇩 বাংলা:
 *   "আমরা আমাদের tsconfig এবং CI/CD পাইপলাইনে 'strict: true' বাধ্যতামূলক রাখি যাতে
 *    মাইক্রোসার্ভিসের কোনো কোডে অসাবধান 'any' বা নাল পয়েন্টার এক্সেপশন না ঢুকতে পারে।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. strictNullChecks অন থাকলে let name: string = null; কি বৈধ?
 * 2. এরর ফিক্স করতে কীভাবে টাইপ লিখতে হবে?
 * 
 * 💬 উত্তর:
 * 1. না, কম্পাইল এরর দেবে।
 * 2. `let name: string | null = null;`
 * ============================================================================
 */

console.log("==================================================================");
console.log("🔥 RUNNING: Q13 - What does 'strict' mode enable?");
console.log("==================================================================\n");

// ১. strictNullChecks টেস্ট:
function findAccount(id: string): { balance: number } | null {
  return id === "1" ? { balance: 5000 } : null;
}

const account = findAccount("2");

// strict অন থাকায় অপশনাল চেইনিং ছাড়া সরাসরি account.balance পড়া যাবে না:
const safeBalance = account?.balance ?? 0;
console.log("✅ ১. strictNullChecks সুরক্ষিত ভ্যালু:", safeBalance);

// ২. noImplicitAny টেস্ট:
function sum(a: number, b: number): number {
  return a + b;
}
console.log("✅ ২. noImplicitAny সুরক্ষিত ক্যালকুলেশন:", sum(10, 25));

console.log("\n💡 রিভিশন সামারি: প্রোডাকশনের লাইফসেভার হলো strict: true!\n");
