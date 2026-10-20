// =========================================================================================
//                   TYPESCRIPT COMPLETE ROADMAP: BEGINNER TO ADVANCED
// =========================================================================================
// এই ফাইলে শুরু থেকে অ্যাডভান্সড পর্যন্ত প্রতিটি বিষয় স্টেপ-বাই-স্টেপ সাজানো হয়েছে।
// প্রতিটি স্টেপে রয়েছে বাস্তবসম্মত উদাহরণ এবং সহজ বাংলা ব্যাখ্যা।
// =========================================================================================

// =========================================================================================
// 🟢 LEVEL 1: BEGINNER (মৌলিক ভিত্তি)
// =========================================================================================

// -----------------------------------------------------------------------------------------
// STEP 01: Primitive Types (মৌলিক ডাটা টাইপসমূহ)
// -----------------------------------------------------------------------------------------
const userName: string = "Sajjad";
const userAge: number = 24;
const isEnrolled: boolean = true;
const notFound: null = null;
const notAssigned: undefined = undefined;
const bigNumber: bigint = 9007199254740991n;
const uniqueKey: symbol = Symbol("id");

console.log(
  `[Step 01] User: ${userName}, Age: ${userAge}, Enrolled: ${isEnrolled}`,
);

// -----------------------------------------------------------------------------------------
// STEP 02: Type Inference vs Type Annotation (টাইপ ইনফারেন্স বনাম অ্যানোটেশন)
// -----------------------------------------------------------------------------------------
// Type Annotation: আমরা নিজে টাইপ লিখে দেই
let explicitCity: string = "Dhaka";

// Type Inference: TypeScript নিজেই ভ্যালু দেখে টাইপ বুঝে নেয় (স্মার্ট আচরণ)
let inferredScore = 95; // TS জানে এটা number
// inferredScore = "A+"; // ❌ Error! Type 'string' is not assignable to type 'number'

// -----------------------------------------------------------------------------------------
// STEP 03: Arrays & Readonly Arrays (অ্যারে)
// -----------------------------------------------------------------------------------------
// সাধারণ অ্যারে ডিক্লেয়ারেশন:
const scores: number[] = [85, 90, 78];
const cities: string[] = ["Dhaka", "Chittagong", "Sylhet"];

// Readonly Array: যে অ্যারেকে মডিফাই (push, pop, change) করা যাবে না
const fixedNumbers: readonly number[] = [1, 2, 3];
// fixedNumbers.push(4); // ❌ Error! Property 'push' does not exist on type 'readonly number[]'

// -----------------------------------------------------------------------------------------
// STEP 04: Tuples (নির্দিষ্ট দৈর্ঘ্যের ও নির্দিষ্ট ক্রমের অ্যারে)
// -----------------------------------------------------------------------------------------
// Tuple: প্রথম এলিমেন্ট অবশ্যই number এবং দ্বিতীয়টি string হতে হবে
let coordinate: [number, number] = [23.8103, 90.4125];

// Named Tuple (লেবেলযুক্ত টাপল - কোড সহজে বুঝার জন্য)
type HttpResponse = [statusCode: number, statusMessage: string];
const res: HttpResponse = [200, "OK"];

// -----------------------------------------------------------------------------------------
// STEP 05: Enums (নামযুক্ত ধ্রুবক বা Constants এর সেট)
// -----------------------------------------------------------------------------------------
// A) Numeric Enum (ডিফল্ট 0 থেকে শুরু হয়)
enum Role {
  USER, // 0
  MODERATOR, // 1
  ADMIN, // 2
}

// B) String Enum (বেশি প্রিফার্ড, ডিবাগ করা সহজ)
enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
}
const currentOrder: OrderStatus = OrderStatus.PENDING;

// C) const enum (বিল্ডের সময় কোনো JS অবজেক্ট তৈরি হয় না, সরাসরি ভ্যালু বসে যায়)
const enum AppMode {
  DEV = "DEVELOPMENT",
  PROD = "PRODUCTION",
}
const currentMode = AppMode.DEV;

// -----------------------------------------------------------------------------------------
// STEP 06: Special Types: any, unknown, void, never
// -----------------------------------------------------------------------------------------
// 1) any: টাইপ চেকিং বন্ধ করে দেয় (এভয়েড করা উচিত)
let danger: any = "Hello";
danger = 123;
// danger.thisMethodDoesNotExist(); // ❌ রানটাইমে ক্র্যাশ করবে! (কারণ any টাইপ চেকিং বন্ধ করে দেয়)

// 2) unknown: টাইপ-সেফ any। যেকোনো ভ্যালু রাখতে পারে, তবে টাইপ চেক ছাড়া ব্যবহার করা যায় না
let safeBox: unknown = "TypeScript 2026";
// safeBox.toUpperCase(); // ❌ Error! Object is of type 'unknown'
if (typeof safeBox === "string") {
  console.log("[Step 06] Safe string:", safeBox.toUpperCase()); // ✅ Allowed!
}

// 3) void: ফাংশন কিছু রিটার্ন না করলে void ব্যবহার করা হয়
function printHello(): void {
  console.log("[Step 06] Hello!");
}

// 4) never: ফাংশন যা কখনো রিটার্ন করে শেষ হয় না (Error থ্রো করে অথবা ইনফিনিট লুপ)
function crashSystem(reason: string): never {
  throw new Error(`System halted: ${reason}`);
}

// =========================================================================================
// 🟡 LEVEL 2: INTERMEDIATE (ফাংশন, অবজেক্ট, ইউনিয়ন ও টাইপ গার্ড)
// =========================================================================================

// -----------------------------------------------------------------------------------------
// STEP 07: Objects, Interfaces & Type Aliases
// -----------------------------------------------------------------------------------------
// A) Interface: অবজেক্টের ব্লু-প্রিন্ট
interface Person {
  readonly id: string; // চেঞ্জ করা যাবে না
  name: string;
  email: string;
  phoneNumber?: string; // অপশনাল (?)
}

// B) Interface Merging (একই নামের দুটি ইন্টারফেস স্বয়ংক্রিয়ভাবে মার্জ হয়ে যায়)
interface Person {
  address?: string; // পূর্বের Person ইন্টারফেসের সাথে যোগ হলো
}

const me: Person = {
  id: "USR-001",
  name: "Sajjad",
  email: "sajjad@example.com",
};

// C) Interface Inheritance (extends)
interface Employee extends Person {
  salary: number;
  designation: string;
}

const staff: Employee = {
  id: "EMP-10",
  name: "Rahim",
  email: "rahim@company.com",
  salary: 50000,
  designation: "Backend Engineer",
};

// D) Type Alias: যেকোনো টাইপের কাস্টম নাম দেওয়া যায় (Union, Primitive, Object)
type ID = string | number;
type Coordinates = { x: number; y: number };

// -----------------------------------------------------------------------------------------
// STEP 08: Unions (|), Intersections (&) & Discriminated Unions
// -----------------------------------------------------------------------------------------
// 1) Union (|): "হয় এটা, নয় ওটা"
type PaymentMethod = "BKASH" | "NAGAD" | "CARD" | "CASH";
let payment: PaymentMethod = "BKASH";

// 2) Intersection (&): দুটি বা ততোধিক টাইপকে একত্রিত করা
type HasID = { id: string };
type HasTimestamp = { createdAt: Date; updatedAt: Date };
type AuditedEntity = HasID & HasTimestamp;

const documentData: AuditedEntity = {
  id: "DOC-99",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// 3) Discriminated Unions (সবচেয়ে বাস্তবসম্মত স্টেট হ্যান্ডলিং প্যাটার্ন):
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string[] };
type FailedState = { status: "failed"; error: string };

type ViewState = LoadingState | SuccessState | FailedState;

function renderView(state: ViewState): void {
  // 'status' চেক করার মাধ্যমে TS বুঝে নেয় কোন অবজেক্টে কোন ফিল্ড আছে
  switch (state.status) {
    case "loading":
      console.log("[Step 08] Loading data...");
      break;
    case "success":
      console.log("[Step 08] Data count:", state.data.length);
      break;
    case "failed":
      console.log("[Step 08] Error:", state.error);
      break;
  }
}

// -----------------------------------------------------------------------------------------
// STEP 09: Functions in TypeScript
// -----------------------------------------------------------------------------------------
// A) Function Type Signature
type CalculationFn = (a: number, b: number) => number;
const multiply: CalculationFn = (x, y) => x * y;

// B) Default ও Optional Parameters
function createGreeting(
  name: string,
  greetingPrefix: string = "Hello",
  suffix?: string,
): string {
  return `${greetingPrefix}, ${name}${suffix ? " " + suffix : ""}`;
}

// C) Rest Parameters (অনির্দিষ্ট সংখ্যক আর্গুমেন্ট)
function calculateTotal(...prices: number[]): number {
  return prices.reduce((sum, current) => sum + current, 0);
}

// D) Function Overloads (একই ফাংশনের ভিন্ন ভিন্ন প্যারামিটার ও রিটার্ন টাইপ হ্যান্ডেল করা)
function parseValue(value: string): string[];
function parseValue(value: number): number[];
function parseValue(value: string | number): string[] | number[] {
  if (typeof value === "string") {
    return value.split("");
  }
  return [value];
}
const letters = parseValue("TS"); // letters is typed as string[]
const digits = parseValue(42); // digits is typed as number[]
console.log(letters, digits);

// -----------------------------------------------------------------------------------------
// STEP 10: Type Narrowing & Custom Type Guards
// -----------------------------------------------------------------------------------------
// 1) typeof guard
function formatInput(input: string | number): string {
  if (typeof input === "string") {
    return input.trim().toUpperCase();
  }
  return input.toFixed(2);
}

// 2) instanceof guard
class Dog {
  bark() {
    console.log("Woof!");
  }
}
class Duck {
  quack() {
    console.log("Quack!");
  }
}
function soundMaker(animal: Dog | Duck) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.quack();
  }
}

// 3) "in" operator guard
type Car = { drive: () => void };
type Boat = { sail: () => void };
function operateVehicle(v: Car | Boat) {
  if ("drive" in v) {
    v.drive();
  } else {
    v.sail();
  }
}

// 4) Custom Type Predicate ("value is Type")
function isNonNullString(val: unknown): val is string {
  return typeof val === "string" && val.length > 0;
}

// -----------------------------------------------------------------------------------------
// STEP 11: Classes, OOP & Access Modifiers
// -----------------------------------------------------------------------------------------
// Parameter Properties: কনস্ট্রাক্টরেই অ্যাক্সেস মডিফায়ার দিয়ে সরাসরি প্রোপার্টি ডিফাইন করা
class BankCustomer {
  constructor(
    public readonly id: string, // বাইরে থেকে শুধু রিড করা যাবে
    public fullName: string, // যেকোনো জায়গা থেকে রিড ও রাইট করা যাবে
    protected accountLevel: string, // এই ক্লাস এবং এর চাইল্ড ক্লাসে ব্যবহারযোগ্য
    private _balance: number, // শুধুমাত্র এই ক্লাসের ভেতরে অ্যাক্সেসযোগ্য
  ) {}

  // Getter
  get balance(): number {
    return this._balance;
  }

  // Setter
  set balance(amount: number) {
    if (amount < 0) throw new Error("Balance cannot be negative");
    this._balance = amount;
  }

  public deposit(amount: number): void {
    this._balance += amount;
  }
}

// Abstract Class বনাম Interface:
// Interface শুধু টাইপের নকশা দেয়, কোড থাকে না। Abstract ক্লাসে কিছু ইমপ্লিমেন্টেড কোডও থাকতে পারে।
abstract class DatabaseConnector {
  abstract connect(): Promise<boolean>; // সাব-ক্লাসকে অবশ্যই ইমপ্লিমেন্ট করতে হবে

  public logConnection(dbName: string): void {
    console.log(`[Step 11] Connected to DB: ${dbName}`);
  }
}

class PostgresConnector extends DatabaseConnector {
  async connect(): Promise<boolean> {
    this.logConnection("PostgreSQL");
    return true;
  }
}

// =========================================================================================
// 🟠 LEVEL 3: ADVANCED (জেনেরিকস, টাইপ অপারেটর এবং ইউটিলিটি টাইপ)
// =========================================================================================

// -----------------------------------------------------------------------------------------
// STEP 12: Generics (রি-ইউজেবল ডায়নামিক টাইপ)
// -----------------------------------------------------------------------------------------
// 1) Generic Function
function wrapInArray<T>(item: T): T {
  return item;
}
const numArr = wrapInArray<number>(100);
const strArr = wrapInArray<string>("Code");

// 2) Generic Interface (API রেসপন্স হ্যান্ডেল করার জন্য অত্যন্ত দরকারি)
interface ApiResponse<TData> {
  success: boolean;
  statusCode: number;
  data: TData;
}
const userApiResult: ApiResponse<Person> = {
  success: true,
  statusCode: 200,
  data: me,
};

// 3) Generic Constraints (extends) - টাইপকে একটা সীমার মধ্যে রাখা
interface Measurable {
  length: number;
}
function printItemLength<T extends Measurable>(item: T): void {
  console.log("[Step 12] Length:", item.length);
}
printItemLength("Hello TypeScript"); // string এর length আছে
printItemLength([1, 2, 3, 4]); // array এর length আছে
// printItemLength(500);             // ❌ Error! number এর length প্রোপার্টি নেই

// ************************** Step 12 **************************
const staff2: Employee = {
  id: "EMP-10",
  name: "Rahim",
  email: "rahim@company.com",
  salary: 50000,
  designation: "Backend Engineer",
};

// 4) Generic with keyof Constraint (টাইপ-সেফ অবজেক্ট প্রোপার্টি রিডার)
function extractProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const staffName = extractProperty(staff2, "designation"); // TS জানে এর টাইপ string

// -----------------------------------------------------------------------------------------
// STEP 13: Type Operators: keyof, typeof, Indexed Access
// -----------------------------------------------------------------------------------------
const appSettings = {
  apiBaseUrl: "https://api.domain.com",
  timeoutMs: 3000,
  enableSsl: true,
};

// A) typeof: কোনো ভ্যারিয়েবল থেকে তার টাইপ স্ট্রাকচার বের করা
type AppSettingsType = typeof appSettings;

// B) keyof: কোনো অবজেক্টের কী-গুলোর একটি Union টাইপ তৈরি করা
type AppSettingKey = keyof AppSettingsType; // "apiBaseUrl" | "timeoutMs" | "enableSsl"

// C) Indexed Access Types: অবজেক্ট টাইপ থেকে নির্দিষ্ট ফিল্ডের টাইপ বের করা
type TimeoutType = AppSettingsType["timeoutMs"]; // number

// -----------------------------------------------------------------------------------------
// STEP 14: Essential Built-in Utility Types (অতি প্রয়োজনীয় ইউটিলিটি টাইপ)
// -----------------------------------------------------------------------------------------
interface Article {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  authorId: string;
}

// 1) Partial<T>: সব প্রোপার্টি অপশনাল (?) করে দেয় (যেমন: ডাটাবেস আপডেট করার সময়)
type UpdateArticleDTO = Partial<Article>;

// 2) Required<T>: সব অপশনাল প্রোপার্টিকে বাধ্যতামূলক করে
type CompleteArticle = Required<Article>;

// 3) Readonly<T>: সব প্রোপার্টি রিড-অনলি বানায়
type ImmutableArticle = Readonly<Article>;

// 4) Pick<T, Keys>: নির্দিষ্ট কিছু প্রোপার্টি বেছে নেওয়া
type ArticleSummary = Pick<Article, "id" | "title">;

// 5) Omit<T, Keys>: নির্দিষ্ট কিছু প্রোপার্টি বাদ দিয়ে বাকিগুলো নেওয়া
type CreateArticleDTO = Omit<Article, "id">;

// 6) Record<Keys, ValueType>: কী এবং ভ্যালুর টাইপ ডিফাইন করা (ডিকশনারি / ম্যাপ)
type UserRole = "admin" | "editor" | "subscriber";
const permissions: Record<UserRole, string[]> = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  subscriber: ["read"],
};

// 7) Exclude<UnionType, ExcludedMembers>: ইউনিয়ন থেকে নির্দিষ্ট টাইপ বাদ দেওয়া
type NonAdminRole = Exclude<UserRole, "admin">; // "editor" | "subscriber"

// 8) Extract<Type, Union>: দুটি ইউনিয়নের কমন অংশ বের করা
type OnlyEditor = Extract<UserRole, "editor" | "guest">; // "editor"

// 9) NonNullable<T>: null ও undefined বাদ দেওয়া
type NullableString = string | null | undefined;
type CleanString = NonNullable<NullableString>; // string

// 10) ReturnType<T> ও Parameters<T>: কোনো ফাংশনের রিটার্ন ও প্যারামিটার টাইপ এক্সট্র্যাক্ট করা
function fetchArticle(id: number, includeComments: boolean) {
  return { id, title: "TypeScript Mastery", published: true };
}
type FetchArticleReturn = ReturnType<typeof fetchArticle>; // { id: number; title: string; published: boolean; }
type FetchArticleParams = Parameters<typeof fetchArticle>; // [id: number, includeComments: boolean]

// 11) Awaited<T>: Promise-এর ভেতরের টাইপ বের করা
type PromisedData = Promise<{ token: string }>;
type UnwrappedToken = Awaited<PromisedData>; // { token: string }

// =========================================================================================
// 🔴 LEVEL 4: EXPERT / MASTER (ম্যাপড টাইপ, কন্ডিশনাল টাইপ ও অ্যাডভান্সড ট্রিকস)
// =========================================================================================

// -----------------------------------------------------------------------------------------
// STEP 15: Mapped Types & Key Remapping
// -----------------------------------------------------------------------------------------
// A) Basic Mapped Type (অবজেক্টের প্রতিটি ফিল্ডকে ট্রান্সফর্ম করা)
type MakeNullable<T> = {
  [K in keyof T]: T[K] | null;
};
type NullableArticle = MakeNullable<Article>;

// B) Modifiers: -readonly অথবা -? (অপশনাল তুলে ফেলা)
type Concrete<T> = {
  -readonly [P in keyof T]-?: T[P];
};

// C) Key Remapping with "as" (প্রোপার্টির নাম ডায়নামিকালি পরিবর্তন করা)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
interface SimpleUser {
  name: string;
  age: number;
}
type UserGetters = Getters<SimpleUser>;
// UserGetters এর ধরন হবে:
// {
//   getName: () => string;
//   getAge: () => number;
// }

// -----------------------------------------------------------------------------------------
// STEP 16: Conditional Types & The "infer" Keyword
// -----------------------------------------------------------------------------------------
// 1) Conditional Type (শর্ত ভিত্তিক টাইপ: T extends U ? X : Y)
type IsArray<T> = T extends any[] ? true : false;
type T1 = IsArray<number[]>; // true
type T2 = IsArray<string>; // false

// 2) The "infer" keyword (টাইপ ভেতর থেকে এক্সট্র্যাক্ট করা)
// অ্যারের ভেতরের এলিমেন্টের টাইপ বের করার কাস্টম টাইপ:
type ElementOf<T> = T extends (infer E)[] ? E : T;
type NumberElement = ElementOf<number[]>; // number
type DirectString = ElementOf<string>; // string

// Promise এর রেজলভড টাইপ বের করার কাস্টম ইমপ্লিমেন্টেশন:
type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T;
type Unwrapped = MyAwaited<Promise<Promise<number>>>; // number (recursive unwrap)

// -----------------------------------------------------------------------------------------
// STEP 17: Template Literal Types (টেমপ্লেট লিটারাল টাইপ)
// -----------------------------------------------------------------------------------------
// স্ট্রিং প্যাটার্ন টাইপ করার জন্য অসাধারণ একটি ফিচার
type EventScope = "user" | "order" | "invoice";
type EventAction = "created" | "updated" | "deleted";

// স্বয়ংক্রিয়ভাবে সব কম্বিনেশন তৈরি করে: "user:created" | "user:updated" ...
type SystemEvent = `${EventScope}:${EventAction}`;

const validEvent: SystemEvent = "user:created";
// const invalidEvent: SystemEvent = "user:destroyed"; // ❌ Error!

// -----------------------------------------------------------------------------------------
// STEP 18: Assertions, Const Assertions & "satisfies" Operator
// -----------------------------------------------------------------------------------------
// 1) Type Assertion ("as") - ডেভেলপার যখন কম্পাইলারের চেয়ে বেশি নিশ্চিত
const rawResponse: unknown = "Backend response text";
const textLen = (rawResponse as string).length;

// 2) Non-null Assertion Operator ("!") - মানটি null বা undefined হবে না বলে নিশ্চিত করা
function findElement(id: string): string | null {
  return "found-node";
}
const node = findElement("app")!; // null টাইপ বাদ হয়ে যায়

// 3) "as const" (Literal Types + Deep Readonly)
const routes = {
  home: "/",
  dashboard: "/admin/dashboard",
  profile: "/user/profile",
} as const;
// routes.home = "/new-home"; // ❌ Error! Cannot assign to 'home' because it is a read-only property

// 4) "satisfies" Operator (TS 4.9+):
// ভ্যালিডেশন করে টাইপ চেক করে, কিন্তু আসল ইনফার্ড টাইপকে ওয়াইড (widen) করে না
type ThemeConfig = Record<string, string | number[]>;

const siteTheme = {
  primary: "#1e40af",
  palette: [15, 23, 42],
} satisfies ThemeConfig;

// satisfies ব্যবহারের সুবিধা:
// TS এখনো সুনির্দিষ্টভাবে জানে primary হলো string (তাই toUpperCase() কাজ করবে)
// এবং palette হলো number[] (তাই map() কাজ করবে)
console.log("[Step 18] Theme color:", siteTheme.primary.toUpperCase());
console.log(
  "[Step 18] Palette colors:",
  siteTheme.palette.map((v) => v * 2),
);

// =========================================================================================
// 🚀 EXECUTION & TEST RUN (কোড সফলভাবে কাজ করছে কিনা যাচাই)
// =========================================================================================
console.log("\n=======================================================");
console.log("🎉 TypeScript All Steps (01 to 18) Compiled & Executed!");
console.log("Current Order Status:", currentOrder);
console.log("Staff Details:", staff.name, `(${staff.designation})`);
console.log("Payment Method:", payment);
console.log("Valid System Event:", validEvent);
console.log("=======================================================\n");
