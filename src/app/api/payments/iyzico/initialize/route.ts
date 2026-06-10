import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { readSession } from "../../../../../lib/auth";
import {
  attachIyzicoTokenToPayment,
  createPendingIyzicoOrder,
  getOrder,
  getProduct,
} from "../../../../../lib/storeDb";
import {
  initializeIyzicoCheckout,
  type IyzicoInitializeRequest,
} from "../../../../../lib/iyzico";

export const dynamic = "force-dynamic";

const toPrice = (value: number) => Number(value.toFixed(2)).toString();
const toNumber = (value: unknown) => Number(value || 0);
const asText = (value: unknown, fallback = "") =>
  String(value || fallback).trim();

const getClientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "85.34.78.112";

export const POST = async (request: Request) => {
  const session = readSession(request);
  const body = await request.json();
  const products = (body.products || []) as ProductInCart[];
  const data = (body.data || {}) as Record<string, unknown>;

  if (products.length === 0) {
    return NextResponse.json({ message: "Your cart is empty." }, { status: 400 });
  }

  try {
    const dbProducts = await Promise.all(
      products.map((item) => getProduct(item.productId || item.id)),
    );

    let subtotal = 0;
    products.forEach((cartItem, index) => {
      const dbProduct = dbProducts[index];
      if (!dbProduct) throw new Error(`Product ${cartItem.productId || cartItem.id} not found.`);
      if (dbProduct.stock < cartItem.quantity) {
        throw new Error(`${dbProduct.title} does not have enough stock.`);
      }
      subtotal += Number(cartItem.price || dbProduct.discountPrice || dbProduct.price) * cartItem.quantity;
    });

    const requestedSubtotal = toNumber(body.subtotal);
    if (Math.abs(subtotal - requestedSubtotal) > 0.01) {
      throw new Error("Cart total changed. Review your cart and try again.");
    }

    const discount = toNumber(body.discount);
    const shipping = toNumber(body.shipping);
    const tax = toNumber(body.tax);
    const total = subtotal - discount + shipping + tax;
    const requestedTotal = toNumber(body.total);
    if (Math.abs(total - requestedTotal) > 0.01) {
      throw new Error("Order total changed. Review your cart and try again.");
    }

    const conversationId = `iyzico-${randomUUID()}`;
    const order = await createPendingIyzicoOrder({
      products,
      data: { ...data, paymentType: "iyzico" },
      subtotal,
      discount,
      shipping,
      tax,
      total,
      userId: session?.id || body.user?.id,
      userEmail: session?.email || body.user?.email,
      conversationId,
    });

    if (!order) throw new Error("Order creation failed.");

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || request.headers.get("origin") || "http://localhost:5173";
    const firstName = asText(data.firstName, "Demo");
    const lastName = asText(data.lastName, "Customer");
    const email = asText(data.emailAddress || data.email, session?.email || "customer@example.com");
    const phone = asText(data.phone, "+905350000000");
    const address = [data.address, data.apartment].map((item) => asText(item)).filter(Boolean).join(" ");
    const city = asText(data.city, "Istanbul");
    const country = asText(data.country, "Turkey");
    const zipCode = asText(data.postalCode, "34732");

    const iyzicoRequest: IyzicoInitializeRequest = {
      locale: "tr",
      conversationId,
      price: toPrice(subtotal),
      paidPrice: toPrice(total),
      currency: "TRY",
      basketId: String(order.id),
      paymentGroup: "PRODUCT",
      callbackUrl: `${siteUrl.replace(/\/$/, "")}/api/payments/iyzico/callback`,
      enabledInstallments: [1, 2, 3, 6, 9],
      buyer: {
        id: String(order.user?.id || order.id),
        name: firstName,
        surname: lastName,
        identityNumber: "11111111111",
        email,
        gsmNumber: phone,
        registrationAddress: address || "Istanbul",
        city,
        country,
        zipCode,
        ip: getClientIp(request),
      },
      shippingAddress: {
        address: address || "Istanbul",
        zipCode,
        contactName: `${firstName} ${lastName}`,
        city,
        country,
      },
      billingAddress: {
        address: address || "Istanbul",
        zipCode,
        contactName: `${firstName} ${lastName}`,
        city,
        country,
      },
      basketItems: products.map((cartItem, index) => {
        const dbProduct = dbProducts[index];
        const productId = cartItem.productId || cartItem.id;
        return {
          id: productId,
          price: toPrice(Number(cartItem.price || dbProduct?.discountPrice || dbProduct?.price || 0) * cartItem.quantity),
          name: dbProduct?.title || cartItem.title,
          category1: dbProduct?.category || cartItem.category || "fashion",
          category2: cartItem.size || cartItem.color || "ready-to-wear",
          itemType: "PHYSICAL",
        };
      }),
    };

    const iyzicoResponse = await initializeIyzicoCheckout(iyzicoRequest);
    if (iyzicoResponse.status !== "success" || !iyzicoResponse.token || !iyzicoResponse.paymentPageUrl) {
      throw new Error(iyzicoResponse.errorMessage || "iyzico checkout could not be initialized.");
    }

    await attachIyzicoTokenToPayment({
      orderId: order.id,
      token: iyzicoResponse.token,
      response: iyzicoResponse,
    });

    const pendingOrder = await getOrder(String(order.id));
    return NextResponse.json({
      orderId: pendingOrder?.id || order.id,
      token: iyzicoResponse.token,
      paymentPageUrl: iyzicoResponse.paymentPageUrl,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "iyzico checkout initialization failed";
    return NextResponse.json({ message }, { status: 400 });
  }
};
