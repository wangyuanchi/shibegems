import "dotenv/config";

import { PrismaClient } from "../generated/prisma";

let client: PrismaClient | null = null;

async function connectPrisma(): Promise<void> {
  if (client) {
    return;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not defined");
  }

  client = new PrismaClient();
  await client.$connect();
  console.log("Connected to Prisma");
}

export async function handlePrismaConnection(): Promise<void> {
  try {
    await connectPrisma();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export function getPrismaClient(): PrismaClient {
  if (!client) {
    throw new Error(
      "Prisma client is not initialized, you must connect first."
    );
  }

  return client;
}
