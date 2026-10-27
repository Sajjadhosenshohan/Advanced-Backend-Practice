# 🚀 TypeScript Complete Roadmap & Practice System

TypeScript-এর প্রতিটি ফিচার ও ব্যবহারিক ক্ষেত্রকে (Use Cases) একদম শুরু থেকে অ্যাডভান্সড পর্যন্ত সিকোয়েন্সিয়াল (Sequential) এবং ফাইল-ভিত্তিক (Modular) স্ট্রাকচারে সাজানো হয়েছে।

প্রতিটি ফাইলে স্পষ্টভাবে উল্লেখ রয়েছে:
1. 💡 **কেন ব্যবহার হয়? (Why Use This?)**
2. ⚠️ **জাভাস্ক্রিপ্টের সমস্যা বনাম টাইপস্ক্রিপ্টের সমাধান**
3. 📝 **বাস্তবসম্মত সহজ উদাহরণ ও কোড কমেন্ট**
4. 🧪 **রানটাইম টেস্ট আউটপুট**

---

## 📂 ফাইল স্ট্রাকচার ও সিকোয়েন্স (File Structure)

```text
src/
├── index.ts                             # 🌟 Master Runner (সবগুলো ফাইল একসাথে রান করে)
└── topics/
    ├── 01-primitives.ts                 # 🟢 Primitive Types & Type Inference
    ├── 02-arrays-and-tuples.ts          # 🟢 Arrays, Readonly Arrays & Tuples
    ├── 03-enums-and-literals.ts         # 🟢 Enums, const enum & String Literals
    ├── 04-special-types.ts              # 🟢 any vs unknown, void, never & Exhaustive Checks
    ├── 05-interfaces-and-types.ts       # 🟡 Type Alias vs Interface, Merging & Extends
    ├── 06-unions-and-intersections.ts   # 🟡 Unions, Intersections & Discriminated Unions
    ├── 07-functions.ts                  # 🟡 Function Types, Defaults & Overloading
    ├── 08-type-narrowing-guards.ts      # 🟠 typeof, instanceof, in, Custom Guards (is, asserts)
    ├── 09-classes-and-oop.ts            # 🟠 Classes, Access Modifiers, OOP & Abstract Classes
    ├── 10-generics.ts                   # 🔵 Generics (Functions, Interfaces, Constraints, keyof)
    ├── 11-type-operators.ts             # 🔵 keyof, typeof, Indexed Access Types
    ├── 12-utility-types.ts              # 🟣 Built-in Utilities (Partial, Pick, Omit, Record, etc.)
    ├── 13-conditional-and-infer.ts      # 🔴 Conditional Types & the "infer" keyword
    ├── 14-mapped-and-template-literals.ts# 🔴 Mapped Types, Key Remapping & Template Literals
    ├── 15-assertions-and-satisfies.ts   # 🔴 as, non-null (!), as const, satisfies operator
    └── 16-real-world-backend.ts         # 💎 Real-world DTOs, Generic Repository & Service Pattern
```

---

## 🛠️ কমান্ডসমূহ (How to Run)

### ১. সবগুলো টপিক একসাথে রান এবং লাইভ ওয়াচ করতে:
```bash
npm run dev
```

### ২. সবগুলো টপিক একবার রান করতে:
```bash
npm run run
```

### ৩. নির্দিষ্ট যেকোনো একটি ফাইল আলাদাভাবে রান করতে:
```bash
npx tsx src/topics/01-primitives.ts
npx tsx src/topics/10-generics.ts
npx tsx src/topics/16-real-world-backend.ts
```

### ৪. জাভাস্ক্রিপ্টে বিল্ড করতে:
```bash
npm run build
```
