/**
 * ============================================================================
 * 📌 Q07: keyof, typeof, and Indexed Access Types
 * ============================================================================
 * 
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 keyof           ➔ অবজেক্ট টাইপের সমস্ত প্রোপার্টি নামের ইউনিয়ন বের করে আনে।
 *                       যেমন: `keyof User` ➔ `"id" | "name" | "email"`।
 * 
 * 🔹 typeof          ➔ রানটাইম জাভাস্ক্রিপ্ট ভ্যালু বা কনফিগ অবজেক্ট থেকে টাইপস্ক্রিপ্ট টাইপ তৈরি করে।
 *                       যেমন: `type Config = typeof appConfig;`।
 * 
 * 🔹 Indexed Access  ➔ অবজেক্ট টাইপের নির্দিষ্ট প্রোপার্টির টাইপ ব্র্যাকেট দিয়ে টেনে আনে (`User["role"]`)।
 *                       এমনকি অ্যারের এলিমেন্ট টাইপও বের করে: `(typeof arr)[number]`।
 * 
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • জাভাস্ক্রিপ্টের `typeof` রানটাইমে স্ট্রিং দেয় (যেমন: `"string"`, `"object"`)।
 *   • কিন্তু টাইপস্ক্রিপ্টের `typeof` কম্পাইল-টাইম টাইপ স্পেসে অবজেক্টের ব্লুপ্রিন্ট টেনে বের করে আনে!
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 কখন কোনটা ব্যবহার করবেন? (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬────────────────────────────────┬─────────────────────────────┐
 * │ অপারেটর                   │ সিনট্যাক্স                     │ আউটপুট কী দেয়?              │
 * ├───────────────────────────┼────────────────────────────────┼─────────────────────────────┤
 * │ keyof                     │ keyof Entity                   │ প্রোপার্টি নামের Union      │
 * │ typeof                    │ typeof runtimeObject           │ ভ্যালু থেকে TS টাইপ ব্লুপ্রিন্ট│
 * │ Indexed Access            │ Entity["nested"]["prop"]       │ নির্দিষ্ট নেস্টেড টাইপ      │
 * │ Array Indexed Access      │ (typeof list)[number]          │ অ্যারে আইটেমের Union        │
 * └───────────────────────────┴────────────────────────────────┴─────────────────────────────┘
 * 
 * 📌 গোল্ডেন রুল:
 *   • সিঙ্গেল সোর্স অব ট্রুথ বজায় রাখতে রানটাইম কনফিগ থেকে `typeof` এবং কলাম ফিল্টারে `keyof` ব্যবহার করুন।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "These three operators enable dynamic, single-source-of-truth typing:
 *    1. 'keyof' extracts a union of keys from an object type, ensuring we only pass valid column names.
 *    2. 'typeof' in TypeScript captures the static type of a runtime value, like our server config,
 *       avoiding duplicate interface declarations.
 *    3. 'Indexed Access' (T[K]) lets us look up property types or extract union members from arrays
 *       using (typeof arr)[number]."
 * 
 * 🇧🇩 বাংলায়:
 *   "এই তিনটি অপারেটর দিয়ে টাইপস্ক্রিপ্টে সিঙ্গেল সোর্স অব ট্রুথ বজায় রাখা যায়:
 *    ১. 'keyof' কোনো অবজেক্টের সব প্রোপার্টির নামের ইউনিয়ন তৈরি করে, ফলে ডেটাবেজের বৈধ কলাম
 *       নাম ছাড়া ভুল ফিল্ড সর্ট করা অসম্ভব হয়।
 *    ২. 'typeof' রানটাইমের আসল অবজেক্ট (যেমন কনফিগ ফাইল) থেকে স্ট্যাটিক টাইপ তৈরি করে, ফলে
 *       আলাদা করে ইন্টারফেস লেখার কোনো প্রয়োজন পড়ে না।
 *    ৩. 'Indexed Access' (T[K]) দিয়ে নেস্টেড ফিল্ডের টাইপ বা অ্যারে থেকে ইউনিয়ন মান বের করা যায়।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: const অ্যারে থেকে Union টাইপ বের করার শর্টকাট কী?
 *    👉 উত্তর: `const roles = ["ADMIN", "USER"] as const;`  
 *             `type Role = (typeof roles)[number];` (ফলাফল: "ADMIN" | "USER")।
 * 
 * 🔹 F2: generic function এ keyof কীভাবে টাইপসেফ প্রোপার্টি রিড করে?
 *    👉 উত্তর: `<T, K extends keyof T>(obj: T, key: K): T[K]` লিখলে রিটার্ন টাইপ
 *             সরাসরি ওই স্পেসিফিক ফিল্ডের টাইপ হয়ে যায়!
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I use 'keyof User' to restrict sorting and filtering parameters in database queries,
 *    and 'typeof appConfig' to generate our application configuration types automatically."
 * 
 * 🇧🇩 বাংলা:
 *   "আমার ব্যাকএন্ডে ডেটাবেজ কোয়েরির সর্ট কলাম ভ্যালিডেট করতে আমি 'keyof User' ব্যবহার করি,
 *    আর এনভায়রনমেন্ট কনফিগারেশন টাইপ পেতে 'typeof appConfig' ব্যবহার করি।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. type X = keyof { id: string; age: number } এর মান কী হবে?
 * 2. const list = ["a", "b"] as const; এর ক্ষেত্রে (typeof list)[number] কী দেবে?
 * 
 * 💬 উত্তর:
 * 1. "id" | "age"
 * 2. "a" | "b"
 * ============================================================================
 */

console.log("==================================================================");
console.log("🔥 RUNNING: Q07 - keyof, typeof & Indexed Access Types");
console.log("==================================================================\n");

// ১. keyof দিয়ে কলাম ফিল্টারিং:
interface Product {
  id: string;
  name: string;
  price: number;
}
type ProductColumn = keyof Product; // "id" | "name" | "price"

function sortProducts(col: ProductColumn) {
  console.log(`✅ ১. keyof কলাম সর্টিং: SELECT * ORDER BY ${col}`);
}
sortProducts("price");

// ২. typeof কনফিগ ডেরাইভেশন:
const RuntimeConfig = { port: 8080, debug: true };
type ConfigType = typeof RuntimeConfig;
const currentConfig: ConfigType = { port: 5000, debug: false };
console.log("✅ ২. typeof কনফিগ:", currentConfig.port);

// ৩. Indexed Access দিয়ে অ্যারে থেকে ইউনিয়ন:
const GUEST_ROLES = ["VIEWER", "COMMENTER"] as const;
type GuestRole = (typeof GUEST_ROLES)[number];
const activeGuest: GuestRole = "VIEWER";
console.log("✅ ৩. Indexed Access Array to Union:", activeGuest);

console.log("\n💡 রিভিশন সামারি: কলামে keyof, কনফিগে typeof, আর অ্যারেতে [number]!\n");
