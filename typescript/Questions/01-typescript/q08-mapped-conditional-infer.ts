/**
 * ============================================================================
 * 📌 Q08: Mapped and Conditional Types. What does `infer` do? 🔥
 * ============================================================================
 * 
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 Mapped Types        ➔ `[K in keyof T]` সিনট্যাক্স দিয়ে অবজেক্টের সব কী-এর ওপর লুপ চালিয়ে
 *                           তাদের টাইপ বা আচরণ এক সেকেন্ডে পরিবর্তন করা (যেমন: সব ফিল্ড বুলিয়ান করা)।
 * 
 * 🔹 Conditional Types   ➔ টারনারি অপারেটর দিয়ে টাইপ লেভেলে ইফ-এলস চালানো:
 *                           `T extends Condition ? TrueType : FalseType`।
 * 
 * 🔹 infer কীওয়ার্ড     ➔ কন্ডিশনাল টাইপের ভেতর থেকে অজানা টাইপ ভ্যারিয়েবলকে অটোমেটিক
 *                           এক্সট্র্যাক্ট বা গোয়েন্দাগিরি করে বের করে আনার জাদুকরী অস্ত্র!
 * 
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • `infer` কীওয়ার্ড কেবল এবং কেবল `extends` ক্লজের ডানপাশে টাইপ ডিক্লেয়ার করার জন্য কাজ করে।
 *   • সাধারণ টাইপ বা ইন্টারফেসে সরাসরি `infer` লেখা সম্পূর্ণ নিষিদ্ধ ও কম্পাইল এরর।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 কখন কোনটা ব্যবহার করবেন? (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬────────────────────────────────┬─────────────────────────────┐
 * │ টাইপ কনসেপ্ট              │ মূল সিনট্যাক্স                 │ কেন ব্যবহার করবেন?          │
 * ├───────────────────────────┼────────────────────────────────┼─────────────────────────────┤
 * │ Mapped Type               │ { [K in keyof T]: boolean }    │ অবজেক্টের প্রতিটি ফিল্ড বদলাতে│
 * │ Conditional Type          │ T extends string ? A : B       │ টাইপভিত্তিক লজিক ও ডাইনামিক রিটার্ন│
 * │ infer Keyword             │ T extends Promise<infer U>?U:T │ প্রমিজ বা ফাংশন থেকে টাইপ আনর‍্যাপ│
 * └───────────────────────────┴────────────────────────────────┴─────────────────────────────┘
 * 
 * 📌 গোল্ডেন রুল:
 *   • প্রমিজ বা আর্গুমেন্ট আনর‍্যাপ করতে `infer`, আর অবজেক্ট ট্রাভার্স করতে Mapped Type।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "These form TypeScript's advanced type-level programming capabilities:
 *    1. Mapped Types iterate over keys ([K in keyof T]) to transform entire object shapes,
 *       which is how built-ins like Partial and Readonly are implemented.
 *    2. Conditional Types (T extends U ? X : Y) allow branching logic based on input types.
 *    3. The 'infer' keyword introduces a type variable within a conditional type's extends clause,
 *       allowing TypeScript to automatically deduce and extract inner types, like unwrapping Promises."
 * 
 * 🇧🇩 বাংলায়:
 *   "এগুলো টাইপস্ক্রিপ্টের অ্যাডভান্সড মেটা-প্রোগ্রামিংয়ের ভিত্তি:
 *    ১. Mapped Types অবজেক্টের কী-গুলোর ওপর লুপ ঘুরিয়ে সম্পূর্ণ অবজেক্টকে রূপান্তর করে
 *       (যেমন Partial ও Readonly ইন্টারনালি এভাবে তৈরি)।
 *    ২. Conditional Types দিয়ে টাইপের ভেতর ইফ-এলস ব্রাঞ্চিং লজিক লেখা যায়।
 *    ৩. আর 'infer' কীওয়ার্ড কন্ডিশনাল টাইপের ভেতর থেকে অজানা কোনো টাইপকে অটোমেটিক উদ্ধার
 *       বা এক্সট্র্যাক্ট করে নেয়, যেমন Promise বা ফাংশন প্যারামিটারের আসল টাইপ বের করা।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: TypeScript এর বিল্ট-ইন ReturnType<T> কীভাবে কাজ করে?
 *    👉 উত্তর: `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;`  
 *             এখানে `infer R` দিয়ে ফাংশনের রিটার্ন টাইপটিকে আলাদা করে তুলে নেওয়া হয়।
 * 
 * 🔹 F2: Distributive Conditional Type কী?
 *    👉 উত্তর: Generic কন্ডিশনাল টাইপের ওপর Union টাইপ পাস করলে কম্পাইলার ইউনিয়নের প্রতিটি
 *             মেম্বারের ওপর আলাদা আলাদা করে কন্ডিশনটি ডিস্ট্রিবিউট বা অ্যাপ্লাই করে।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I used conditional types with 'infer' to create an EventPayload<T> extractor that deduces
 *    the exact message body passed into our message broker handlers."
 * 
 * 🇧🇩 বাংলা:
 *   "আমি মেসেজ ব্রোকার ইভেন্ট হ্যান্ডলার থেকে মেসজের বডি বের করতে 'infer' সম্বলিত
 *    কন্ডিশনাল টাইপ ব্যবহার করেছি যাতে কোনো ম্যানুয়াল টাইপ কাস্টিং ছাড়াই ডেটা টাইপসেফ থাকে।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. type Unwrap<T> = T extends Promise<infer U> ? U : T; এ T = Promise<string> হলে রেজাল্ট কী?
 * 2. T = number হলে রেজাল্ট কী?
 * 
 * 💬 উত্তর:
 * 1. string (প্রমিজ আনর‍্যাপ হয়েছে)
 * 2. number (যেহেতু প্রমিজ নয়, তাই সরাসরি T রিটার্ন হয়েছে)
 * ============================================================================
 */

console.log("==================================================================");
console.log("🔥 RUNNING: Q08 - Mapped, Conditional Types & 'infer'");
console.log("==================================================================\n");

// ১. infer দিয়ে Promise আনর‍্যাপ করা:
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type UserPromise = Promise<{ id: string; name: string }>;
type UnwrappedUser = UnwrapPromise<UserPromise>;

const resolved: UnwrappedUser = { id: "usr_1", name: "Sajjad Shohan" };
console.log("✅ ১. infer দিয়ে Promise থেকে টাইপ উদ্ধার:", resolved.name);

// ২. Mapped Type দিয়ে পারমিশন ফ্ল্যাগ:
type Flags<T> = { [K in keyof T as `canEdit_${string & K}`]: boolean };
type UserFlags = Flags<{ email: string }>;
const flags: UserFlags = { canEdit_email: true };
console.log("✅ ২. Mapped Type ফ্ল্যাগ:", flags.canEdit_email);

console.log("\n💡 রিভিশন সামারি: টাইপ থেকে ভেতরের ডেটা তুলতে 'infer' এর বিকল্প নেই!\n");
