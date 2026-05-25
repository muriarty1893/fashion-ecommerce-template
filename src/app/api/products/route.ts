import { NextResponse } from "next/server";
import { readDemoDb } from "../../../lib/demoDb";

export const GET = async () => {
  const db = await readDemoDb();
  return NextResponse.json(db.products);
};
