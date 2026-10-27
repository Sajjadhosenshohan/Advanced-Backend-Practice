/**
 * ============================================================================
 * 🎯 TYPESCRIPT INTERVIEW QUESTIONS PRACTICAL DEMO RUNNER
 * ============================================================================
 * এই ফাইলটি রান করতে টার্মিনালে লিখুন:
 * npx tsx interview-questions/01-typescript/ts-interview-practice.ts
 * ============================================================================
 */

import { z } from "zod";

console.log("============================================================================");
console.log("🚀 EXECUTING TYPESCRIPT INTERVIEW QUESTIONS PRACTICAL DEMO (Q01 TO Q19)");
console.log("============================================================================");

// --- Q01 & Q19: Declaration Merging ---
interface User {
  id: string;
  name: string;
}
interface User {
  role: "ADMIN" | "USER";
}
const userDemo: User = { id: "u-101", name: "Sajjad Shohan", role: "ADMIN" };
console.log("\n[Q01/Q19] Declaration Merging:", userDemo);

// --- Q02: Unknown & Never Exhaustive Check ---
function processUnknown(input: unknown): string {
  if (typeof input === "string") return `Input is string: ${input.toUpperCase()}`;
  if (typeof input === "number") return `Input is number: ${(input * 2).toFixed(2)}`;
  return "Unknown type processed safely";
}
console.log("\n[Q02] Unknown Handling:", processUnknown("hello backend"));

// --- Q03: Constrained Generic Function ---
interface HasId {
  id: string | number;
}
function printId<T extends HasId>(entity: T): string {
  return `Entity ID is: ${entity.id}`;
}
console.log("\n[Q03] Constrained Generic:", printId({ id: "prod-456", title: "Laptop" }));

// --- Q04: Discriminated Union ---
type ServiceResult =
  | { status: "SUCCESS"; data: { accountBalance: number } }
  | { status: "ERROR"; errorMessage: string };

function renderResult(res: ServiceResult) {
  if (res.status === "SUCCESS") {
    console.log(`\n[Q04] Discriminated Union: Success! Balance: $${res.data.accountBalance}`);
  } else {
    console.log(`\n[Q04] Discriminated Union: Error! ${res.errorMessage}`);
  }
}
renderResult({ status: "SUCCESS", data: { accountBalance: 5400 } });

// --- Q05: Custom Type Guard ---
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}
try {
  throw new Error("Database timeout connection failure");
} catch (err: unknown) {
  if (isErrorWithMessage(err)) {
    console.log("\n[Q05] Custom Type Guard narrowed message:", err.message);
  }
}

// --- Q06: Utility Types ---
type FullUser = { id: string; name: string; email: string; pass: string };
type SafeUser = Omit<FullUser, "pass">;
type PatchUser = Partial<SafeUser>;
const updatePayload: PatchUser = { name: "Updated Name" };
console.log("\n[Q06] Utility Types (Partial & Omit):", updatePayload);

// --- Q07: keyof, typeof, indexed access ---
const serverConfig = { port: 8080, dbHost: "localhost" } as const;
type ConfigKey = keyof typeof serverConfig;
function getConfigValue(key: ConfigKey) {
  return serverConfig[key];
}
console.log("\n[Q07] keyof & typeof lookup:", "port =", getConfigValue("port"));

// --- Q10 & Q16: Branded Types (Nominal Safety) ---
declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

const userId = "usr-1" as UserId;
const orderId = "ord-9" as OrderId;
console.log("\n[Q16] Branded types created safely without runtime overhead:", { userId, orderId });

// --- Q11: Runtime Data Validation with Zod ---
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const validationResult = LoginSchema.safeParse({
  email: "developer@shohan.dev",
  password: "supersecret123",
});
if (validationResult.success) {
  console.log("\n[Q11] Zod Runtime Validation Success:", validationResult.data.email);
}

// --- Q14: as const Object instead of Enum ---
const OrderState = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
} as const;
type OrderState = (typeof OrderState)[keyof typeof OrderState];
console.log("\n[Q14] const object as enum:", Object.values(OrderState));

// --- Q15: satisfies Operator ---
type RouteSpec = Record<string, { method: "GET" | "POST"; path: string }>;
const routes = {
  login: { method: "POST", path: "/api/auth/login" },
  profile: { method: "GET", path: "/api/user/me" },
} satisfies RouteSpec;
console.log("\n[Q15] satisfies operator verified route:", routes.login.path);

console.log("\n============================================================================");
console.log("✅ ALL TYPESCRIPT TOPICS EXECUTED CLEANLY & SUCCESSFULLY!");
console.log("============================================================================\n");
