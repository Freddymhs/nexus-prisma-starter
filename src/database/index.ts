// Database connection and operations

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// handle close PrismaClient when server is stopped
async function cleanup() {
  await prisma.$disconnect();
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("SIGQUIT", cleanup);
