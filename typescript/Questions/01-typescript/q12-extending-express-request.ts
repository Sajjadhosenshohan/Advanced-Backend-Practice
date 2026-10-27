/**
 * ============================================================================
 * 📌 Q12: How do you extend Express Request type? 💎 (Backend Core)
 * ============================================================================
 *
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 সমস্যা                 ➔ JWT মিডলওয়্যারে আমরা যখন `req.user = decoded;` লিখি, তখন TS
 *                             চিল্লায়: "Property 'user' does not exist on type 'Request'".
 *
 * 🔹 সমাধান (পদ্ধতি ১)      ➔ Global Declaration Merging (সবার প্রিয় স্ট্যান্ডার্ড)।
 *                             `src/@types/express/index.d.ts` ফাইলে `Express.Request` এর ভেতর
 *                             `user?: AuthUser` মার্জ করে দেওয়া।
 *
 * 🔹 সমাধান (পদ্ধতি ২)      ➔ কাস্টম ইন্টারফেস: `interface AuthRequest extends Request { user: AuthUser }`।
 *
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • ഗ্লোবাল ডিক্লেয়ারেশনে `user` সবসময় অপশনাল (`user?`) রাখা উচিত!
 *   • কারণ আপনার অ্যাপে `/login` বা `/register` পাবলিক রাউটেও একই Request অবজেক্ট যায়,
 *     যেখানে কোনো ইউজার লগইন থাকে না।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 পদ্ধতি ১ বনাম পদ্ধতি ২ (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬────────────────────────────────┬─────────────────────────────┐
 * │ বৈশিষ্ট্য                 │ Global Declaration Merging 🏆  │ Custom Interface            │
 * ├───────────────────────────┼────────────────────────────────┼─────────────────────────────┤
 * │ কোডে ব্যবহার              │ সাধারণ `Request` লিখলেই হয়     │ প্রতি রাউটে `AuthRequest` লাগে│
 * │ প্রজেক্ট স্কোপ            │ পুরো অ্যাপ্লিকেশনে অটোমেটিক   │ শুধুমাত্র যেখানে ইমপোর্ট করা হয়│
 * │ req.user বাধ্যতামূলক?    │ না, অপশনাল (`user?`) রাখা ভালো │ হ্যাঁ, বাধ্যতামূলক করা যায়   │
 * └───────────────────────────┴────────────────────────────────┴─────────────────────────────┘
 *
 * 📌 গোল্ডেন রুল:
 *   • প্রোডাকশন ব্যাকএন্ডে **Declaration Merging** স্ট্যান্ডার্ড ব্যবহার করুন।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I extend the Express Request type using Declaration Merging in a global declaration file:
 *    1. In 'src/@types/express/index.d.ts', I augment the Express namespace and add 'user?: AuthUser'
 *       and 'requestId?: string' to the Request interface.
 *    2. I keep 'user' optional because public endpoints like /login also use the Request type without
 *       an authenticated user. Then I ensure 'typeRoots' in tsconfig.json includes my types directory."
 *
 * 🇧🇩 বাংলায়:
 *   "আমি গ্লোবাল ডিক্লেয়ারেশন ফাইলে ডিক্লেয়ারেশন মার্জিং (Declaration Merging) ব্যবহার করে এটি করি:
 *    ১. 'src/@types/express/index.d.ts' ফাইলে Express নেমস্পেস অগমেন্ট করে Request ইন্টারফেসে
 *       'user?: AuthUser' এবং ট্রেসিংয়ের জন্য 'requestId?: string' যুক্ত করি।
 *    ২. ইউজারকে সবসময় অপশনাল রাখি, কারণ /login এর মতো পাবলিক রাউটেও একই Request ব্যবহৃত হয়।
 *       এরপর tsconfig.json এর typeRoots এ এই ডিরেক্টরি ইনক্লুড করে দিলেই কাজ করে।"
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: .d.ts ফাইলে import লিখলে declare global কেন লিখতে হয়?
 *    👉 উত্তর: ফাইলে import বা export লিখলে টাইপস্ক্রিপ্ট সেটিকে মডিউল হিসেবে গণ্য করে।
 *             তখন গ্লোবাল নেমস্পেস এক্সেস করতে `declare global { ... }` ব্লকে লিখতে হয়।
 *
 * 🔹 F2: tsconfig.json এ কী কনফিগারেশন মিস হলে এই টাইপ কাজ করে না?
 *    👉 উত্তর: `"typeRoots": ["./node_modules/@types", "./src/@types"]` পাথ ডিফাইন না থাকলে।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I augmented the Express Request interface with 'user?: DecodedToken' and 'requestId?: string'
 *    to enable fully typed authentication contexts and distributed tracing across all controllers."
 *
 * 🇧🇩 বাংলা:
 *   "আমি এক্সপ্রেস Request ইন্টারফেসে 'user?: DecodedToken' এবং 'requestId?: string' ইনজেক্ট করেছি,
 *    যাতে সব কন্ট্রোলারে টাইপসেফ অথেন্টিকেশন ও রিকোয়েস্ট ট্রেসিং পাওয়া যায়।"
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. req.user কেন সবসময় অপশনাল (?) রাখা ভালো?
 * 2. কোন ধরনের টাইপ ডিক্লেয়ারেশনে স্বয়ংক্রিয় মার্জিং সাপোর্ট করে?
 *
 * 💬 উত্তর:
 * 1. পাবলিক রাউটে অথেন্টিকেশন থাকে না বলে।
 * 2. `interface` এবং `namespace`।
 * ============================================================================
 */

console.log(
  "==================================================================",
);
console.log("🔥 RUNNING: Q12 - Extending Express Request Type");
console.log(
  "==================================================================\n",
);

// ১. অথেন্টিকেটেড ইউজারের শেপ:
interface AuthenticatedUser {
  id: string;
  role: "ADMIN" | "USER";
  tenantId: string;
}

// ২. গ্লোবাল ডিক্লেয়ারেশন মার্জিং ডেমো:
// declare global {
//   namespace Express {
//     interface Request {
//       user?: AuthenticatedUser;
//       requestId?: string;
//     }
//   }
// }

// ৩. সিমুলেটেড এক্সপ্রেস হ্যান্ডলার:
const mockReq: any = {};

// মিডলওয়্যারে ইউজার এসাইন:
mockReq.user = { id: "usr_99", role: "ADMIN", tenantId: "tenant_alpha" };
mockReq.requestId = "req_trace_12345";

console.log(
  "✅ ১. Extended Request User:",
  mockReq.user.id,
  `(${mockReq.user.role})`,
);
console.log("✅ ২. Extended Request Trace ID:", mockReq.requestId);

console.log(
  "\n💡 রিভিশন সামারি: @types ফাইলে interface Request এর ভেতর user? যোগ করুন!\n",
);
