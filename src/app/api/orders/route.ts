import { NextResponse } from "next/server";
import { getNextNumericId, readDemoDb, writeDemoDb } from "../../../lib/demoDb";

export const GET = async () => {
  const db = await readDemoDb();
  return NextResponse.json(db.orders);
};

export const POST = async (request: Request) => {
  const db = await readDemoDb();
  const body = await request.json();
  const order = {
    ...body,
    id: getNextNumericId(db.orders),
  } as Order;

  db.orders.push(order);
  await writeDemoDb(db);

  return NextResponse.json(order, { status: 201 });
};
