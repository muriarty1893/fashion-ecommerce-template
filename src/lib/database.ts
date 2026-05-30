import { createPool, type VercelPool } from "@vercel/postgres";

let pool: VercelPool | null = null;

const getConnectionString = () =>
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.DATABASE_URL ||
  "";

export const getDb = () => {
  if (pool) return pool;

  const connectionString = getConnectionString();
  if (!connectionString) {
    throw new Error(
      "Database connection string is missing. Set POSTGRES_URL or DATABASE_URL.",
    );
  }

  pool = createPool({ connectionString });
  return pool;
};

export const query = async <T extends Record<string, unknown>>(
  text: string,
  values: unknown[] = [],
) => getDb().query<T>(text, values);

