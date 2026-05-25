import { NextResponse } from "next/server";
import { readDemoDb } from "../../../../lib/demoDb";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const db = await readDemoDb();
  const product = db.products.find((item) => String(item.id) === id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
};
