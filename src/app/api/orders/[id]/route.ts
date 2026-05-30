import { NextResponse } from "next/server";
import { requireAdmin, requireSession } from "../../../../lib/auth";
import { query } from "../../../../lib/database";
import { getOrder } from "../../../../lib/storeDb";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const auth = requireSession(_request);
  if (auth.response) return auth.response;

  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  if (
    auth.session?.role !== "admin" &&
    String(order.user?.id || "") !== auth.session?.id
  ) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(order);
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;

  const { id } = await params;
  const body = await request.json();
  const result = await query<{ id: number }>(
    `UPDATE orders
     SET order_status = $2, updated_at = NOW()
     WHERE id = $1
     RETURNING id`,
    [Number(id), body.orderStatus],
  );

  if (!result.rows[0]) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  const order = await getOrder(id);
  return NextResponse.json(order);
};
