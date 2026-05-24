import {
  HiCheck as CheckIcon,
  HiXMark as XMarkIcon,
  HiQuestionMarkCircle as QuestionMarkCircleIcon,
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
      <main className="mx-auto grid min-h-[520px] max-w-screen-2xl place-items-center px-5 py-16">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-semibold text-gray-950">
            Your cart is empty.
          </h1>
          <p className="mt-3 text-gray-500">
            Start shopping now and build a cart from the latest collection.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-flex h-12 items-center justify-center rounded bg-gray-950 px-6 text-sm font-medium text-white transition hover:bg-secondaryBrown"
          >
            Start shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-white mx-auto max-w-screen-2xl px-5 max-[400px]:px-3">
      <div className="pb-24 pt-16">
        <h1 className="text-3xl tracking-tight text-gray-900 sm:text-4xl">
          {t("cartTitle")}
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              {t("cartItems")}
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {productsInCart.map((product) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={`/assets/${product.image}`}
                      alt={product.title}
                      className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link
                              to={`/product/${product.productId || product.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.title}
                            </Link>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.color}</p>
                          {product.size ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                              {product.size}
                            </p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${product.price}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor="quantity mr-5">{t("quantity")}: </label>
                        <input
                          type="number"
                          id="quantity"
                          className="w-16 h-7 indent-1 bg-white border"
                          value={product?.quantity}
                          onChange={(e) => {
                            dispatch(
                              updateProductQuantity({
                                id: product?.id,
                                quantity: parseInt(e.target.value),
                              })
                            );
                          }}
                          min={1}
                          max={product.stock || 1}
                        />
                        {product.quantity >= product.stock && (
                          <p className="mt-2 text-xs text-secondaryBrown">
                            Maximum available quantity selected.
                          </p>
                        )}

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={() =>{
                              dispatch(
                                removeProductFromTheCart({ id: product?.id })
                              ); toast.error(t("removedCart"));}
                            }
                          >
                            <span className="sr-only">{t("remove")}</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product?.stock ? (
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <XMarkIcon
                          className="h-5 w-5 flex-shrink-0 text-red-600"
                          aria-hidden="true"
                        />
                      )}

                      <span>
                        {product?.stock ? t("inStock") : t("outStock")}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Sipariş özeti */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              {t("orderSummary")}
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">{t("subtotal")}</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${subtotal}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <label htmlFor="discountCode" className="text-sm text-gray-600">
                  Discount code
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="discountCode"
                    value={discountCode}
                    onChange={(event) => setDiscountCode(event.target.value)}
                    placeholder="SAVE10"
                    className="h-10 min-w-0 flex-1 rounded border border-gray-300 px-3 text-sm outline-none focus:border-gray-950"
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
                    className="h-10 rounded bg-gray-950 px-3 text-sm font-medium text-white"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount && (
                  <p className="mt-2 text-sm text-green-700">
                    SAVE10 applied: -${discount.toFixed(2)}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>{t("shippingEstimate")}</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      {t("shippingEstimate")}
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5 text-secondaryBrown"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${shipping.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>{t("taxEstimate")}</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      {t("taxEstimate")}
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5 text-secondaryBrown"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${tax.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  {t("orderTotal")}
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>

              <div className="mt-6 space-y-3">
                {hasInvalidItems && (
                  <p className="rounded bg-red-50 p-3 text-sm text-red-700">
                    Update sold-out or overstock items before checkout.
                  </p>
                )}
                <Link
                  to={hasInvalidItems ? "/cart" : "/checkout"}
                  className={`text-white text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base ${
                    hasInvalidItems
                      ? "pointer-events-none bg-gray-300"
                      : "bg-secondaryBrown"
                  }`}
                >
                  {t("checkout")}
                </Link>
              </div>
          </section>
        </form>
      </div>
    </div>
  );
};
export default Cart;
