import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type DemoDb = {
  products: Product[];
  orders: Order[];
  users: User[];
};

const dbPath = path.join(process.cwd(), "src/data/db.json");

export const readDemoDb = async (): Promise<DemoDb> => {
  const file = await readFile(dbPath, "utf8");
  return JSON.parse(file) as DemoDb;
};

export const writeDemoDb = async (db: DemoDb) => {
  await writeFile(dbPath, `${JSON.stringify(db, null, 2)}\n`, "utf8");
};

export const getNextNumericId = (items: { id: string | number }[]) =>
  items.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 0), 0) + 1;
