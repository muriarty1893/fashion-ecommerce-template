import { NextResponse } from "next/server";
import { readDemoDb } from "../../../../lib/demoDb";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const db = await readDemoDb();
  const order = db.orders.find((item) => String(item.id) === id);

  if (!order) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
};
