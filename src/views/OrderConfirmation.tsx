import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n";
import { ArrowRight, CheckCircle2, ReceiptText } from "lucide-react";

const OrderConfirmation = () => {
  const { t } = useLanguage();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setOrderId(new URLSearchParams(window.location.search).get("orderId") || "");
  }, []);

  return (
    <main className="grid min-h-[calc(100vh-68px)] place-items-center bg-[#fbfaf8] px-5 py-10 md:px-8">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-stone-200 bg-white p-7 text-center shadow-[0_24px_80px_rgba(28,25,23,0.07)] sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f0e7] text-[#9b6b43]">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
          Payment verified
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-stone-950 sm:text-5xl">
          {t("orderConfirmation")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-stone-600">
          {t("orderConfirmed")}
        </p>
        {orderId && (
          <div className="mt-6 rounded-2xl border border-stone-200 bg-[#fbfaf8] p-4 text-sm text-stone-600">
            <ReceiptText className="mx-auto mb-2 h-5 w-5 text-[#9b6b43]" />
            Demo order <span className="font-bold text-stone-950">#{orderId}</span>{" "}
            was verified through iyzico sandbox.
          </div>
        )}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/shop"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-stone-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
          >
            {t("continueShopping")}
          </Link>
          <Link
            href="/order-history"
            className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-4 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
          >
            {t("seeOrderHistory")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};
export default OrderConfirmation;
