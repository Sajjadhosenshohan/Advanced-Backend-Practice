/**
 * ============================================================================
 * 📌 Q16: What are Branded Types in TypeScript? Use Case 🔥 (Senior Level)
 * ============================================================================
 * 
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 Branded Types (বা Nominal Types) ➔ প্রিমিটিভ টাইপের সাথে কম্পাইল টাইমের একটি
 *                                       অদৃশ্য সিলগালা বা ব্র্যান্ড ট্যাগ জুড়ে দিয়ে তাকে
 *                                       ইউনিক ও নন-অ্যাসাইনেবল টাইপে রূপান্তর করার আর্কিটেকচার।
 * 
 * 🔹 কেন দরকার?                        ➔ টাইপস্ক্রিপ্টে `UserId = string` আর `OrderId = string`
 *                                       দুটোই সাধারণ string। ভুল করে অর্ডারের জায়গায় ইউজারের
 *                                       আইডি ঢুকিয়ে দিলেও কম্পাইলার ধরতে পারে না।
 * 
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • Branded Type রানটাইমে জাভাস্ক্রিপ্ট অবজেক্টে কোনো আসল ফিল্ড তৈরি করে না!
 *   • `declare const __brand: unique symbol;` ব্যবহার করায় এটি কেবল কম্পাইল-টাইম মেমোরিতে থাকে।
 *     রানটাইমে জিরো মেমোরি খরচ!
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 সাধারণ প্রিমিটিভ বনাম Branded Types (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬────────────────────────────────┬─────────────────────────────┐
 * │ বৈশিষ্ট্য                 │   সাধারণ Type Alias (type Id)  │    Branded Type (Brand<T, B>)🏆│
 * ├───────────────────────────┼────────────────────────────────┼─────────────────────────────┤
 * │ টাইপিং সিস্টেম            │ Structural (দুটোই সাধারণ string)│ Nominal (ইউনিক ব্র্যান্ড সিল) │
 * │ ভুল আর্গুমেন্টে অদলবদল    │ ⚠️ কোনো এরর দেয় না (বিপদজনক!) │ 🛡️ কম্পাইল টাইমে আটকে দেয়    │
 * │ রানটাইম ওভারহেড           │ জিরো                           │ জিরো (Zero Runtime Cost)    │
 * │ ব্যবহার                   │ সাধারণ টাইপিং                  │ ফাইন্যান্স/কারেন্সি ও Entity ID│
 * └───────────────────────────┴────────────────────────────────┴─────────────────────────────┘
 * 
 * 📌 গোল্ডেন রুল:
 *   • টাকা-পয়সার কারেন্সি (USD vs BDT) এবং বিভিন্ন টেবিলের Primary Key আলাদা রাখতে **Branded Types** ব্যবহার করুন।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "Branded types (or opaque types) simulate nominal typing on top of TypeScript's structural system:
 *    1. By intersecting a primitive like 'string' with a unique brand symbol '{ readonly [__brand]: 'UserId' }',
 *       we create distinct types that cannot be accidentally interchanged, even though both are strings underneath.
 *    2. I use this pattern extensively for database primary keys (UserId vs OrderId) and financial units
 *       (USD vs EUR) to eliminate silent parameter swap bugs with zero runtime overhead."
 * 
 * 🇧🇩 বাংলায়:
 *   "Branded Types হলো টাইপস্ক্রিপ্টের স্ট্রাকচারাল সিস্টেমের ওপর নমিনাল টাইপিংয়ের সুরক্ষাকবচ:
 *    ১. একটি প্রিমিটিভ টাইপকে (যেমন string) একটি ইউনিক ব্র্যান্ড সিম্বলের সাথে ইন্টারসেক্ট করে
 *       আমরা এমন এক টাইপ বানাই যা অন্য কোনো সাধারণ স্ট্রিংয়ের সাথে ভুলবশত মিশিয়ে ফেলা অসম্ভব।
 *    ২. আমি এটি মূলত বিভিন্ন টেবিলের আইডি (UserId বনাম OrderId) এবং আর্থিক কারেন্সি (USD বনাম BDT)
 *       আলাদা রাখতে ব্যবহার করি, যাতে ভুল আর্গুমেন্ট পাস করার মারাত্মক বাগ কম্পাইল টাইমে ধরা পড়ে।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: Branded Type কি রানটাইমে জাভাস্ক্রিপ্টে কোনো প্রোপার্টি যোগ করে?
 *    👉 উত্তর: না! unique symbol শুধুমাত্র টাইপস্ক্রিপ্ট কম্পাইলারের মাথায় থাকে।
 *             জাভাস্ক্রিপ্ট কোডে এটি সাধারণ string বা number হিসেবেই রান হয়।
 * 
 * 🔹 F2: Zod দিয়ে কি Branded Type তৈরি করা যায়?
 *    👉 উত্তর: হ্যাঁ! Zod এ সরাসরি মেথড আছে: `z.string().uuid().brand<"UserId">()`।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "In our payment service, I created 'UsdCents' and 'BdtPoisha' branded types so developers
 *    cannot accidentally pass different currency amounts into the Stripe charging pipeline."
 * 
 * 🇧🇩 বাংলা:
 *   "আমাদের পেমেন্ট সার্ভিসে আমি 'UsdCents' এবং 'BdtPoisha' ব্র্যান্ডেড টাইপ তৈরি করেছি,
 *    যাতে কোনো ডেভেলপার অসাবধানতাবশত স্ট্রাইপ গেটওয়েতে ভুল কারেন্সির টাকা পাস করতে না পারে।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. type A = string & { __brand: "A" }; type B = string & { __brand: "B" };
 *    let x: A = "test" as B; কি কম্পাইল হবে?
 * 2. কেন না?
 * 
 * 💬 উত্তর:
 * 1. না, কম্পাইলার এরর দেবে।
 * 2. কারণ __brand ট্যাগ আলাদা হওয়ায় তারা একে অপরের সাথে অ্যাসাইনেবল নয়।
 * ============================================================================
 */

console.log("==================================================================");
console.log("🔥 RUNNING: Q16 - Branded Types (Nominal Safety)");
console.log("==================================================================\n");

// ১. Branded Type হেল্পার:
declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

// কনস্ট্রাক্টর ফাংশন:
function makeUserId(id: string): UserId { return id as UserId; }
function makeOrderId(id: string): OrderId { return id as OrderId; }

function deleteOrder(user: UserId, order: OrderId) {
  console.log(`✅ [Database] Order ${order} deleted by User ${user}`);
}

const validUser = makeUserId("usr_101");
const validOrder = makeOrderId("ord_999");

deleteOrder(validUser, validOrder);

// ভুল অর্ডারে দিলে TS লাল দাগ দিয়ে আটকে দেবে:
// deleteOrder(validOrder, validUser); ❌ Compile Error!

console.log("\n💡 রিভিশন সামারি: ভুল আইডি অদল-বদল রুখতে Branded Types সেরা!\n");
