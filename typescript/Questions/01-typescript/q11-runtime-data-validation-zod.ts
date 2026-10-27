/**
 * ============================================================================
 * 📌 Q11: How do you validate runtime data? Zod vs class-validator 💎
 * ============================================================================
 * 
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 কেন লাইব্রেরি লাগে? ➔ টাইপস্ক্রিপ্ট কম্পাইল হলে মুছে যায় (Type Erasure)। তাই ক্লায়েন্ট
 *                           ভুল ডেটা পাঠালে তা আটকাতে রানটাইম স্কিমা ভ্যালিডেটর দরকার।
 * 
 * 🔹 Zod                ➔ Schema-first, Functional, সুপার লাইটওয়েট এবং `z.infer` দিয়ে
 *                           এক লাইনে টাইপস্ক্রিপ্ট টাইপ তৈরি করে ফেলে। Express/tRPC এর স্ট্যান্ডার্ড।
 * 
 * 🔹 class-validator    ➔ Class-based ও Decorator (`@IsEmail()`) নির্ভর। মূলত NestJS-এ ব্যবহৃত হয়।
 * 
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • `schema.parse()` ডেটা ভুল হলে সরাসরি এক্সেপশন থ্রো করে অ্যাপ ক্র্যাশ করায়।
 *   • কিন্তু `schema.safeParse()` কোনো এক্সেপশন ছোঁড়ে না; `{ success: true, data }` বা
 *     `{ success: false, error }` Discriminated Union অবজেক্ট দেয় যা অনেক বেশি নিরাপদ!
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 Zod বনাম class-validator (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬────────────────────────────────┬─────────────────────────────┐
 * │ মানদণ্ড                   │              Zod 🏆            │       class-validator       │
 * ├───────────────────────────┼────────────────────────────────┼─────────────────────────────┤
 * │ আর্কিটেকচার               │ Schema-first & Functional      │ Class & Decorator-based     │
 * │ টাইপ ইনফারেন্স           │ ⚡ z.infer (কোনো ডুপ্লিকেট নেই) │ ⚠️ আলাদা ক্লাস ও DTO লাগে   │
 * │ ডিপেন্ডেন্সি              │ জিরো (Zero Reflection/Babel)   │ reflect-metadata লাগে       │
 * │ জনপ্রিয় ফ্রেমওয়ার্ক       │ Express, Fastify, Hono, tRPC   │ NestJS ইকোসিস্টেম           │
 * └───────────────────────────┴────────────────────────────────┴─────────────────────────────┘
 * 
 * 📌 গোল্ডেন রুল:
 *   • NestJS না হলে বাকি সব ব্যাকএন্ডে **Zod** ব্যবহার করুন।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "Since TypeScript types are erased at runtime, we must validate external boundaries with a runtime validator:
 *    1. I prefer Zod for most Node.js projects because it is schema-first, functional, and generates
 *       static TypeScript types automatically using z.infer without duplicate class definitions.
 *    2. In NestJS applications, class-validator with decorators like @IsEmail() is standard because
 *       it integrates natively with the framework's ValidationPipe."
 * 
 * 🇧🇩 বাংলায়:
 *   "যেহেতু টাইপস্ক্রিপ্ট রানটাইমে টিকে থাকে না, তাই বাইরের ইনপুট চেক করতে রানটাইম ভ্যালিডেটর দরকার:
 *    ১. সাধারণ নোড.জেএস ও Express প্রজেক্টে আমি Zod পছন্দ করি, কারণ এটি স্কিমা-ফার্স্ট এবং
 *       z.infer দিয়ে ডুপ্লিকেট ক্লাস ছাড়াই স্বয়ংক্রিয়ভাবে টাইপস্ক্রিপ্ট টাইপ তৈরি করে দেয়।
 *    ২. আর NestJS ফ্রেমওয়ার্কে class-validator আদর্শ, কারণ এটি ফ্রেমওয়ার্কের ডেকোরেটর ও
 *       ValidationPipe এর সাথে সুন্দরভাবে ইন্টিগ্রেট হয়।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: parse() আর safeParse() এর মধ্যে কোনটি ব্যবহার করা উচিত?
 *    👉 উত্তর: ব্যাকএন্ড রিকোয়েস্টে safeParse() ব্যবহার করা উত্তম, কারণ এটি এরর থ্রো করে না,
 *             বরং রেজাল্ট অবজেক্ট দেয় যা দিয়ে সুন্দর করে 400 Bad Request রেসপন্স পাঠানো যায়।
 * 
 * 🔹 F2: Zod দিয়ে process.env কীভাবে ভ্যালিডেট করা যায়?
 *    👉 উত্তর: z.coerce.number() ব্যবহার করে পোর্ট নম্বর ইত্যাদি ভ্যালিডেট করে সার্ভার বুটের সময়ই
 *             যেকোনো মিসিং এনভায়রনমেন্ট ভেরিয়েবল ক্যাচ করে ফেলা যায়।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I created an Express validation middleware using 'schema.safeParse(req.body)' that returns
 *    formatted 400 field errors or assigns the sanitized data to req.body."
 * 
 * 🇧🇩 বাংলা:
 *   "আমি এক্সপ্রেস মিডলওয়্যারে 'schema.safeParse(req.body)' ব্যবহার করে ইনপুট স্যানিটাইজ করেছি
 *    এবং ভুল থাকলে ফর্ম্যাটেড ৪০০ ব্যাড রিকোয়েস্ট এরর পাঠিয়েছি।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. Zod স্কিমা থেকে টাইপস্ক্রিপ্ট টাইপ পাওয়ার সিনট্যাক্স কী?
 * 2. safeParse সফল হলে ডেটা কোন প্রোপার্টিতে থাকে?
 * 
 * 💬 উত্তর:
 * 1. `type MyType = z.infer<typeof MySchema>;`
 * 2. `result.data`
 * ============================================================================
 */

import { z } from "zod";

console.log("==================================================================");
console.log("🔥 RUNNING: Q11 - Runtime Data Validation: Zod vs class-validator");
console.log("==================================================================\n");

// ১. Zod স্কিমা ডিফাইন করা:
const UserPayloadSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

// ২. টাইপ ইনফার করা:
type UserPayload = z.infer<typeof UserPayloadSchema>;

// ৩. safeParse দিয়ে টেস্ট:
const validData = { email: "shohan@antigravity.dev", age: 26 };
const res = UserPayloadSchema.safeParse(validData);

if (res.success) {
  const user: UserPayload = res.data;
  console.log("✅ ১. Zod ভ্যালিডেশন সফল:", user.email);
}

// ইনভ্যালিড ডেটা টেস্ট:
const invalidRes = UserPayloadSchema.safeParse({ email: "not-an-email", age: 10 });
if (!invalidRes.success) {
  console.log("🚨 ২. Zod এরর ধরা পড়েছে:", invalidRes.error.flatten().fieldErrors);
}

console.log("\n💡 রিভিশন সামারি: Express-এ Zod, আর NestJS-এ class-validator!\n");
