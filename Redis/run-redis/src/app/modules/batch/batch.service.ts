import { redis } from "../../../redis/index.js";

const runPipelineDemo = async (totalItems: number) => {
  const startTime = Date.now();
  const pipeline = redis.pipeline();

  for (let i = 1; i <= totalItems; i++) {
    pipeline.set(`temp:item:${i}`, `value_${i}`, "EX", 120);
  }

  const results = await pipeline.exec();
  const duration = Date.now() - startTime;

  return {
    totalOperations: totalItems,
    timeTakenMs: duration,
    sampleResultStatus: results ? "All succeeded" : "Failed",
  };
};

const executeWalletTransfer = async (fromUser: string, toUser: string, amount: number) => {
  const fromKey = `wallet:user:${fromUser}`;
  const toKey = `wallet:user:${toUser}`;

  // Ensure initial demo balances
  const senderBal = await redis.get(fromKey);
  if (senderBal === null) {
    await redis.set(fromKey, 500);
  }
  const receiverBal = await redis.get(toKey);
  if (receiverBal === null) {
    await redis.set(toKey, 100);
  }

  const currentSenderBal = Number(await redis.get(fromKey));
  if (currentSenderBal < amount) {
    return {
      success: false,
      message: `Insufficient balance! Current: ${currentSenderBal}, required: ${amount}`,
    };
  }

  // Redis Transaction: MULTI ... EXEC
  const transaction = redis.multi();
  transaction.decrby(fromKey, amount);
  transaction.incrby(toKey, amount);

  const execResults = await transaction.exec();

  const newSenderBal = await redis.get(fromKey);
  const newReceiverBal = await redis.get(toKey);

  return {
    success: true,
    transferAmount: amount,
    sender: { userId: fromUser, newBalance: Number(newSenderBal) },
    receiver: { userId: toUser, newBalance: Number(newReceiverBal) },
    execResults,
  };
};

export const BatchService = {
  runPipelineDemo,
  executeWalletTransfer,
};
