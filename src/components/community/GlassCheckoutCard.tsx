import { Calendar, CreditCard, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../../i18n";

type GlassCheckoutCardProps = {
  amount: number;
};

const fieldClass =
  "w-full rounded-lg border border-white/40 bg-white/70 px-3 py-2 text-sm outline-none backdrop-blur-sm transition focus:border-secondaryBrown focus:bg-white";

const GlassCheckoutCard = ({ amount }: GlassCheckoutCardProps) => {
  const [paymentType, setPaymentType] = useState("credit-card");
  const { t } = useLanguage();
  const methods = [
    { id: "credit-card", label: t("card") },
    { id: "paypal", label: "PayPal" },
    { id: "etransfer", label: "eTransfer" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-xl shadow-black/10 backdrop-blur-md"
    >
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-950">{t("paymentDetails")}</h2>
        <p className="mt-1 text-sm text-gray-600">
          {t("paymentSecure")}
        </p>
      </div>

      <fieldset>
        <legend className="sr-only">{t("paymentType")}</legend>
        <div className="mb-6 grid grid-cols-3 gap-2">
          {methods.map((method) => (
            <label
              key={method.id}
              className={`flex h-12 cursor-pointer items-center justify-center rounded-lg border text-sm transition ${
                paymentType === method.id
                  ? "border-secondaryBrown bg-secondaryBrown text-white"
                  : "border-gray-300 bg-white/60 text-gray-800 hover:bg-white"
              }`}
            >
              <input
                type="radio"
                name="paymentType"
                value={method.id}
                checked={paymentType === method.id}
                onChange={() => setPaymentType(method.id)}
                className="sr-only"
              />
              {method.id === "credit-card" ? (
                <CreditCard className="mr-2 h-4 w-4" />
              ) : null}
              {method.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-gray-700">
          {t("cardNumber")}
          <span className="relative">
            <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              id="card-number"
              name="cardNumber"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
              className={`${fieldClass} pl-10`}
              required
            />
          </span>
        </label>

        <label className="grid gap-2 text-sm font-medium text-gray-700">
          {t("nameOnCard")}
          <input
            type="text"
            id="name-on-card"
            name="nameOnCard"
            autoComplete="cc-name"
            placeholder="Jane Ward"
            className={fieldClass}
            required
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="grid gap-2 text-sm font-medium text-gray-700">
            {t("expiry")}
            <span className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                name="expirationDate"
                id="expiration-date"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                className={`${fieldClass} pl-10`}
                required
              />
            </span>
          </label>

          <label className="grid gap-2 text-sm font-medium text-gray-700">
            CVC
            <span className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                name="cvc"
                id="cvc"
                autoComplete="csc"
                placeholder="123"
                className={`${fieldClass} pl-10`}
                required
              />
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-gray-950 text-sm font-medium text-white shadow-lg shadow-black/20 transition hover:bg-secondaryBrown"
      >
        {t("pay")} ${amount.toFixed(2)}
      </button>

      <p className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-500">
        <Lock className="h-3 w-3" />
        {t("paymentEncrypted")}
      </p>
    </motion.div>
  );
};

export default GlassCheckoutCard;
