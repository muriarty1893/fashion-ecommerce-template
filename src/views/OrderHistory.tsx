import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import customFetch from "../axios/custom";
import { formatDate } from "../utils/formatDate";
import { ArrowRight, PackageSearch, ReceiptText } from "lucide-react";

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const orderTotal = (order: Order) =>
  order.total ?? order.subtotal + (order.shipping ?? 5) + (order.tax ?? order.subtotal / 5) - (order.discount ?? 0);

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

const OrderHistory = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}") as User;
    setUser(storedUser);

    if (!storedUser?.id) {
      toast.error("Please login to view this page");
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await customFetch.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [router]);

  const userOrders = orders.filter(
    (order) => order?.user && user?.id && String(order.user.id) === String(user.id)
  );

  return (
    <main className="bg-[#fbfaf8] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-screen-2xl">
        <section className="mb-8 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(28,25,23,0.07)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
            Account
          </p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-serif text-4xl font-semibold text-stone-950 sm:text-5xl">
                Order History
              </h1>
              <p className="mt-3 text-stone-600">
                Review demo orders placed from this storefront account.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex h-[52px] w-fit items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-4 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
            >
              Continue shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {userOrders.length === 0 ? (
          <section className="rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-[0_18px_45px_rgba(28,25,23,0.05)]">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f0e7] text-[#9b6b43]">
              <PackageSearch className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-serif text-3xl font-semibold text-stone-950">
              No orders yet.
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-7 text-stone-600">
              Orders placed with this demo account will appear here.
            </p>
          </section>
        ) : (
          <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_80px_rgba(28,25,23,0.07)]">
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full text-left text-sm">
                <thead className="bg-stone-50 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                  <tr>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {userOrders.map((order) => (
                    <tr key={order.id} className="text-stone-700">
                      <td className="px-6 py-5 font-bold text-stone-950">
                        <span className="inline-flex items-center gap-2">
                          <ReceiptText className="h-4 w-4 text-[#9b6b43]" />
                          #{order.id}
                        </span>
                      </td>
                      <td className="px-6 py-5">{formatDate(order.orderDate)}</td>
                      <td className="px-6 py-5 font-bold text-stone-950">
                        {formatCurrency(orderTotal(order))}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusClassName(order.orderStatus)}`}>
                          {order.orderStatus || "Processing"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/order-history/${order.id}`}
                          className="inline-flex h-[52px] items-center justify-center rounded-full bg-stone-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default OrderHistory;
