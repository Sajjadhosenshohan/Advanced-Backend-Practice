/**
 * ============================================================================
 * 📌 Q17: Function Return Typing: Overloads vs Conditional Types 🔥
 * ============================================================================
 * 
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 সমস্যা                 ➔ একটি ফাংশনে ইনপুটের ধরনের ওপর ভিত্তি করে আউটপুটের টাইপ আলাদা হবে।
 *                             সাধারণ Union Return (`string | number`) লিখলে কলার সাইডে বারবার ইফ-এলস চেক লাগে।
 * 
 * 🔹 Function Overloads     ➔ ফাংশন ইমপ্লিমেন্টেশনের ওপরে এক বা একাধিক টাইপ সিগনেচার ডিফাইন করা।
 *                             ইনপুট ও আউটপুটের ১:১ ম্যাপিং তৈরি করে। সবচেয়ে পরিষ্কার ও পঠনযোগ্য।
 * 
 * 🔹 Generic Conditionals   ➔ `<T extends Format>` নিয়ে টারনারি টাইপ লজিক দিয়ে রিটার্ন টাইপ নির্ধারণ করা।
 * 
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • Function Overload-এর Implementation Signature কলারের কাছ থেকে লুকানো থাকে!
 *   • কলার শুধুমাত্র ওপরের ওভারলোড সিগনেচারগুলো দেখতে পায়। ওভারলোডে যা নেই তা পাস করলে এরর দেয়।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 Function Overloads বনাম Conditional Types (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬────────────────────────────────┬─────────────────────────────┐
 * │ বৈশিষ্ট্য                 │     Function Overloads 🏆      │   Generic Conditional Types │
 * ├───────────────────────────┼────────────────────────────────┼─────────────────────────────┤
 * │ পঠনযোগ্যতা (Readability)  │ 📖 অত্যন্ত পরিষ্কার ও সহজ      │ 🧩 কিছুটা জটিল মেটা-প্রোগ্রামিং│
 * │ ভিন্ন প্যারামিটার সংখ্যা   │ 🌟 অসাধারণ (প্যারামিটার কম-বেশি)│ 🐢 জটিল হয়ে পড়ে             │
 * │ ইউনিয়ন ইনপুট হ্যান্ডলিং  │ ⚠️ লাস্ট সিগনেচার বেছে নিতে পারে│ ⚡ ডিস্ট্রিবিউটিভ ইউনিয়ন সাপোর্ট│
 * │ ব্যবহারের ক্ষেত্র         │ নোড.জেএস ও লাইব্রেরি ফাংশন     │ টাইপ-লেভেল ফ্রেমওয়ার্ক পাইপলাইন│
 * └───────────────────────────┴────────────────────────────────┴─────────────────────────────┘
 * 
 * 📌 গোল্ডেন রুল:
 *   • বেশিরভাগ ব্যাকএন্ড ইউটিলিটিতে পরিষ্কার ও পঠনযোগ্য কোডের জন্য **Function Overloads** ব্যবহার করুন।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "When a function returns different types based on its inputs, we have two approaches:
 *    1. Function Overloads: Writing multiple type signatures above a single implementation.
 *       This is my preferred approach for clarity because it makes API contracts explicit and
 *       handles differing parameter counts elegantly.
 *    2. Generic Conditional Types: Using 'T extends Condition ? A : B'. This is powerful for
 *       type-level libraries, but can hurt code readability if overused for simple functions."
 * 
 * 🇧🇩 বাংলায়:
 *   "যখন ইনপুটের ওপর নির্ভর করে ফাংশনের রিটার্ন টাইপ ভিন্ন হয়, তখন দুটো পথ রয়েছে:
 *    ১. Function Overloads: মূল ইমপ্লিমেন্টেশনের ওপরে একাধিক স্পষ্ট টাইপ সিগনেচার লিখে দেওয়া।
 *       পঠনযোগ্যতার জন্য আমি এটি বেশি পছন্দ করি, কারণ এটি আর্গুমেন্টের ওপর ভিত্তি করে এক্সাক্ট
 *       রিটার্ন টাইপ দেয় এবং প্যারামিটার কম-বেশি হ্যান্ডেল করতে পারে।
 *    ২. Generic Conditional Types: 'T extends Condition ? A : B' টারনারি লজিক ব্যবহার করা।
 *       এটি লাইব্রেরিতে ডাইনামিক হলেও সাধারণ ফাংশনে ওভারলোডের মতো ক্লিন দেখায় না।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: বুলিয়ান ফ্ল্যাগের ভিত্তিতে রিটার্ন টাইপ পরিবর্তন কীভাবে হ্যান্ডেল করবেন?
 *    👉 উত্তর: `function getUser(id: string, full: true): Promise<FullUser>;`  
 *             `function getUser(id: string, full?: false): Promise<BasicUser>;`  
 *             ওভারলোডে লিটারাল `true` এবং `false` দিয়ে ১:১ ম্যাপিং করে নেওয়া যায়।
 * 
 * 🔹 F2: ওভারলোডে কয়টি ইমপ্লিমেন্টেশন বডি থাকতে পারে?
 *    👉 উত্তর: ঠিক একটি! শুধুমাত্র সবার নিচে থাকা মূল ফাংশনটিতে আসল জাভাস্ক্রিপ্ট কোড বডি থাকে।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I wrote overloaded repository methods like 'findUser(id, includeAudit: true)' to return
 *    detailed audit metadata only when explicitly requested, without forcing runtime checks on callers."
 * 
 * 🇧🇩 বাংলা:
 *   "আমি ডেটাবেজ রিপোজিটরিতে 'findUser(id, includeAudit: true)' মেথডে ওভারলোড ব্যবহার করেছি,
 *    যাতে অপশনাল অডিট হিস্ট্রি কল করার সাথে সাথে এক্সাক্ট টাইপ পাওয়া যায়।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. ওভারলোড সিগনেচারের নিচে কি সাথে সাথে সেমিকোলন (;) থাকে নাকি ফাংশন বডি থাকে?
 * 2. ইমপ্লিমেন্টেশন সিগনেচার কি কলার সরাসরি কল করতে পারে?
 * 
 * 💬 উত্তর:
 * 1. শুধু টাইপ সিগনেচার ও সেমিকোলন (;) থাকে, কোনো বডি থাকে না।
 * 2. না, কলারের কাছ থেকে এটি লুকানো থাকে।
 * ============================================================================
 */

console.log("==================================================================");
console.log("🔥 RUNNING: Q17 - Function Return Typing: Overloads vs Conditionals");
console.log("==================================================================\n");

interface BasicUser { id: string; name: string }
interface FullUserWithRoles extends BasicUser { roles: string[] }

// ১. ওভারলোড ১: includeRoles true হলে FullUserWithRoles
function fetchUser(id: string, includeRoles: true): FullUserWithRoles;
// ২. ওভারলোড ২: includeRoles না দিলে BasicUser
function fetchUser(id: string, includeRoles?: false): BasicUser;

// ৩. আসল ইমপ্লিমেন্টেশন বডি:
function fetchUser(id: string, includeRoles: boolean = false): BasicUser | FullUserWithRoles {
  if (includeRoles) {
    return { id, name: "Shohan", roles: ["ADMIN", "DEV"] };
  }
  return { id, name: "Shohan" };
}

// টেস্ট ১: true দেওয়ায় TS জানে roles অ্যারে আছে:
const fullUser = fetchUser("u-1", true);
console.log("✅ ১. Overload Full User roles:", fullUser.roles.join(", "));

// টেস্ট ২: আর্গুমেন্ট না দেওয়ায় TS জানে এটি BasicUser:
const basicUser = fetchUser("u-1");
console.log("✅ ২. Overload Basic User name:", basicUser.name);

console.log("\n💡 রিভিশন সামারি: ক্লিন API কন্ট্রাক্ট ডিজাইনে Function Overloads সেরা!\n");
