import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/generated/prisma/client"

export const connectionString = `${process.env.DATABASE_URL}`

// Initialize the pg Pool
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: true } })
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

// export { prisma };
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: adapter,
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
