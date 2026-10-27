/**
 * ============================================================================
 * 📌 Q05: What is Type Narrowing? Custom Type Guards
 * ============================================================================
 * 
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 Type Narrowing        ➔ কোনো বিস্তৃত বা অস্পষ্ট টাইপ (যেমন: `string | number` বা `unknown`)
 *                             থেকে কোডের লজিক্যাল চেকের মাধ্যমে সুনির্দিষ্ট টাইপে নেমে আসার প্রক্রিয়া।
 * 
 * 🔹 Built-in Guards       ➔ `typeof`, `instanceof`, `in`, `Array.isArray()`।
 * 
 * 🔹 Custom Type Guard     ➔ নিজের বানানো স্পেশাল স্ক্যানার ফাংশন যার রিটার্ন টাইপে থাকে
 *                             `param is SpecificType`। ফাংশন true রিটার্ন করলে TS অবজেক্টটিকে ওই টাইপ মানে।
 * 
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • Custom Type Guard এ টাইপস্ক্রিপ্ট আপনার রিটার্ন প্রেডিকেটকে অন্ধের মতো বিশ্বাস করে।
 *   • আপনি যদি ফাংশনে ভুল লজিক লিখে `return true` দিয়ে দেন, তবে TS ভুল টাইপ ধরে রানটাইমে ক্র্যাশ করবে!
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 কখন কোনটা ব্যবহার করবেন? (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬──────────────────┬──────────────────┬────────────────────────┐
 * │ Type Guard ধরন            │      সিনট্যাক্স   │   কোথায় ব্যবহার? │      সীমাবদ্ধতা        │
 * ├───────────────────────────┼──────────────────┼──────────────────┼────────────────────────┤
 * │ typeof                    │ typeof x === 's' │ প্রিমিটিভ টাইপে   │ অবজেক্টের শেপ চিনে না  │
 * │ instanceof                │ err instanceof E │ ক্লাস বা এররে    │ প্লেইন অবজেক্ট চিনে না│
 * │ in operator               │ 'id' in obj      │ অবজেক্ট প্রোপার্টি│ টাইপ স্পষ্ট করে না    │
 * │ Custom Guard (`is`)       │ val is CustomDTO │ জটিল ব্যাকএন্ড ডেটা│ নিখুঁত লজিক লিখতে হয়  │
 * └───────────────────────────┴──────────────────┴──────────────────┴────────────────────────┘
 * 
 * 📌 গোল্ডেন রুল:
 *   • সাধারণ প্রিমিটিভে `typeof` এবং এররে `instanceof` ব্যবহার করুন।
 *   • আর জটিল API এরর বা অবজেক্ট ভ্যালিডেশনে `arg is Type` কাস্টম গার্ড বানান।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "Type narrowing is the process where TypeScript refines a broad type into a specific one:
 *    1. It uses built-in JavaScript checks like 'typeof', 'instanceof', and the 'in' operator
 *       within conditional branches.
 *    2. For domain-specific objects or unknown error payloads, we create User-Defined Type Guards
 *       using type predicates like 'arg is TargetType'. If the guard returns true, TypeScript
 *       safely narrows the value in that block without manual casting."
 * 
 * 🇧🇩 বাংলায়:
 *   "টাইপ ন্যারোয়িং হলো কোনো বড় বা অস্পষ্ট টাইপকে কন্ডিশনাল চেকের মাধ্যমে সুনির্দিষ্ট টাইপে নামিয়ে আনা:
 *    ১. এটি জাভাস্ক্রিপ্টের বিল্ট-ইন 'typeof', 'instanceof', এবং 'in' অপারেটর ব্যবহার করে
 *       ইফ-এলস ব্লকে স্বয়ংক্রিয়ভাবে টাইপ ফিল্টার করে।
 *    ২. আর কাস্টম অবজেক্ট বা এরর অবজেক্ট নিশ্চিত করতে আমরা কাস্টম টাইপ গার্ড লিখি যার রিটার্ন
 *       টাইপ থাকে 'arg is TargetType'। ফাংশন ট্রু রিটার্ন করলে টাইপস্ক্রিপ্ট কোনো জোরজবরদস্তি
 *       বা 'as' কাস্টিং ছাড়াই টাইপ-সেফ কোড এক্সেস করতে দেয়।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: Array থেকে null/undefined সরাতে Custom Type Guard কীভাবে কাজে লাগে?
 *    👉 উত্তর: সাধারণ arr.filter(Boolean) করলে টাইপ কিন্তু (string | null)[] ই থেকে যায়।
 *             কিন্তু `(x): x is string => x !== null` গার্ড দিলে টাইপ ক্লিন string[] হয়ে যায়।
 * 
 * 🔹 F2: Assertion Functions (`asserts condition`) এর কাজ কী?
 *    👉 উত্তর: এরা কোনো মান রিটার্ন করে না; শর্ত মিথ্যা হলে এরর থ্রো করে। একবার ফাংশন পার হয়ে গেলে
 *             কম্পাইলার নিশ্চিত হয়ে যায় যে ভ্যারিয়েবলটি নাল বা আনডিফাইন্ড নয়।
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I built a centralized Express error handler using a custom guard 'isOperationalError(err): err is AppError'
 *    to distinguish handled business exceptions from unexpected server crashes."
 * 
 * 🇧🇩 বাংলা:
 *   "আমার Express ব্যাকএন্ডে সেন্ট্রাল এরর হ্যান্ডলারে আমি কাস্টম টাইপ গার্ড 'isAppError(err): err is AppError'
 *    ব্যবহার করেছি, যাতে জানা বিজনেস এক্সেপশন ও অপ্রত্যাশিত সিস্টেম ক্র্যাশ আলাদা করা যায়।"
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. কাস্টম টাইপ গার্ড ফাংশনের রিটার্ন টাইপ boolean এর বদলে কী লিখতে হয়?
 * 2. instanceof দিয়ে কি কোনো TypeScript interface চেক করা যায়?
 * 
 * 💬 উত্তর:
 * 1. লিখতে হয়: `parameterName is SpecificType`।
 * 2. না! কারণ interface রানটাইমে মুছে যায় (Type Erasure), শুধু Class চেক করা যায়।
 * ============================================================================
 */

console.log("==================================================================");
console.log("🔥 RUNNING: Q05 - Type Narrowing & Custom Type Guards");
console.log("==================================================================\n");

// ----------------------------------------------------------------------------
// ১. কাস্টম টাইপ গার্ড (Custom Error Guard)
// ----------------------------------------------------------------------------
interface AppOperationalError {
  statusCode: number;
  message: string;
  isOperational: true;
}

// Custom Guard:
function isAppError(err: unknown): err is AppOperationalError {
  return (
    typeof err === "object" &&
    err !== null &&
    "statusCode" in err &&
    "isOperational" in err
  );
}

const mockErr: unknown = {
  statusCode: 404,
  message: "Resource not found in DB",
  isOperational: true,
};

if (isAppError(mockErr)) {
  console.log("✅ ১. Custom Guard সফলভাবে টাইপ ন্যারো করেছে:", mockErr.statusCode, mockErr.message);
}


// ----------------------------------------------------------------------------
// ২. Array Filtering এ Type Guard এর ম্যাজিক
// ----------------------------------------------------------------------------
const mixedList: (string | null | undefined)[] = ["user-1", null, "user-2", undefined];

function isDefined<T>(val: T): val is NonNullable<T> {
  return val !== null && val !== undefined;
}

// টাইপ এখন ক্লিন string[]:
const verifiedIds: string[] = mixedList.filter(isDefined);
console.log("✅ ২. ফিল্টারড নন-নাল অ্যারে:", verifiedIds);

console.log("\n💡 রিভিশন সামারি: বিল্ট-ইনে typeof/instanceof, আর কাস্টমে 'arg is Type'!\n");
