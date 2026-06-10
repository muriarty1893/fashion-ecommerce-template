import { NextResponse } from "next/server";
import { finalizeIyzicoPayment, getPaymentByIyzicoToken } from "../../../../../lib/storeDb";
import { retrieveIyzicoCheckout } from "../../../../../lib/iyzico";

export const dynamic = "force-dynamic";

const redirectTo = (request: Request, path: string) => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get("origin") ||
    new URL(request.url).origin;

  return NextResponse.redirect(`${siteUrl.replace(/\/$/, "")}${path}`, 303);
};

const handleCallback = async (request: Request) => {
  const formData = await request.formData();
  const token = String(formData.get("token") || "");

  if (!token) {
    return redirectTo(request, "/checkout?payment=failed");
  }

  try {
    const payment = await getPaymentByIyzicoToken(token);
    if (!payment) {
      return redirectTo(request, "/checkout?payment=failed");
    }

    if (payment.payment_status === "paid") {
      return redirectTo(request, `/order-confirmation?orderId=${payment.order_id}`);
    }

    const result = await retrieveIyzicoCheckout(
      token,
      payment.provider_conversation_id || undefined,
    );

    const paymentStatus =
      result.status === "success" &&
      result.paymentStatus === "SUCCESS" &&
      result.fraudStatus === 1
        ? "paid"
        : result.status === "success" &&
            result.paymentStatus === "SUCCESS" &&
            result.fraudStatus === 0
          ? "review"
          : "failed";

    const order = await finalizeIyzicoPayment({
      token,
      status: paymentStatus,
      providerPaymentId: result.paymentId,
      response: result,
    });

    if (paymentStatus === "paid" || paymentStatus === "review") {
      return redirectTo(
        request,
        `/order-confirmation?orderId=${order?.id || payment.order_id}`,
      );
    }

    return redirectTo(request, "/checkout?payment=failed");
  } catch {
    return redirectTo(request, "/checkout?payment=failed");
  }
};

export const POST = handleCallback;
