/**
 * ============================================================================
 * 📌 Q06: Built-in Utility Types: Partial, Pick, Omit, Record, ReturnType ⭐
 * ============================================================================
 * 
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 Partial<T>    ➔ সব প্রোপার্টিকে ঐচ্ছিক (`?`) বানিয়ে দেয় (PATCH API এর জন্য পারফেক্ট)।
 * 
 * 🔹 Pick<T, K>    ➔ বড় অবজেক্ট থেকে নির্দিষ্ট কিছু ফিল্ড শুধু তুলে নেয় (User Summary)।
 * 
 * 🔹 Omit<T, K>    ➔ নির্দিষ্ট ফিল্ড বাদ দিয়ে বাকি সব রাখে (যেমন: password বাদ দেওয়া)।
 * 
 * 🔹 Record<K, V>  ➔ নির্দিষ্ট কী (Key) এবং মানের (Value) টাইপ দিয়ে ডিকশনারি ম্যাপ বানায়।
 * 
 * 🔹 ReturnType<T> ➔ কোনো ফাংশন কী টাইপ রিটার্ন করে তা স্বয়ংক্রিয়ভাবে এক্সট্র্যাক্ট করে।
 * 
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • `Omit` কাজ করে **Object Type**-এর ওপর (প্রোপার্টি বাদ দিতে)।
 *   • আর `Exclude` কাজ করে **Union Type**-এর ওপর (ইউনিয়ন থেকে মান বাদ দিতে)।
 *     দুটো গুলিয়ে ফেলা ইন্টারভিউয়ের খুব কমন একটি ফাঁদ!
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 কখন কোনটা ব্যবহার করবেন? (Cheat Sheet Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬────────────────────────────────┬─────────────────────────────┐
 * │ Utility Type              │ কী কাজ করে?                    │ ব্যাকএন্ডে বাস্তব উদাহরণ    │
 * ├───────────────────────────┼────────────────────────────────┼─────────────────────────────┤
 * │ Partial<T>                │ সব ফিল্ডে `?` অপশনাল বসায়      │ UpdateUserDTO (PATCH)       │
 * │ Pick<T, "id" | "name">    │ নির্দিষ্ট ফিল্ড বেছে আনে      │ UserCardDTO                 │
 * │ Omit<T, "passwordHash">   │ নির্দিষ্ট ফিল্ড বাদ দেয়        │ SafeUserResponse            │
 * │ Record<Role, string[]>    │ কী-ভ্যালু ডিকশনারি তৈরি করে     │ PermissionMap, In-memory Cache│
 * │ ReturnType<typeof fn>     │ ফাংশনের রিটার্ন টাইপ বের করে  │ Service Result Inference    │
 * └───────────────────────────┴────────────────────────────────┴─────────────────────────────┘
 * 
 * 📌 গোল্ডেন রুল:
 *   • প্রতিটা DTO-র জন্য ডুপ্লিকেট ইন্টারফেস না লিখে Utility Types দিয়ে ট্রান্সফর্ম করুন।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "TypeScript utility types provide powerful type transformations over existing types:
 *    1. For database operations, I use 'Partial<T>' for PATCH updates where fields are optional,
 *       'Omit<T, K>' to strip sensitive data like password hashes, and 'Pick<T, K>' for summary views.
 *    2. For architecture, 'Record<K, V>' maps fixed keys to values (like role permissions), while
 *       'ReturnType<typeof fn>' (paired with Awaited) extracts returned types without manual duplication."
 * 
 * 🇧🇩 বাংলায়:
 *   "টাইপস্ক্রিপ্টের ইউটিলিটি টাইপগুলো বিদ্যমান টাইপকে ট্রান্সফর্ম করে নতুন টাইপ বানাতে সাহায্য করে:
 *    ১. ডেটাবেজ ক্রাডে আমি 'Partial<T>' ব্যবহার করি PATCH আপডেটের জন্য যেখানে ফিল্ড অপশনাল থাকে,
 *       'Omit<T, K>' দিয়ে পাসওয়ার্ড হ্যাশের মতো সেনসিটিভ ফিল্ড ফিল্টার করি, আর 'Pick' দিয়ে সামারি ভিউ বানাই।
 *    ২. আর্কিটেকচারে 'Record<K, V>' ব্যবহার করি রোল-পারমিশন বা ক্যাশ ম্যাপ তৈরিতে, আর
 *       'ReturnType<typeof fn>' দিয়ে ফাংশনের রিটার্ন টাইপ ডুপ্লিকেট না লিখে সরাসরি পেয়ে যাই।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: Omit এবং Exclude এর মধ্যে পার্থক্য কী?
 *    👉 উত্তর: Omit অবজেক্টের প্রোপার্টি বাদ দেয় (`Omit<User, "password">`)।
 *             আর Exclude ইউনিয়ন থেকে মেম্বার বাদ দেয় (`Exclude<"a" | "b" | "c", "a">` = "b" | "c")।
 * 
 * 🔹 F2: async ফাংশনের রিটার্ন টাইপ বের করতে ReturnType এর সাথে কী ব্যবহার করতে হয়?
 *    👉 উত্তর: `Awaited<ReturnType<typeof asyncFn>>`! কারণ অ্যাসিনক্রোনাস ফাংশন Promise রিটার্ন করে,
 *             Awaited সেই প্রমিজ আনর‍্যাপ করে আসল ডেটা টাইপ দেয়।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "In our Prisma backend, I created DTOs using 'Omit<User, 'id' | 'createdAt'>' for registration,
 *    and 'Partial<CreateUserDto>' for profile update endpoints."
 * 
 * 🇧🇩 বাংলা:
 *   "আমাদের প্রিজমা ব্যাকএন্ডে রেজিস্ট্রেশন DTO তৈরিতে আমি 'Omit<User, 'id' | 'createdAt'>' ব্যবহার করেছি,
 *    আর প্রোফাইল আপডেট এন্ডপয়েন্টে 'Partial<CreateUserDto>' ব্যবহার করেছি।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. Partial<User> দিলে কি কোনো ফিল্ড বাধ্যতামূলক থাকে?
 * 2. Record<"ADMIN" | "USER", boolean> এ কয়টি কী (Key) থাকতে হবে?
 * 
 * 💬 উত্তর:
 * 1. না, সব ফিল্ড অপশনাল (?) হয়ে যায়।
 * 2. দুটি কী-ই (ADMIN এবং USER) বাধ্যতামূলক থাকতে হবে।
 * ============================================================================
 */

console.log("==================================================================");
console.log("🔥 RUNNING: Q06 - Utility Types: Partial, Pick, Omit, Record");
console.log("==================================================================\n");

interface DatabaseUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

// ১. Omit দিয়ে সিকিউর রেসপন্স:
type SafeUser = Omit<DatabaseUser, "passwordHash">;
const userResp: SafeUser = { id: "u-1", name: "Shohan", email: "shohan@dev.com" };
console.log("✅ ১. Omit (Safe User):", userResp.name);

// ২. Partial দিয়ে অপশনাল প্যাচ:
type UpdateUserDto = Partial<SafeUser>;
const patchData: UpdateUserDto = { name: "Updated Shohan" };
console.log("✅ ২. Partial (Update DTO):", patchData);

// ৩. Record দিয়ে পারমিশন ম্যাপিং:
type Role = "ADMIN" | "GUEST";
const RoleMap: Record<Role, string[]> = {
  ADMIN: ["ALL_ACCESS"],
  GUEST: ["READ_ONLY"],
};
console.log("✅ ৩. Record Map:", RoleMap.ADMIN);

console.log("\n💡 রিভিশন সামারি: নতুন ইন্টারফেস না লিখে Utility Types দিয়ে রূপান্তর করুন!\n");
