# 🎯 TypeScript Interview Preparation — Executable Practice Guide (Batch 1)

> **লক্ষ্য (Mission):** আজকের টার্গেট হলো TypeScript-এর ১৯টি ইন্টারভিউ প্রশ্ন (Q01 - Q19) সরাসরি এক্সিকিউটেবল `.ts` ফাইলে শেখা ও টেস্ট করা।  
> **বাংলা ভাইব (Approach):** একদম সহজ মুখের ভাষায়, বাস্তব জীবনের উদাহরণ, গভীর টেকনিক্যাল ব্যাখ্যা, লাইভ কনসোল আউটপুট এবং ইন্টারভিউয়ারের ট্রিকি ফলো-আপ প্রশ্ন সহ সাজানো।

---

## 🚀 যেকোনো একটি ফাইল আলাদাভাবে রান করার নিয়ম

টার্মিনালে সরাসরি নিচের মতো লিখে এন্টার দিন:
```bash
npx tsx interview-questions/01-typescript/q01-type-vs-interface.ts
npx tsx interview-questions/01-typescript/q03-generics-constrained-functions.ts
npx tsx interview-questions/01-typescript/q11-runtime-data-validation-zod.ts
```

---

## 📋 ১৯টি এক্সিকিউটেবল TypeScript ফাইলের তালিকা

| # | প্রশ্ন (Question) | গুরুত্ব | রান করার ফাইল লিংক (Executable .ts File) | রান কমান্ড |
|---|---|---|---|---|
| **01** | `type` vs `interface` | ⭐ High | [`q01-type-vs-interface.ts`](./q01-type-vs-interface.ts) | `npx tsx interview-questions/01-typescript/q01-type-vs-interface.ts` |
| **02** | `any` vs `unknown` vs `never` | ⭐ High | [`q02-any-vs-unknown-vs-never.ts`](./q02-any-vs-unknown-vs-never.ts) | `npx tsx interview-questions/01-typescript/q02-any-vs-unknown-vs-never.ts` |
| **03** | Generics & Constrained Generic Functions | ⭐🔥 Senior | [`q03-generics-constrained-functions.ts`](./q03-generics-constrained-functions.ts) | `npx tsx interview-questions/01-typescript/q03-generics-constrained-functions.ts` |
| **04** | Union, Intersection & Discriminated Unions | ⭐ High | [`q04-unions-intersections-discriminated.ts`](./q04-unions-intersections-discriminated.ts) | `npx tsx interview-questions/01-typescript/q04-unions-intersections-discriminated.ts` |
| **05** | Type Narrowing & Custom Type Guards | 💡 Core | [`q05-type-narrowing-custom-guards.ts`](./q05-type-narrowing-custom-guards.ts) | `npx tsx interview-questions/01-typescript/q05-type-narrowing-custom-guards.ts` |
| **06** | Utility Types: Partial, Pick, Omit, Record, ReturnType | ⭐ High | [`q06-utility-types.ts`](./q06-utility-types.ts) | `npx tsx interview-questions/01-typescript/q06-utility-types.ts` |
| **07** | `keyof`, `typeof`, Indexed Access Types | 💡 Core | [`q07-keyof-typeof-indexed-access.ts`](./q07-keyof-typeof-indexed-access.ts) | `npx tsx interview-questions/01-typescript/q07-keyof-typeof-indexed-access.ts` |
| **08** | Mapped, Conditional Types & `infer` | 🔥 Deep | [`q08-mapped-conditional-infer.ts`](./q08-mapped-conditional-infer.ts) | `npx tsx interview-questions/01-typescript/q08-mapped-conditional-infer.ts` |
| **09** | Does TypeScript exist at runtime? Type erasure | 💡 Core | [`q09-runtime-type-erasure.ts`](./q09-runtime-type-erasure.ts) | `npx tsx interview-questions/01-typescript/q09-runtime-type-erasure.ts` |
| **10** | Structural vs Nominal Typing | 💡 Core | [`q10-structural-vs-nominal-typing.ts`](./q10-structural-vs-nominal-typing.ts) | `npx tsx interview-questions/01-typescript/q10-structural-vs-nominal-typing.ts` |
| **11** | Runtime data validation: Zod vs class-validator | 💎 Practical | [`q11-runtime-data-validation-zod.ts`](./q11-runtime-data-validation-zod.ts) | `npx tsx interview-questions/01-typescript/q11-runtime-data-validation-zod.ts` |
| **12** | Extending Express Request type (`req.user`) | 💎 Backend | [`q12-extending-express-request.ts`](./q12-extending-express-request.ts) | `npx tsx interview-questions/01-typescript/q12-extending-express-request.ts` |
| **13** | What does `strict` mode enable? | 💡 Compiler | [`q13-strict-mode-compiler.ts`](./q13-strict-mode-compiler.ts) | `npx tsx interview-questions/01-typescript/q13-strict-mode-compiler.ts` |
| **14** | `enum` vs `const object` vs `union literal` | 💡 Arch | [`q14-enum-vs-const-object-vs-union.ts`](./q14-enum-vs-const-object-vs-union.ts) | `npx tsx interview-questions/01-typescript/q14-enum-vs-const-object-vs-union.ts` |
| **15** | `satisfies` vs Type Assertion `as` | 💡 Modern | [`q15-satisfies-vs-type-assertion.ts`](./q15-satisfies-vs-type-assertion.ts) | `npx tsx interview-questions/01-typescript/q15-satisfies-vs-type-assertion.ts` |
| **16** | Branded Types in TypeScript & Use Cases | 🔥 Senior | [`q16-branded-types.ts`](./q16-branded-types.ts) | `npx tsx interview-questions/01-typescript/q16-branded-types.ts` |
| **17** | Function Return Typing: Overloads vs Conditionals | 🔥 Senior | [`q17-overloads-vs-conditional-return.ts`](./q17-overloads-vs-conditional-return.ts) | `npx tsx interview-questions/01-typescript/q17-overloads-vs-conditional-return.ts` |
| **18** | `readonly` vs `as const` vs `Object.freeze` | 💡 Core | [`q18-readonly-as-const-freeze.ts`](./q18-readonly-as-const-freeze.ts) | `npx tsx interview-questions/01-typescript/q18-readonly-as-const-freeze.ts` |
| **19** | Declaration Merging & Module Augmentation | 🔥 Senior | [`q19-declaration-merging-augmentation.ts`](./q19-declaration-merging-augmentation.ts) | `npx tsx interview-questions/01-typescript/q19-declaration-merging-augmentation.ts` |

---

## 🌟 প্রতিটি ফাইলে কী কী রয়েছে:
1. 🎯 **নোব-ফ্রেন্ডলি বাংলা ভাইব ও বাস্তব জীবনের অ্যানালজি (Noob Analogy):** সাধারণ মানুষের জীবনের সাথে মিলিয়ে কনসেপ্ট পরিষ্কার করা।
2. 💡 **কী (What) & কেন (Why):** ব্যাকএন্ড কোডে এটি না থাকলে কী ক্ষতি হতো এবং টাইপস্ক্রিপ্ট কীভাবে রক্ষা করে।
3. ⚠️ **ধরা খাওয়ার জায়গা (Common Pitfalls & Traps):** জুনিয়ররা সাধারণত কোথায় ভুল করে।
4. 🏢 **আমার ব্যাকএন্ড প্রজেক্টে বাস্তব ব্যবহার:** Express, Prisma, Database DTO, JWT Authentication, বা Zod স্কিমার লাইভ কোড।
5. 🧪 **রানটাইম টেস্ট কোড ও রঙিন কনসোল লগ:** যাতে সরাসরি টার্মিনালে রান করে ভ্যালু দেখা যায়।
6. ❓ **ইন্টারভিউয়ারের প্যাঁচাল প্রশ্ন ও ডিপ উত্তর (Follow-up Q&A):** ইন্টারভিউয়ারের ক্রস-কোশ্চেন কীভাবে সামলাবেন।
