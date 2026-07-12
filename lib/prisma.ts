import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import { setDefaultResultOrder } from "node:dns";
import ws from "ws";

// Connect to Neon via its serverless driver (WebSocket over HTTPS/443) instead
// of raw Postgres TCP (5432). This is robust on serverless/edge and, because
// the connection is made in JS (not the Rust engine), it also works on networks
// that can't route IPv6 to the Neon host — we just force IPv4 resolution below.
neonConfig.webSocketConstructor = ws;
try {
  setDefaultResultOrder("ipv4first");
} catch {
  // Older Node without this API — ignore.
}

// Reuse a single PrismaClient across hot reloads in dev to avoid exhausting
// database connections.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrisma() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
