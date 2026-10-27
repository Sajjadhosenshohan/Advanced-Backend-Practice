/**
 * ============================================================================
 * 📌 Q02: any vs unknown vs never ⭐
 * ============================================================================
 *
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 any     ➔ Type Checking পুরোপুরি বন্ধ। যা খুশি এসাইন করা যায়, যা ইচ্ছা কল করা যায়।
 *               সবচেয়ে বড় সমস্যা: এটি ছোঁয়াচে (Contagious), আশপাশের টাইপকেও any বানিয়ে দেয়।
 *
 * 🔹 unknown ➔ any-এর নিরাপদ সংস্করণ (Safe counterpart)। যেকোনো ডেটা গ্রহণ করে,
 *               কিন্তু টাইপ ন্যারো (Narrow) না করা পর্যন্ত কোনো মেথড কল করতে দেয় না।
 *
 * 🔹 never   ➔ যে মানটি বাস্তবে কখনোই ঘটবে না (Empty / Bottom Type)।
 *               সুপারপাওয়ার: Exhaustive Check (সুইচ কেসে কোনো অপশন বাদ পড়লে কম্পাইলার আটকে দেয়)।
 *
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • `JSON.parse()` এবং `await res.json()` ডিফল্টভাবে `any` রিটার্ন করে!
 *     মানে আপনি নিজের হাতে না লিখলেও ব্যাকএন্ড কোডবেসে গোপনে `any` ঢুকে যায়।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 কখন কোনটা ব্যবহার করবেন? (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬──────────────────┬──────────────────┬────────────────────────┐
 * │ বৈশিষ্ট্য (Feature)       │       any        │     unknown      │         never          │
 * ├───────────────────────────┼──────────────────┼──────────────────┼────────────────────────┤
 * │ টাইপ সেফটি (Type Safety) │ ❌ ০% (জাভাস্ক্রিপ্ট)│ 🛡️ ১০০% সুরক্ষিত │ 🔒 সর্বোচ্চ (ভ্যালু নেই)│
 * │ ব্যবহারের পূর্বে চেক?    │ ❌ প্রয়োজন নেই   │ ✅ বাধ্যতামূলক     │ ❌ কল করার ভ্যালু নেই  │
 * │ প্রজেক্টে কখন ব্যবহার?   │ মাইগ্রেশনে সাময়িক │ বাইরের সব অচেনা ইনপুট│ এরর থ্রো ও Exhaustive  │
 * └───────────────────────────┴──────────────────┴──────────────────┴────────────────────────┘
 *
 * 📌 গোল্ডেন রুল:
 *   • যেখানেই any লিখতে মন চাইবে, সেখানে `unknown` লিখুন।
 *   • বাউন্ডারিতে unknown, আর সুইচ কেস পাহারায় `never`।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "These three sit at different ends of the type system:
 *    1. 'any' turns off type checking entirely and is contagious, so errors leak into runtime.
 *       Many standard APIs like JSON.parse() return it silently.
 *    2. 'unknown' is the safe alternative: it accepts any value, but forces us to narrow it
 *       using typeof, instanceof, or Zod before reading any property. I use it for API payloads.
 *    3. 'never' represents values that can never occur. Functions that always throw return never,
 *       and assigning leftover union values to a never variable guarantees exhaustive switches."
 *
 * 🇧🇩 বাংলায়:
 *   "এই তিনটা টাইপস্ক্রিপ্ট টাইপ সিস্টেমের তিন প্রান্তে অবস্থান করে:
 *    ১. 'any' টাইপচেকিং সম্পূর্ণ বন্ধ করে দেয় এবং এটি ছোঁয়াচে, ফলে এরর রানটাইমে চলে যায়।
 *       JSON.parse() এর মতো অনেক বিল্ট-ইন ফাংশন নিজে থেকেই any ঢুকিয়ে দেয়।
 *    ২. 'unknown' হলো এর নিরাপদ বিকল্প: যেকোনো ডেটা গ্রহণ করে ঠিকই, কিন্তু টাইপ ন্যারো
 *       না করা পর্যন্ত কোনো প্রোপার্টি পড়তে দেয় না। বাইরের সব API রিকোয়েস্টে এটা ব্যবহার করি।
 *    ৩. 'never' মানে যা কখনো ঘটবে না। যে ফাংশন সবসময় এরর থ্রো করে সে never রিটার্ন করে,
 *       আর ইউনিয়ন সুইচ কেসে কোনো অপশন মিস হলো কি না তা নিশ্চিত করতে never কাজে লাগে।"
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: void আর never এর মধ্যে মূল পার্থক্য কী?
 *    👉 উত্তর: void মানে ফাংশনের কাজ শেষ হয়েছে কিন্তু কোনো দরকারি মান রিটার্ন করেনি (undefined)।
 *             আর never মানে ফাংশনটি স্বাভাবিকভাবে শেষই হতে পারবে না (throw করে বা Infinite loop)।
 *
 * 🔹 F2: unknown ভ্যারিয়েবলকে 'as User' দিয়ে কাস্ট করলে কী রিস্ক থাকে?
 *    👉 উত্তর: টাইপ কাস্টিং (as) রানটাইমে কোনো ডেটা ভ্যালিডেট করে না। ফেক ডেটা চুপচাপ সিস্টেমে
 *             ঢুকে পরে অন্য কন্ট্রোলারে গিয়ে রানটাইম ক্র্যাশ বাধাবে। সেফ পথ হলো Zod বা Type Guard।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I treat third-party API payloads, Stripe webhooks, and caught errors as 'unknown'
 *    and validate them before use. I also use 'never' in switch statements over order statuses
 *    so adding a new status forces me to handle it everywhere."
 *
 * 🇧🇩 বাংলা:
 *   "রিকোয়েস্ট বডি, স্ট্রাইপ ওয়েবহুক পে-লোড এবং catch-এর এররকে আমি 'unknown' ধরে ভ্যালিডেট করি।
 *    আর অর্ডার স্ট্যাটাসের সুইচ কেসে 'never' রাখি, যাতে নতুন স্ট্যাটাস এলে সব জায়গায় হ্যান্ডেল করতে বাধ্য হই।"
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. JSON.parse() ডিফল্টভাবে কী টাইপ রিটার্ন করে?
 * 2. unknown টাইপে কি সরাসরি .toUpperCase() কল করা যাবে?
 *
 * 💬 উত্তর:
 * 1. ডিফল্টভাবে any রিটার্ন করে।
 * 2. না, আগে typeof === "string" দিয়ে টাইপ ন্যারো করতে হবে।
 * ============================================================================
 */

console.log(
  "==================================================================",
);
console.log("🔥 RUNNING: Q02 - any vs unknown vs never");
console.log(
  "==================================================================\n",
);

// ----------------------------------------------------------------------------
// ১. any এর বিপদ বনাম unknown এর নিরাপত্তা
// ----------------------------------------------------------------------------
const rawJson = '{"userId": "usr_99", "amount": 1500}';

// বিপদ: JSON.parse সরাসরি any দেয়
const unsafeData: any = JSON.parse(rawJson);
// unsafeData.nonExistentMethod(); // ❌ কম্পাইলার পাস করবে, কিন্তু রানটাইমে ক্র্যাশ খাবে!

// সমাধান: সবসময় unknown এ গ্রহণ করে ভ্যালিডেট করা
const safePayload: unknown = JSON.parse(rawJson);

// safePayload.amount; // ❌ TS কম্পাইলার আটকে দিয়েছে: Object is of type 'unknown'!

if (
  typeof safePayload === "object" &&
  safePayload !== null &&
  "amount" in safePayload
) {
  const verified = safePayload as { userId: string; amount: number };
  console.log("✅ ১. unknown নিরাপদে ন্যারো করে ব্যবহার:", verified.amount);
}

// ----------------------------------------------------------------------------
// ২. Catch ব্লকে unknown হ্যান্ডলিং
// ----------------------------------------------------------------------------
try {
  throw new Error("🚨 ডেটাবেজ কানেকশন ড্রপ করেছে!");
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log("✅ ২. Catch ব্লকে Error টাইপ নিশ্চিত:", err.message);
  } else {
    console.log("অজানা এরর:", String(err));
  }
}

// ----------------------------------------------------------------------------
// ৩. never দিয়ে Exhaustive Switch Check
// ----------------------------------------------------------------------------
type PaymentGateway = "BKASH" | "NAGAD" | "STRIPE";

function routePayment(gateway: PaymentGateway): string {
  switch (gateway) {
    case "BKASH":
      return "Routing to bKash PGW...";
    case "NAGAD":
      return "Routing to Nagad PGW...";
    case "STRIPE":
      return "Routing to Stripe PGW...";
    default: {
      // 🛡️ যদি ভবিষ্যতে PaymentGateway তে "ROCKET" যোগ করেন কিন্তু এখানে ভুলে যান,
      // নিচের লাইন সাথে সাথে কম্পাইল এরর দিয়ে বিল্ড আটকে দেবে!
      const _unhandled: never = gateway;
      return _unhandled;
    }
  }
}

console.log(
  "✅ ৩. never দিয়ে পাহারা দেওয়া পেমেন্ট রাউট:",
  routePayment("BKASH"),
);

console.log(
  "\n💡 রিভিশন সামারি: বাউন্ডারিতে unknown, আর সুইচের সুরক্ষায় never!\n",
);
