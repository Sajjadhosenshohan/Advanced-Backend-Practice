/**
 * ============================================================================
 * 📌 Q01: type vs interface ⭐
 * ============================================================================
 *
 * 💡 মূল ধারণা (Core Concept)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 interface ➔ অবজেক্ট ও ক্লাসের শেপ ডিফাইন করার চুক্তি (Contract)।
 *                সুপারপাওয়ার: Declaration Merging (একই নামের ইন্টারফেস একা-একা জোড়া লেগে যায়)।
 *
 * 🔹 type      ➔ যেকোনো ডেটা টাইপের একটি ডাকনাম বা Alias।
 *                সুপারপাওয়ার: Union ("A" | "B"), Tuple, Primitive, Function সব কিছু বানাতে পারে।
 *
 * ⚠️ একটা গোপন ফাঁদ (Hidden Trap):
 *   • interface কখনো সরাসরি Union বানাতে পারে না (`interface X = A | B` ❌)।
 *   • type একই নামে দুবার লিখলে কম্পাইল এরর দেয় (`Duplicate identifier` ❌)।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 📊 কখন কোনটা ব্যবহার করবেন? (Comparison Table)
 * ────────────────────────────────────────────────────────────────────────────
 * ┌───────────────────────────┬──────────────────┬───────────────────────────┐
 * │ ব্যবহারের ক্ষেত্র         │    interface     │           type            │
 * ├───────────────────────────┼──────────────────┼───────────────────────────┤
 * │ Objects & OOP Classes     │ 🏆 সেরা পছন্দ    │ সম্ভব (& Intersection দিয়ে)│
 * │ Declaration Merging       │ ✅ হ্যাঁ (অটোমেটিক)│ ❌ না (ডুপ্লিকেট এরর দেয়)  │
 * │ Union, Tuple, Primitives  │ ❌ অসম্ভব        │ 🏆 একমাত্র উপায়          │
 * │ Compiler Caching          │ ⚡ সুপার ফাস্ট   │ 🐢 জটিল টাইপে কিছুটা ভারি  │
 * └───────────────────────────┴──────────────────┴───────────────────────────┘
 *
 * 📌 গোল্ডেন রুল:
 *   • অবজেক্ট ও পাবলিক লাইব্রেরি API বানাতে ➔ interface
 *   • ইউনিয়ন, টাপল বা ডেটা ট্রান্সফর্মেশনে  ➔ type
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🗣️ Interview-তে যেভাবে গুছিয়ে বলবেন (Standard Answer)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "Both define contracts, but they serve different strengths:
 *    1. I use 'interface' for object shapes, class contracts, and public APIs
 *       because it supports declaration merging and caches better in the compiler.
 *    2. I use 'type' for unions, primitives, tuples, and complex transformations
 *       where interface simply cannot work.
 *    Bottom line: interface for extensible objects, and type for unions & domain models."
 *
 * 🇧🇩 বাংলায়:
 *   "দুটোই অবজেক্টের গঠন ডিফাইন করতে পারে, তবে ব্যবহারের ক্ষেত্র আলাদা:
 *    ১. অবজেক্ট শেপ, ক্লাস কন্ট্রাক্ট আর এক্সটেন্ডেবল কোডের জন্য আমি 'interface' ব্যবহার করি,
 *       কারণ এতে ডিক্লেয়ারেশন মার্জিং কাজ করে এবং কম্পাইলার পারফরম্যান্স ভালো দেয়।
 *    ২. আর ইউনিয়ন ('ADMIN' | 'USER'), টাপল ও প্রমিজ ম্যাপিংয়ের জন্য 'type' ব্যবহার করি,
 *       কারণ ইন্টারফেসে এগুলো করা অসম্ভব।
 *    সহজ কথায়: অবজেক্ট ও লাইব্রেরির জন্য interface, বাকি সব কিছুর জন্য type।"
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ❓ মোস্ট কমন ২টি ফলো-আপ প্রশ্ন (Follow-up Q&A)
 * ────────────────────────────────────────────────────────────────────────────
 * 🔹 F1: interface কি কোনো type কে extend করতে পারে?
 *    👉 উত্তর: হ্যাঁ, পারে—যদি type-টি সাধারণ অবজেক্ট শেপ হয়।
 *             কিন্তু type যদি Union ("A" | "B") হয়, তবে interface তাকে extend করতে পারে না।
 *
 * 🔹 F2: Declaration Merging প্রজেক্টে কোথায় বাস্তব কাজে লাগে?
 *    👉 উত্তর: Express.js-এর Request অবজেক্টে `req.user` বা `req.tenantId` ইনজেক্ট করার সময়।
 *             মূল লাইব্রেরির কোড না ছুঁয়েও একই নামের interface লিখে টাইপ এক্সটেন্ড করা যায়।
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🏢 প্রজেক্টে কীভাবে ব্যবহার করেছেন (Project Line)
 * ────────────────────────────────────────────────────────────────────────────
 * 🇬🇧 English:
 *   "I use interface for DB models and repository contracts so they remain extensible,
 *    and type for API DTOs, Zod inferred schemas, and status unions like 'PENDING' | 'PAID'."
 *
 * 🇧🇩 বাংলা:
 *   "ডেটাবেজ মডেল আর রিপোজিটরি সার্ভিসের জন্য আমি interface রাখি যেন সহজে এক্সটেন্ড করা যায়,
 *    আর API রিকোয়েস্ট DTO, Zod স্কিমা এবং স্ট্যাটাস ইউনিয়নের জন্য type ব্যবহার করি।"
 *
 * ────────────────────────────────────────────────────────────────────────────
 * 🧪 সেলফ-টেস্ট (Self-Test)
 * ────────────────────────────────────────────────────────────────────────────
 * 1. interface দিয়ে কি সরাসরি Union টাইপ বানানো যায়?
 * 2. একই ফাইলে দুবার একই নামের type লিখলে কী ঘটবে?
 *
 * 💬 উত্তর:
 * 1. না, interface শুধু অবজেক্ট শেপের জন্য তৈরি।
 * 2. কম্পাইলার 'Duplicate identifier' এরর দিয়ে বিল্ড আটকে দেবে।
 * ============================================================================
 */

console.log(
  "==================================================================",
);
console.log("🔥 RUNNING: Q01 - type vs interface");
console.log(
  "==================================================================\n",
);

// ----------------------------------------------------------------------------
// ১. Declaration Merging (যা শুধু interface পারে)
// ----------------------------------------------------------------------------
interface User {
  id: string;
  name: string;
}

// একই নামে পুনরায় ডিক্লেয়ার করায় পূর্বেরটির সাথে অটো মার্জ হয়েছে:
interface User {
  role: "ADMIN" | "USER";
}

const currentUser: User = {
  id: "usr_101",
  name: "Sajjad Shohan",
  role: "ADMIN",
};
console.log("✅ ১. Interface Declaration Merging:", currentUser);

// ----------------------------------------------------------------------------
// ২. Unions & Tuples (যা শুধু type পারে)
// ----------------------------------------------------------------------------
type PaymentMethod = "BKASH" | "NAGAD" | "CARD";
type Coordinates = [latitude: number, longitude: number];

const myPayment: PaymentMethod = "BKASH";
const dhakaLocation: Coordinates = [23.8103, 90.4125];

console.log("✅ ২. Type Alias দিয়ে Union ও Tuple:", {
  myPayment,
  dhakaLocation,
});

// ----------------------------------------------------------------------------
// ৩. Extends (interface) vs Intersection (type)
// ----------------------------------------------------------------------------
interface BaseEntity {
  id: string;
  createdAt: Date;
}

// interface এ inheritance হয় 'extends' দিয়ে:
interface ProductEntity extends BaseEntity {
  title: string;
  price: number;
}

// type এ জোড়া দেওয়া হয় '&' (Intersection) দিয়ে:
type AuditMeta = { updatedBy: string };
type AuditedProduct = ProductEntity & AuditMeta;

// example 2
// interface fruites {
//   name: string;
//   color: string;
// }

// interface Vegetables extends fruites {
//   name: string;
//   isLeafy: boolean;
// }

// const leafyVegetable: Vegetables = {
//   name: "Spinach",
//   color: "green",
//   isLeafy: true,
// };
// console.log("✅ ৩. Extends: Fruit & Vegetable:", leafyVegetable);

const product: AuditedProduct = {
  id: "prod_99",
  title: "Mechanical Keyboard",
  price: 4500,
  createdAt: new Date(),
  updatedBy: "admin_shohan",
};

console.log("✅ ৩. Extends বনাম Intersection অবজেক্ট:", {
  title: product.title,
  price: product.price,
  updatedBy: product.updatedBy,
});

console.log("\n💡 রিভিশন সামারি: অবজেক্টে interface, আর ইউনিয়ন/টাপলে type!\n");
