import { NextResponse } from "next/server";
import { readSession, requireSession } from "../../../lib/auth";
import { createOrder, getOrders } from "../../../lib/storeDb";

export const GET = async (request: Request) => {
  const auth = requireSession(request);
  if (auth.response) return auth.response;

  const orders = await getOrders(
    auth.session?.role === "admin" ? undefined : auth.session?.id,
  );
  return NextResponse.json(orders);
};

export const POST = async (request: Request) => {
  const session = readSession(request);
  const body = await request.json();

  try {
    const order = await createOrder({
      products: body.products || [],
      data: body.data || {},
      subtotal: Number(body.subtotal || 0),
      discount: Number(body.discount || 0),
      shipping: Number(body.shipping || 0),
      tax: Number(body.tax || 0),
      total: Number(body.total || 0),
      userId: session?.id || body.user?.id,
      userEmail: session?.email || body.user?.email,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Order creation failed";
    return NextResponse.json({ message }, { status: 400 });
  }
};
