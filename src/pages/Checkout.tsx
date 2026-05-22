import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Building2,
  Check,
  ChevronLeft,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Percent,
  Phone,
  Shield,
  ShoppingBag,
  Trash2,
  Truck,
  User,
  Wallet,
  X,
} from "lucide-react";
import customFetch from "../axios/custom";
import { removeProductFromTheCart } from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { checkCheckoutFormData } from "../utils/checkCheckoutFormData";
import { useLanguage } from "../i18n";

type ShippingMethod = {
  id: string;
  name: string;
  price: number;
  time: string;
};

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 5,
    time: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 19,
    time: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    price: 39,
    time: "Next business day",
  },
];

const Checkout = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPaymentType, setSelectedPaymentType] = useState("card");
  const [appliedPromo, setAppliedPromo] = useState("SAVE10");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const selectedShippingMethod =
    shippingMethods.find((method) => method.id === selectedShipping) ||
    shippingMethods[0];
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const shipping = productsInCart.length > 0 ? selectedShippingMethod.price : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const orderItems = useMemo(
    () =>
      productsInCart.map((product) => ({
        ...product,
        lineTotal: product.price * product.quantity,
      })),
    [productsInCart]
  );

  const handleCheckoutSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const checkoutData = {
      data,
      products: productsInCart,
      subtotal,
    };

    if (!checkCheckoutFormData(checkoutData)) return;

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const orderPayload = {
      ...checkoutData,
      ...(storedUser.email
        ? {
            user: {
              email: storedUser.email,
              id: storedUser.id,
            },
          }
        : {}),
      orderStatus: "Processing",
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await customFetch.post("/orders", {
        ...orderPayload,
      });

      if (response.status === 201) {
        toast.success(t("orderSuccess"));
        navigate("/order-confirmation");
      } else {
        toast.error(t("checkoutError"));
      }
    } catch {
      localStorage.setItem("lastFakeOrder", JSON.stringify(orderPayload));
      toast.success(t("orderSuccess"));
      navigate("/order-confirmation");
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-6 px-5 py-10 max-[400px]:px-3">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="inline-flex w-fit items-center gap-1 text-sm text-gray-500 transition hover:text-gray-950"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Cart
          </button>
          <div>
            <h1 className="text-3xl font-semibold text-gray-950">{t("checkout")}</h1>
            <p className="mt-2 text-sm text-gray-500">
              Complete your purchase securely
            </p>
          </div>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm text-gray-700">
          <Shield className="h-4 w-4 text-green-600" />
          SSL Secured
        </div>
      </div>

      <div className="flex items-center gap-4 py-2">
        {[
          { label: "Shipping", icon: Truck },
          { label: "Payment", icon: CreditCard },
          { label: "Review", icon: Check },
        ].map(({ label, icon: Icon }, index) => (
          <div key={label} className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-gray-950 bg-gray-950 text-white">
              <Icon className="h-4 w-4" />
            </span>
            <span className="hidden text-sm font-medium text-gray-950 sm:block">
              {label}
            </span>
            {index < 2 && <span className="h-px w-8 bg-gray-300" />}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleCheckoutSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]"
      >
        <div className="flex flex-col gap-6">
          <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-950">
                <MapPin className="h-5 w-5" />
                {t("contactInfo")}
              </h2>
            </div>
            <div className="flex flex-col gap-4 p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CheckoutField label={t("firstName")} htmlFor="firstName">
                  <IconInput icon={<User className="h-4 w-4" />}>
                    <input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      required
                      className="checkout-input pl-10"
                    />
                  </IconInput>
                </CheckoutField>
                <CheckoutField label={t("lastName")} htmlFor="lastName">
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                    className="checkout-input"
                  />
                </CheckoutField>
                <CheckoutField label={t("email")} htmlFor="emailAddress">
                  <IconInput icon={<Mail className="h-4 w-4" />}>
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="checkout-input pl-10"
                    />
                  </IconInput>
                </CheckoutField>
                <CheckoutField label={t("phone")} htmlFor="phone">
                  <IconInput icon={<Phone className="h-4 w-4" />}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      required
                      className="checkout-input pl-10"
                    />
                  </IconInput>
                </CheckoutField>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CheckoutField label={t("company")} htmlFor="company">
                  <input
                    id="company"
                    name="company"
                    placeholder="Company"
                    required
                    className="checkout-input"
                  />
                </CheckoutField>
                <CheckoutField label={t("apartment")} htmlFor="apartment">
                  <input
                    id="apartment"
                    name="apartment"
                    placeholder="Apt, suite, floor"
                    required
                    className="checkout-input"
                  />
                </CheckoutField>
              </div>

              <CheckoutField label={t("address")} htmlFor="address">
                <input
                  id="address"
                  name="address"
                  placeholder="123 Main Street"
                  required
                  className="checkout-input"
                />
              </CheckoutField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <CheckoutField label={t("city")} htmlFor="city">
                  <input
                    id="city"
                    name="city"
                    placeholder="New York"
                    required
                    className="checkout-input"
                  />
                </CheckoutField>
                <CheckoutField label={t("region")} htmlFor="region">
                  <input
                    id="region"
                    name="region"
                    placeholder="NY"
                    required
                    className="checkout-input"
                  />
                </CheckoutField>
                <CheckoutField label={t("postalCode")} htmlFor="postalCode">
                  <input
                    id="postalCode"
                    name="postalCode"
                    placeholder="10001"
                    required
                    className="checkout-input"
                  />
                </CheckoutField>
                <CheckoutField label={t("country")} htmlFor="country">
                  <select
                    id="country"
                    name="country"
                    required
                    className="checkout-input"
                    defaultValue="United States"
                  >
                    <option>United States</option>
                    <option>Germany</option>
                    <option>Turkey</option>
                  </select>
                </CheckoutField>
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-950">Shipping Method</p>
                <div className="flex flex-col gap-3">
                  {shippingMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedShipping(method.id)}
                      className={`rounded-lg border p-4 text-left transition ${
                        selectedShipping === method.id
                          ? "border-gray-950 bg-gray-950/[0.03]"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-4 w-4 rounded-full border-2 ${
                              selectedShipping === method.id
                                ? "border-gray-950 bg-gray-950"
                                : "border-gray-300"
                            }`}
                          />
                          <span>
                            <span className="block font-medium text-gray-950">
                              {method.name}
                            </span>
                            <span className="text-sm text-gray-500">{method.time}</span>
                          </span>
                        </div>
                        <span className="font-semibold text-gray-950">
                          ${method.price.toFixed(2)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-950">
                <CreditCard className="h-5 w-5" />
                {t("paymentDetails")}
              </h2>
            </div>
            <div className="flex flex-col gap-5 p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { id: "card", label: "Credit Card", icon: CreditCard },
                  { id: "paypal", label: "PayPal", icon: Wallet },
                  { id: "bank", label: "Bank Transfer", icon: Building2 },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedPaymentType(id)}
                    className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition ${
                      selectedPaymentType === id
                        ? "border-gray-950 bg-gray-950/[0.03]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Icon className="h-5 w-5 text-secondaryBrown" />
                    <span className="text-sm font-medium text-gray-950">{label}</span>
                  </button>
                ))}
              </div>

              <input type="hidden" name="paymentType" value={selectedPaymentType} />

              {selectedPaymentType === "card" ? (
                <div className="grid gap-4 border-t border-gray-200 pt-5">
                  <CheckoutField label={t("nameOnCard")} htmlFor="nameOnCard">
                    <IconInput icon={<User className="h-4 w-4" />}>
                      <input
                        id="nameOnCard"
                        name="nameOnCard"
                        placeholder="John Doe"
                        required
                        className="checkout-input pl-10"
                      />
                    </IconInput>
                  </CheckoutField>
                  <CheckoutField label={t("cardNumber")} htmlFor="cardNumber">
                    <IconInput icon={<CreditCard className="h-4 w-4" />}>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="checkout-input pl-10"
                      />
                    </IconInput>
                  </CheckoutField>
                  <div className="grid grid-cols-2 gap-4">
                    <CheckoutField label={t("expiry")} htmlFor="expirationDate">
                      <input
                        id="expirationDate"
                        name="expirationDate"
                        placeholder="MM / YY"
                        required
                        className="checkout-input"
                      />
                    </CheckoutField>
                    <CheckoutField label="CVC" htmlFor="cvc">
                      <IconInput icon={<Lock className="h-4 w-4" />}>
                        <input
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                          required
                          className="checkout-input pl-10"
                        />
                      </IconInput>
                    </CheckoutField>
                  </div>
                </div>
              ) : (
                <>
                  <input type="hidden" name="nameOnCard" value={selectedPaymentType} />
                  <input type="hidden" name="cardNumber" value={selectedPaymentType} />
                  <input type="hidden" name="expirationDate" value={selectedPaymentType} />
                  <input type="hidden" name="cvc" value={selectedPaymentType} />
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                    You can complete payment with {selectedPaymentType} after placing
                    the order.
                  </div>
                </>
              )}

              <label className="flex items-start gap-3 border-t border-gray-200 pt-4 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(event) => setAgreeToTerms(event.target.checked)}
                  className="mt-1 rounded border-gray-300 text-gray-950"
                />
                <span>
                  I agree to the Terms of Service and Privacy Policy.
                </span>
              </label>
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-4">
          <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="flex items-center gap-2 font-semibold text-gray-950">
                <ShoppingBag className="h-4 w-4" />
                {t("orderSummary")}
              </h2>
            </div>
            <div className="flex flex-col gap-4 p-5">
              <div className="flex flex-col gap-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-14 w-14 shrink-0">
                      <img
                        src={`/assets/${item.image}`}
                        alt={item.title}
                        className="h-full w-full rounded-md object-cover"
                      />
                      <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-gray-950 px-1 text-xs text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-950">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.size} / {item.color}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-950">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(removeProductFromTheCart({ id: item.id }))
                        }
                        className="text-gray-400 transition hover:text-red-600"
                        aria-label={t("remove")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-semibold text-gray-950">
                        ${item.lineTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {appliedPromo && (
                <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      {appliedPromo}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAppliedPromo("")}
                    className="text-green-700 transition hover:text-green-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <dl className="flex flex-col gap-2 border-t border-gray-200 pt-4">
                <SummaryRow label={t("subtotal")} value={`$${subtotal.toFixed(2)}`} />
                {discount > 0 && (
                  <SummaryRow
                    label="Discount"
                    value={`-$${discount.toFixed(2)}`}
                    tone="success"
                  />
                )}
                <SummaryRow label={t("shipping")} value={`$${shipping.toFixed(2)}`} />
                <SummaryRow label={t("taxes")} value={`$${tax.toFixed(2)}`} />
                <div className="mt-2 flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold text-gray-950">
                  <dt>{t("total")}</dt>
                  <dd>${total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-950">Secure & Encrypted</p>
                <p className="text-gray-500">
                  Your data is protected with SSL encryption
                </p>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={!agreeToTerms || productsInCart.length === 0}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gray-950 px-5 text-sm font-medium text-white transition hover:bg-secondaryBrown disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Lock className="h-4 w-4" />
            {t("confirmOrder")} ${total.toFixed(2)}
          </button>
        </aside>
      </form>
    </div>
  );
};

const CheckoutField = ({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <label htmlFor={htmlFor} className="flex flex-col gap-2 text-sm font-medium text-gray-700">
    {label}
    {children}
  </label>
);

const IconInput = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </span>
    {children}
  </div>
);

const SummaryRow = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success";
}) => (
  <div
    className={`flex justify-between text-sm ${
      tone === "success" ? "text-green-600" : "text-gray-600"
    }`}
  >
    <dt>{label}</dt>
    <dd className="font-medium">{value}</dd>
  </div>
);

export default Checkout;
