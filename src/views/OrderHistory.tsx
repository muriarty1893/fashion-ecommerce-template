import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import customFetch from "../axios/custom";
import { formatDate } from "../utils/formatDate";

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

  return (
    <div className="max-w-screen-2xl mx-auto pt-20 px-5">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Order ID</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Total</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => order?.user && user?.id && String(order.user.id) === String(user.id) && (
              <tr key={order.id}>
                <td className="py-3 px-4 border-b text-center">{order.id}</td>
                <td className="py-3 px-4 border-b text-center">{ formatDate(order.orderDate) }</td>
                <td className="py-3 px-4 border-b text-center">
                  ${order.subtotal + 5 + (order.subtotal / 5)}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  { order.orderStatus }
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <Link
                    href={`/order-history/${order.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
