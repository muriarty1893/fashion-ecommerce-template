import { createHash, pbkdf2Sync, randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createPool } from "@vercel/postgres";

const loadLocalEnv = async () => {
  try {
    const envFile = await readFile(".env.local", "utf8");
    for (const line of envFile.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").replace(/^["']|["']$/g, "");
      process.env[key] ||= value;
    }
  } catch {
    // Vercel deploys provide env vars directly; local development may not.
  }
};

await loadLocalEnv();

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Set POSTGRES_URL or DATABASE_URL before running this script.");
}

const pool = createPool({ connectionString });
const db = JSON.parse(await readFile("src/data/db.json", "utf8"));
const schema = await readFile("db/schema.sql", "utf8");

const hashPassword = (password) => {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
  return `pbkdf2:${salt}:${hash}`;
};

for (const statement of schema
  .split(";")
  .map((part) => part.trim())
  .filter(Boolean)) {
  await pool.query(statement);
}

for (const product of db.products) {
  await pool.query(
    `INSERT INTO products (
      id, title, image, category, price, discount_price, popularity, stock,
      rating, colors, sizes, created_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      image = EXCLUDED.image,
      category = EXCLUDED.category,
      price = EXCLUDED.price,
      discount_price = EXCLUDED.discount_price,
      popularity = EXCLUDED.popularity,
      stock = EXCLUDED.stock,
      rating = EXCLUDED.rating,
      colors = EXCLUDED.colors,
      sizes = EXCLUDED.sizes,
      deleted_at = NULL,
      updated_at = NOW()`,
    [
      product.id,
      product.title,
      product.image,
      product.category,
      product.price,
      product.discountPrice || null,
      product.popularity || 1,
      product.stock || 0,
      product.rating || null,
      product.colors ? JSON.stringify(product.colors) : null,
      product.sizes ? JSON.stringify(product.sizes) : null,
    ],
  );
}

for (const user of db.users) {
  const role =
    user.role ||
    (String(user.email || "").toLowerCase().includes("admin")
      ? "admin"
      : "customer");

  await pool.query(
    `INSERT INTO users (id, name, lastname, email, role, password_hash)
     VALUES ($1, $2, $3, LOWER($4), $5, $6)
     ON CONFLICT (id) DO UPDATE SET
       name = EXCLUDED.name,
       lastname = EXCLUDED.lastname,
       email = EXCLUDED.email,
       role = EXCLUDED.role,
       updated_at = NOW()`,
    [
      Number(user.id),
      user.name,
      user.lastname,
      user.email,
      role,
      hashPassword(user.password || "password"),
    ],
  );
}

await pool.query(
  `SELECT setval('users_id_seq', GREATEST((SELECT MAX(id) FROM users), 1), true)`,
);

const adminEmail = process.env.SEED_ADMIN_EMAIL;
const adminPassword = process.env.SEED_ADMIN_PASSWORD;

if (adminEmail && adminPassword) {
  const fallbackName = adminEmail.split("@")[0] || "Admin";
  await pool.query(
    `INSERT INTO users (name, lastname, email, role, password_hash)
     VALUES ($1, 'User', LOWER($2), 'admin', $3)
     ON CONFLICT (email) DO UPDATE SET
       role = 'admin',
       password_hash = EXCLUDED.password_hash,
       updated_at = NOW()`,
    [fallbackName, adminEmail, hashPassword(adminPassword)],
  );
}

const sequenceSeed = createHash("sha1")
  .update(String(Date.now()))
  .digest("hex")
  .slice(0, 8);

await pool.query(
  `SELECT setval('users_id_seq', GREATEST((SELECT MAX(id) FROM users), 1), true)`,
);
await pool.end();

console.log(`Seeded ${db.products.length} products and ${db.users.length} users.`);
console.log(`Run marker: ${sequenceSeed}`);
