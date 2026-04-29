import "dotenv/config";

import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "../src/generated/prisma/client.ts";

interface DbInfo {
  version: string;
  db: string;
  now: Date;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error(
      "✗ DATABASE_URL is not set. Add a Neon Postgres connection string to .env (see .env.example).",
    );
    process.exit(1);
  }

  const adapter = new PrismaNeon({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    const [info] = await prisma.$queryRaw<DbInfo[]>`
      SELECT version() AS version,
             current_database() AS db,
             NOW() AS now
    `;

    console.log("✓ Connected to Neon");
    console.log(`  Database: ${info.db}`);
    console.log(`  Server:   ${info.version.split(",")[0]}`);
    console.log(`  Time:     ${info.now.toISOString()}`);
  } catch (error) {
    console.error("✗ Connection failed:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
