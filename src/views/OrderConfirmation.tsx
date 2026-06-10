import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n";

const OrderConfirmation = () => {
  const { t } = useLanguage();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setOrderId(new URLSearchParams(window.location.search).get("orderId") || "");
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto pt-20">
      <h1 className="text-5xl font-light text-center">{t("orderConfirmation")}</h1>
      <p className="text-center mt-5 text-lg">
        {t("orderConfirmed")}
      </p>
      {orderId && (
        <p className="mt-3 text-center text-sm text-gray-500">
          Order #{orderId} was verified through iyzico sandbox.
        </p>
      )}
      <Link
        href="/shop"
        className="text-white bg-secondaryBrown text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-[400px] mx-auto mt-5 h-12 flex items-center justify-center max-md:text-base"
      >
        {t("continueShopping")}
      </Link>
      <Link
        href="/order-history"
        className="text-white bg-secondaryBrown text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-[400px] mx-auto mt-5 h-12 flex items-center justify-center max-md:text-base"
      >
        {t("seeOrderHistory")}
      </Link>
    </div>
  );
};
export default OrderConfirmation;
