import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import customFetch from "../axios/custom";
import { nanoid } from "nanoid";
import { formatDate } from "../utils/formatDate";
import Link from "next/link";
import { ArrowLeft, Package, ReceiptText } from "lucide-react";

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const orderTotals = (order: Order) => {
  const discount = order.discount ?? 0;
  const shipping = order.shipping ?? 5;
  const tax = order.tax ?? order.subtotal / 5;
  const total = order.total ?? order.subtotal + shipping + tax - discount;

  return { discount, shipping, tax, total };
};

const statusClassName = (status?: string) => {
  const normalized = status?.toLowerCase() || "processing";

  if (normalized.includes("deliver") || normalized.includes("complete")) {
    return "bg-green-50 text-green-700 ring-green-200";
  }

  if (normalized.includes("cancel") || normalized.includes("fail")) {
    return "bg-red-50 text-red-700 ring-red-200";
  }

  return "bg-[#f8f0e7] text-[#9b6b43] ring-[#ead7bd]";
};

const SingleOrderHistory = () => {
  const [singleOrder, setSingleOrder] = useState<Order | null>(null);
  const params = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}") as User;

    if (!user?.id) {
      toast.error("Please login to view this page");
      router.push("/login");
      return;
    }

    const fetchOrder = async () => {
      const response = await customFetch(`/orders/${params.id}`);
      setSingleOrder(response.data);
    };

    fetchOrder();
  }, [params.id, router]);

  if (!singleOrder) return null;

  const totals = orderTotals(singleOrder);

  return (
    <main className="bg-[#fbfaf8] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-screen-2xl">
        <Link
          href="/order-history"
          className="mb-5 inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-4 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>

        <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(28,25,23,0.07)] sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
                Order details
              </p>
              <h1 className="mt-3 font-serif text-4xl font-semibold text-stone-950 sm:text-5xl">
                Order #{singleOrder.id}
              </h1>
              <p className="mt-3 text-stone-600">
                Placed {formatDate(singleOrder.orderDate)}
              </p>
            </div>
            <span className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-bold ring-1 ${statusClassName(singleOrder.orderStatus)}`}>
              {singleOrder.orderStatus || "Processing"}
            </span>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="overflow-hidden rounded-3xl border border-stone-200">
              <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-5 py-4">
                <Package className="h-5 w-5 text-[#9b6b43]" />
                <h2 className="font-serif text-2xl font-semibold text-stone-950">
                  Items
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="singleOrder-table min-w-[620px] w-full text-left text-sm">
                  <thead className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                    <tr>
                      <th className="px-5 py-4">Product</th>
                      <th className="px-5 py-4 text-center">Quantity</th>
                      <th className="px-5 py-4 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {singleOrder.products.map((product) => (
                      <tr key={nanoid()} className="text-stone-700">
                        <td className="px-5 py-4 font-bold text-stone-950">
                          {product?.title}
                          <p className="mt-1 text-xs font-semibold text-stone-500">
                            {product?.color} / {product?.size}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-center">{product?.quantity}</td>
                        <td className="px-5 py-4 text-right font-bold text-stone-950">
                          {formatCurrency(product?.price || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-stone-200 bg-[#fbfaf8] p-5">
              <div className="flex items-center gap-2">
                <ReceiptText className="h-5 w-5 text-[#9b6b43]" />
                <h2 className="font-serif text-2xl font-semibold text-stone-950">
                  Summary
                </h2>
              </div>
              <dl className="mt-5 space-y-4 text-sm">
                <SummaryRow label="Subtotal" value={formatCurrency(singleOrder.subtotal)} />
                {totals.discount > 0 && (
                  <SummaryRow label="Discount" value={`-${formatCurrency(totals.discount)}`} />
                )}
                <SummaryRow label="Shipping" value={formatCurrency(totals.shipping)} />
                <SummaryRow label="Tax" value={formatCurrency(totals.tax)} />
                <div className="flex items-center justify-between border-t border-stone-200 pt-5">
                  <dt className="font-bold text-stone-950">Total</dt>
                  <dd className="font-serif text-3xl font-semibold text-stone-950">
                    {formatCurrency(totals.total)}
                  </dd>
                </div>
              </dl>
              {singleOrder.payment?.providerPaymentId && (
                <p className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-stone-600">
                  iyzico payment id:{" "}
                  <span className="font-bold text-stone-950">
                    {singleOrder.payment.providerPaymentId}
                  </span>
                </p>
              )}
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-stone-600">
    <dt>{label}</dt>
    <dd className="font-bold text-stone-950">{value}</dd>
  </div>
);

export default SingleOrderHistory;
