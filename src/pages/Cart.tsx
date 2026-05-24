import {
  HiCheck as CheckIcon,
  HiXMark as XMarkIcon,
} from "react-icons/hi2";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import {
  removeProductFromTheCart,
  updateProductQuantity,
} from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { useLanguage } from "../i18n";
import { LockKeyhole, ShoppingBag, Tag, Truck } from "lucide-react";

const Cart = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState("");
  const discount = appliedDiscount ? subtotal * 0.1 : 0;
  const shipping = subtotal === 0 ? 0 : 5;
  const tax = (subtotal - discount) / 5;
  const total = subtotal === 0 ? 0 : subtotal - discount + tax + shipping;
  const hasInvalidItems = useMemo(
    () =>
      productsInCart.some(
        (product) => product.stock <= 0 || product.quantity > product.stock
      ),
    [productsInCart]
  );

  if (productsInCart.length === 0) {
    return (
      <main className="grid min-h-[620px] place-items-center bg-[#fbfaf8] px-5 py-16">
        <div className="max-w-md rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-[0_24px_80px_rgba(28,25,23,0.07)]">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f0e7] text-[#9b6b43]">
            <ShoppingBag className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-serif text-4xl font-semibold text-stone-950">
            Your cart is empty.
          </h1>
          <p className="mt-3 leading-7 text-stone-600">
            Start shopping the latest dresses, essentials, and limited drops.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-stone-950 px-7 text-sm font-bold text-white transition hover:bg-[#9b6b43]"
          >
            Start shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#fbfaf8] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-8 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(28,25,23,0.07)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
            Secure checkout
          </p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-serif text-5xl font-semibold text-stone-950 max-sm:text-4xl">
                {t("cartTitle")}
              </h1>
              <p className="mt-3 text-stone-600">
                Review sizing, stock, and totals before moving to checkout.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex w-fit items-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50"
            >
              Continue shopping
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              {t("cartItems")}
            </h2>
            <ul className="grid gap-4">
              {productsInCart.map((product) => (
                <li
                  key={product.id}
                  className="grid gap-4 rounded-3xl border border-stone-200 bg-white p-4 shadow-[0_18px_45px_rgba(28,25,23,0.05)] sm:grid-cols-[160px_1fr]"
                >
                  <Link
                    to={`/product/${product.productId || product.id}`}
                    className="overflow-hidden rounded-2xl bg-stone-100"
                  >
                    <img
                      src={`/assets/${product.image}`}
                      alt={product.title}
                      className="h-56 w-full object-cover object-top transition duration-500 hover:scale-[1.03] sm:h-full"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-col justify-between gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${product.productId || product.id}`}
                          className="block truncate font-serif text-2xl font-semibold text-stone-950 transition hover:text-[#9b6b43]"
                        >
                          {product.title}
                        </Link>
                        <p className="mt-2 text-sm font-semibold text-stone-500">
                          {product.color} / {product.size}
                        </p>
                        <p className="mt-3 text-xl font-black text-stone-950">
                          ${product.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-200 text-stone-500 transition hover:border-red-200 hover:text-red-600"
                        onClick={() => {
                          dispatch(removeProductFromTheCart({ id: product.id }));
                          toast.error(t("removedCart"));
                        }}
                        aria-label={`${t("remove")} ${product.title}`}
                      >
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <label className="flex items-center gap-3 text-sm font-bold text-stone-700">
                        {t("quantity")}
                        <input
                          type="number"
                          className="h-11 w-20 rounded-full border border-stone-300 bg-[#fbfaf8] px-3 text-center text-sm font-semibold outline-none focus:border-stone-950"
                          value={product.quantity}
                          onChange={(event) => {
                            dispatch(
                              updateProductQuantity({
                                id: product.id,
                                quantity: parseInt(event.target.value),
                              })
                            );
                          }}
                          min={1}
                          max={product.stock || 1}
                        />
                      </label>
                      <p className="flex items-center gap-2 text-sm font-semibold text-stone-600">
                        {product.stock ? (
                          <CheckIcon className="h-5 w-5 text-green-600" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-red-600" />
                        )}
                        {product.stock ? t("inStock") : t("outStock")}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside
            aria-labelledby="summary-heading"
            className="h-fit rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(28,25,23,0.07)] lg:sticky lg:top-24"
          >
            <h2
              id="summary-heading"
              className="font-serif text-3xl font-semibold text-stone-950"
            >
              {t("orderSummary")}
            </h2>

            <div className="mt-6 rounded-2xl bg-[#fbfaf8] p-4">
              <label
                htmlFor="discountCode"
                className="flex items-center gap-2 text-sm font-bold text-stone-700"
              >
                <Tag className="h-4 w-4 text-[#9b6b43]" />
                Discount code
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  id="discountCode"
                  value={discountCode}
                  onChange={(event) => setDiscountCode(event.target.value)}
                  placeholder="SAVE10"
                  className="h-11 min-w-0 flex-1 rounded-full border border-stone-300 bg-white px-4 text-sm outline-none focus:border-stone-950"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (discountCode.trim().toUpperCase() === "SAVE10") {
                      setAppliedDiscount("SAVE10");
                      toast.success("Discount applied.");
                    } else {
                      setAppliedDiscount("");
                      toast.error("Use demo code SAVE10.");
                    }
                  }}
                  className="h-11 rounded-full bg-stone-950 px-4 text-sm font-bold text-white transition hover:bg-[#9b6b43]"
                >
                  Apply
                </button>
              </div>
              {appliedDiscount && (
                <p className="mt-2 text-sm font-semibold text-green-700">
                  SAVE10 applied: -${discount.toFixed(2)}
                </p>
              )}
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              <SummaryRow label={t("subtotal")} value={`$${subtotal.toFixed(2)}`} />
              <SummaryRow
                label={t("shippingEstimate")}
                value={`$${shipping.toFixed(2)}`}
              />
              <SummaryRow
                label={t("taxEstimate")}
                value={`$${tax.toFixed(2)}`}
              />
              {appliedDiscount && (
                <SummaryRow label="Discount" value={`-$${discount.toFixed(2)}`} />
              )}
              <div className="flex items-center justify-between border-t border-stone-200 pt-5">
                <dt className="text-base font-bold text-stone-950">
                  {t("orderTotal")}
                </dt>
                <dd className="font-serif text-3xl font-semibold text-stone-950">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>

            {hasInvalidItems && (
              <p className="mt-6 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">
                Update sold-out or overstock items before checkout.
              </p>
            )}
            <Link
              to={hasInvalidItems ? "/cart" : "/checkout"}
              className={`mt-6 inline-flex h-[52px] w-full items-center justify-center rounded-full px-6 py-4 text-sm font-bold text-white transition ${
                hasInvalidItems
                  ? "pointer-events-none bg-stone-300 text-stone-600"
                  : "bg-stone-950 hover:bg-[#9b6b43]"
              }`}
            >
              {t("checkout")}
            </Link>

            <div className="mt-5 grid gap-3 text-sm text-stone-600">
              <p className="flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-[#9b6b43]" />
                Secure encrypted checkout
              </p>
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#9b6b43]" />
                Tracked shipping and easy returns
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <dt className="text-stone-600">{label}</dt>
    <dd className="font-bold text-stone-950">{value}</dd>
  </div>
);

export default Cart;
