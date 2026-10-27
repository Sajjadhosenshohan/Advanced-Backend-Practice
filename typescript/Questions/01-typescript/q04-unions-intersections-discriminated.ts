/**
 * ============================================================================
 * 📌 Q04: Union, Intersection, and Discriminated Unions ⭐
 * ============================================================================
 * 
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 Union (`|` = OR / বা)         ➔ মানটি টাইপ A অথবা টাইপ B এর যেকোনো একটি মেনে চলবে।
 * 
 * 🔹 Intersection (`&` = AND / এবং) ➔ মানটিতে টাইপ A এবং টাইপ B উভয়ের সব প্রোপার্টি থাকতে হবে।
 * 
 * 🔹 Discriminated Union           ➔ ব্যাকএন্ডের সবচেয়ে শক্তিশালী আর্কিটেকচার প্যাটার্ন!
 *                                     একাধিক অবজেক্টের ইউনিয়ন, যাদের সবার মধ্যে একটি কমন
 *                                     লিটারাল ফিল্ড (যেমন: `status: "SUCCESS" | "FAILED"`) থাকে।
 * 
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • সাধারণ Union-এ শুধু কমন ফিল্ড এক্সেস করা যায়।
 *   • কিন্তু Discriminated Union-এ `if (res.status === "SUCCESS")` চেক করার সাথে সাথেই
 *     টাইপস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে ভেতরের এক্সক্লুসিভ ডেটা (যেমন: `res.data`) উন্মুক্ত করে দেয়।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 কখন কোনটা ব্যবহার করবেন? (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬──────────────────┬──────────────────┬────────────────────────┐
 * │ বৈশিষ্ট্য (Feature)       │   Union (`|`)    │ Intersection (`&`)│  Discriminated Union   │
 * ├───────────────────────────┼──────────────────┼──────────────────┼────────────────────────┤
 * │ সম্পর্ক (Relationship)   │ যেকোনো একটি     │ উভয়ের সবগুলো    │ ট্যাগ করা বিকল্পসমূহ   │
 * │ প্রোপার্টি এক্সেস        │ শুধু কমন ফিল্ড   │ সব ফিল্ড         │ ট্যাগ চেক করার পর সব   │
 * │ প্রজেক্টে ব্যবহার         │ স্ট্যাটাস/মেথড   │ DTO কম্বাইন করা  │ API রেসপন্স ও Webhook  │
 * └───────────────────────────┴──────────────────┴──────────────────┴────────────────────────┘
 * 
 * 📌 গোল্ডেন রুল:
 *   • API রেসপন্স, স্টেট মেশিন ও ওয়েবহুক ইভেন্ট হ্যান্ডল করতে সবসময় **Discriminated Union** ব্যবহার করুন।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "Unions and Intersections represent logical OR and AND in TypeScript:
 *    1. A Union (A | B) allows a value to be either type, while an Intersection (A & B) combines
 *       all properties from both types into a single contract.
 *    2. A Discriminated Union is a pattern where multiple object types in a union share a common
 *       literal property (a discriminator like 'status' or 'type'). By checking that tag,
 *       TypeScript automatically narrows the union, eliminating invalid state representations."
 * 
 * 🇧🇩 বাংলায়:
 *   "ইউনিয়ন এবং ইন্টারসেকশন হলো টাইপস্ক্রিপ্টের লজিক্যাল OR এবং AND:
 *    ১. ইউনিয়ন (A | B) মানে মানটি যেকোনো একটি টাইপ হতে পারে, আর ইন্টারসেকশন (A & B) মানে
 *       উভয় টাইপের সব ফিল্ড একসাথে থাকতে হবে।
 *    ২. Discriminated Union হলো এমন এক প্যাটার্ন যেখানে ইউনিয়নের প্রতিটি অবজেক্টে একটি কমন
 *       লিটারাল ফিল্ড (যেমন: 'status') থাকে। ওই স্ট্যাটাস চেক করার সাথে সাথে টাইপস্ক্রিপ্ট নিখুঁতভাবে
 *       টাইপ ন্যারো করে দেয়, ফলে ভুল প্রোপার্টি এক্সেসের বাগ রানটাইমে কখনোই ঘটতে পারে না।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: Discriminated Union হওয়ার ৩টি আবশ্যিক শর্ত কী?
 *    👉 উত্তর: ১. একাধিক অবজেক্টের Union হতে হবে।
 *             ২. সবার মধ্যে একই নামের একটি কমন ফিল্ড থাকতে হবে (যেমন: 'status' বা 'type')।
 *             ৩. ওই ফিল্ডের টাইপ সাধারণ string হলে চলবে না, Literal ("PAID", "FAILED") হতে হবে।
 * 
 * 🔹 F2: Intersection টাইপে একই ফিল্ডে টাইপ কনফ্লিক্ট হলে (id: string & id: number) কী হয়?
 *    👉 উত্তর: তখন ওই ফিল্ডের টাইপ হয়ে যায় `never`! কারণ কোনো মান একই সাথে string ও number হতে পারে না।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I model Stripe webhook events and API Result types as Discriminated Unions:
 *    { status: 'SUCCESS'; data: T } | { status: 'ERROR'; error: string } to guarantee
 *    that nobody reads 'data' when an error actually occurred."
 * 
 * 🇧🇩 বাংলা:
 *   "আমার ব্যাকএন্ড প্রজেক্টে API রেসপন্স ও স্ট্রাইপ ওয়েবহুক ইভেন্ট আমি Discriminated Union দিয়ে
 *    মডেল করি, যাতে এরর ঘটলে কেউ ভুল করেও 'data' পড়ার চেষ্টা করে ক্র্যাশ না করায়।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. type Status = { status: string; data: any } কি Discriminated Union?
 * 2. কেন না?
 * 
 * 💬 উত্তর:
 * 1. না, এটা Discriminated Union নয়।
 * 2. কারণ 'status' সাধারণ string, কোনো নির্দিষ্ট লিটারাল ("SUCCESS" | "FAILED") নয়।
 * ============================================================================
 */

console.log("==================================================================");
console.log("🔥 RUNNING: Q04 - Unions, Intersections & Discriminated Unions");
console.log("==================================================================\n");

// ----------------------------------------------------------------------------
// ১. Discriminated Union (API Result Pattern)
// ----------------------------------------------------------------------------
type ApiResult =
  | { status: "SUCCESS"; data: { balance: number } }
  | { status: "ERROR"; errorCode: number; message: string };

function renderApiResponse(res: ApiResult): string {
  // res.data; ❌ Error: কারণ ERROR স্টেটে data ফিল্ড থাকে না!

  if (res.status === "SUCCESS") {
    // 🪄 TS নিশ্চিত যে এটি সাকসেস স্টেট:
    return `🎉 Success! Account Balance: $${res.data.balance}`;
  } else {
    // 🪄 TS নিশ্চিত যে এটি এরর স্টেট:
    return `❌ Error ${res.errorCode}: ${res.message}`;
  }
}

console.log("✅ ১. Discriminated Union:", renderApiResponse({ status: "SUCCESS", data: { balance: 9500 } }));


// ----------------------------------------------------------------------------
// ২. Intersection (&) অবজেক্ট কম্বাইন করা
// ----------------------------------------------------------------------------
type Timestamps = { createdAt: Date; updatedAt: Date };
type UserProfile = { id: string; username: string };

type FullUserEntity = UserProfile & Timestamps;

const entity: FullUserEntity = {
  id: "usr_007",
  username: "shohan_dev",
  createdAt: new Date(),
  updatedAt: new Date(),
};
console.log("✅ ২. Intersection (&) Entity:", entity.username, entity.createdAt.toISOString());

console.log("\n💡 রিভিশন সামারি: স্টেট বা রেজাল্ট হ্যান্ডলিংয়ে Discriminated Union সেরা!\n");
