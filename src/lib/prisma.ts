import { PrismaClient } from "@prisma/client";
import { join } from "node:path";

const getDatabaseUrl = () => {
  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error(
      "Missing DATABASE_URL or POSTGRES_URL. Configure a PostgreSQL connection string.",
    );
  }

  const connectionUrl = new URL(connectionString);
  connectionUrl.searchParams.set("sslmode", "verify-full");
  connectionUrl.searchParams.set(
    "sslrootcert",
    join(process.cwd(), "supabase", "prod-ca-2021.crt"),
  );
  connectionUrl.searchParams.set(
    "connection_limit",
    process.env.DB_CONN_LIMIT || "5",
  );

  if (connectionUrl.hostname.includes(".pooler.supabase.com")) {
    connectionUrl.searchParams.set("pgbouncer", "true");
  }

  return connectionUrl.toString();
};

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

let prismaClient = globalForPrisma.prisma;

export const getPrismaClient = () => {
  if (prismaClient) return prismaClient;

  prismaClient = new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaClient;
  }

  return prismaClient;
};
