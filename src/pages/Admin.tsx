import { FormEvent, ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  DollarSign,
  Home,
  LayoutDashboard,
  Menu,
  PackagePlus,
  Search,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import db from "../data/db.json";
import { formatCategoryName } from "../utils/formatCategoryName";
import { useLanguage } from "../i18n";

type AdminOrder = {
  id: number;
  subtotal: number;
  orderStatus?: string;
  user?: {
    email?: string;
    id?: number;
  };
  data?: {
    emailAddress?: string;
  };
};

type AdminUser = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role?: string;
};

type ProductForm = {
  title: string;
  image: string;
  category: string;
  price: string;
  stock: string;
};

type AdminView = "dashboard" | "products" | "orders" | "customers" | "settings";

const categoryOptions = [
  "special-edition",
  "luxury-collection",
  "summer-edition",
  "unique-collection",
];

const initialForm: ProductForm = {
  title: "",
  image: "product image 1.jpg",
  category: "luxury-collection",
  price: "",
  stock: "",
};

const viewLabels: Record<AdminView, string> = {
  dashboard: "Dashboard",
  products: "Products",
  orders: "Orders",
  customers: "Customers",
  settings: "Settings",
};

const Admin = () => {
  const [products, setProducts] = useState<Product[]>(db.products as Product[]);
  const [orders, setOrders] = useState<AdminOrder[]>(
    db.orders as unknown as AdminOrder[]
  );
  const [users] = useState<AdminUser[]>(db.users as unknown as AdminUser[]);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [activeView, setActiveView] = useState<AdminView>("dashboard");
  const [settings, setSettings] = useState({
    storeName: "MODE",
    currency: "USD",
    freeShippingThreshold: "250",
    lowStockThreshold: "20",
    allowGuestCheckout: true,
    emailNotifications: true,
  });
  const { language } = useLanguage();

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      ),
    [products, query]
  );

  const revenue = orders.reduce((total, order) => total + (order.subtotal || 0), 0);
  const lowStockLimit = Number(settings.lowStockThreshold) || 20;
  const lowStockCount = products.filter((product) => product.stock < lowStockLimit).length;
  const averageOrder = orders.length > 0 ? Math.round(revenue / orders.length) : 0;

  const handleProductSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextProduct: Product = {
      id: String(Date.now()),
      title: form.title,
      image: form.image,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      popularity: 1,
    };

    if (!nextProduct.title || !nextProduct.price) return;
    setProducts((currentProducts) => [nextProduct, ...currentProducts]);
    setForm(initialForm);
  };

  const updateProduct = (
    id: string,
    field: "price" | "stock",
    value: number
  ) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const updateOrderStatus = (id: number, orderStatus: string) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id ? { ...order, orderStatus } : order
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#ebedef] text-[#3c4b64]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 bg-[#303c54] text-white lg:block">
          <div className="flex h-16 items-center border-b border-white/10 px-6">
            <span className="text-xl font-semibold tracking-wide">MODE Admin</span>
          </div>
          <nav className="space-y-1 px-3 py-4 text-sm">
            <AdminNavItem
              active={activeView === "dashboard"}
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              onClick={() => setActiveView("dashboard")}
            />
            <AdminNavItem
              active={activeView === "products"}
              icon={<Boxes size={18} />}
              label="Products"
              onClick={() => setActiveView("products")}
            />
            <AdminNavItem
              active={activeView === "orders"}
              icon={<ClipboardList size={18} />}
              label="Orders"
              onClick={() => setActiveView("orders")}
            />
            <AdminNavItem
              active={activeView === "customers"}
              icon={<Users size={18} />}
              label="Customers"
              onClick={() => setActiveView("customers")}
            />
            <AdminNavItem
              active={activeView === "settings"}
              icon={<Settings size={18} />}
              label="Settings"
              onClick={() => setActiveView("settings")}
            />
          </nav>
          <div className="mx-4 mt-6 rounded border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/50">Preview</p>
            <p className="mt-2 text-sm text-white/80">
              Local admin tools for fake storefront data.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#d8dbe0] bg-white px-4 shadow-sm md:px-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded border border-[#d8dbe0] text-[#768192] lg:hidden"
                aria-label="Open admin menu"
              >
                <Menu size={18} />
              </button>
              <div>
                <p className="text-xs text-[#768192]">Home / Admin</p>
                <h1 className="text-lg font-semibold text-[#3c4b64]">
                  {viewLabels[activeView]}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#768192]"
                  size={16}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products"
                  className="h-9 w-64 rounded border border-[#d8dbe0] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#321fdb]"
                />
              </div>
              <Link
                to="/"
                className="inline-flex h-9 items-center gap-2 rounded bg-[#321fdb] px-3 text-sm font-medium text-white"
              >
                <Home size={16} />
                Storefront
              </Link>
            </div>
          </header>

          <div className="px-4 py-5 md:px-6">
            <div className="mb-5 rounded border border-[#d8dbe0] bg-white px-4 py-3 text-sm text-[#768192]">
              Admin / Store operations / {viewLabels[activeView]}
            </div>

            {(activeView === "dashboard" || activeView === "products") && (
              <div className="relative mb-5 sm:hidden">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#768192]"
                  size={16}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products"
                  className="h-9 w-full rounded border border-[#d8dbe0] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#321fdb]"
                />
              </div>
            )}

            {activeView === "dashboard" && (
              <>
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <MetricCard
                    color="bg-[#321fdb]"
                    icon={<ShoppingBag size={20} />}
                    label="Orders"
                    value={orders.length.toString()}
                    detail="All fake orders"
                  />
                  <MetricCard
                    color="bg-[#2eb85c]"
                    icon={<DollarSign size={20} />}
                    label="Revenue"
                    value={`$${revenue.toLocaleString()}`}
                    detail="Order subtotal sum"
                  />
                  <MetricCard
                    color="bg-[#39f]"
                    icon={<Boxes size={20} />}
                    label="Products"
                    value={products.length.toString()}
                    detail={`${lowStockCount} low stock`}
                  />
                  <MetricCard
                    color="bg-[#f9b115]"
                    icon={<BarChart3 size={20} />}
                    label="Avg. order"
                    value={`$${averageOrder.toLocaleString()}`}
                    detail="Estimated basket"
                  />
                </section>

                <section className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                  <AdminPanel
                    title="Recent Orders"
                    subtitle="Newest fake orders from local data."
                  >
                    <OrdersTable orders={orders.slice(0, 5)} updateOrderStatus={updateOrderStatus} />
                  </AdminPanel>
                  <AdminPanel
                    title="Inventory Alerts"
                    subtitle={`${lowStockCount} products below ${lowStockLimit} stock.`}
                  >
                    <div className="divide-y divide-[#d8dbe0]">
                      {products
                        .filter((product) => product.stock < lowStockLimit)
                        .slice(0, 6)
                        .map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between gap-3 py-3"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <img
                                src={`/assets/${product.image}`}
                                alt={product.title}
                                className="h-10 w-10 rounded object-cover"
                              />
                              <div className="min-w-0">
                                <p className="truncate font-medium text-[#3c4b64]">
                                  {product.title}
                                </p>
                                <p className="text-sm text-[#768192]">
                                  {formatCategoryName(product.category, language)}
                                </p>
                              </div>
                            </div>
                            <span className="rounded bg-[#fff3cd] px-2 py-1 text-sm text-[#997404]">
                              {product.stock} left
                            </span>
                          </div>
                        ))}
                    </div>
                  </AdminPanel>
                </section>
              </>
            )}

            {activeView === "products" && (
              <section className="grid gap-5 xl:grid-cols-[360px_1fr]">
                <AdminPanel
                  title="Add Product"
                  subtitle="Create local preview products for the storefront."
                >
                  <form onSubmit={handleProductSubmit} className="grid gap-4">
                    <div className="flex items-center gap-3 rounded bg-[#f8f9fa] p-3">
                      <span className="grid h-10 w-10 place-items-center rounded bg-[#321fdb] text-white">
                        <PackagePlus size={18} />
                      </span>
                      <p className="text-sm text-[#768192]">
                        Changes are stored in browser state for this preview.
                      </p>
                    </div>
                    <AdminField label="Product name">
                      <input
                        value={form.title}
                        onChange={(event) =>
                          setForm({ ...form, title: event.target.value })
                        }
                        className="admin-input"
                        placeholder="Structured Evening Dress"
                      />
                    </AdminField>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <AdminField label="Price">
                        <input
                          type="number"
                          value={form.price}
                          onChange={(event) =>
                            setForm({ ...form, price: event.target.value })
                          }
                          className="admin-input"
                          placeholder="2400"
                        />
                      </AdminField>
                      <AdminField label="Stock">
                        <input
                          type="number"
                          value={form.stock}
                          onChange={(event) =>
                            setForm({ ...form, stock: event.target.value })
                          }
                          className="admin-input"
                          placeholder="30"
                        />
                      </AdminField>
                    </div>
                    <AdminField label="Category">
                      <select
                        value={form.category}
                        onChange={(event) =>
                          setForm({ ...form, category: event.target.value })
                        }
                        className="admin-input"
                      >
                        {categoryOptions.map((category) => (
                          <option key={category} value={category}>
                            {formatCategoryName(category, language)}
                          </option>
                        ))}
                      </select>
                    </AdminField>
                    <AdminField label="Image file">
                      <select
                        value={form.image}
                        onChange={(event) =>
                          setForm({ ...form, image: event.target.value })
                        }
                        className="admin-input"
                      >
                        {products.slice(0, 12).map((product) => (
                          <option key={product.image} value={product.image}>
                            {product.image}
                          </option>
                        ))}
                      </select>
                    </AdminField>
                    <button
                      type="submit"
                      className="h-10 rounded bg-[#321fdb] px-4 text-sm font-medium text-white transition hover:bg-[#2819b8]"
                    >
                      Add product
                    </button>
                  </form>
                </AdminPanel>

                <AdminPanel
                  title="Inventory"
                  subtitle={`${filteredProducts.length} visible products, ${lowStockCount} low-stock items`}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm">
                      <thead className="border-b border-[#d8dbe0] bg-[#f8f9fa] text-xs uppercase text-[#768192]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Product</th>
                          <th className="px-4 py-3 font-semibold">Category</th>
                          <th className="px-4 py-3 font-semibold">Price</th>
                          <th className="px-4 py-3 font-semibold">Stock</th>
                          <th className="px-4 py-3 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#d8dbe0]">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-[#f8f9fa]">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={`/assets/${product.image}`}
                                  alt={product.title}
                                  className="h-11 w-11 rounded object-cover"
                                />
                                <span className="font-medium text-[#3c4b64]">
                                  {product.title}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-[#768192]">
                              {formatCategoryName(product.category, language)}
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={product.price}
                                onChange={(event) =>
                                  updateProduct(
                                    product.id,
                                    "price",
                                    Number(event.target.value)
                                  )
                                }
                                className="h-8 w-24 rounded border border-[#d8dbe0] px-2 text-sm"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={product.stock}
                                onChange={(event) =>
                                  updateProduct(
                                    product.id,
                                    "stock",
                                    Number(event.target.value)
                                  )
                                }
                                className="h-8 w-20 rounded border border-[#d8dbe0] px-2 text-sm"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setProducts((currentProducts) =>
                                    currentProducts.filter(
                                      (item) => item.id !== product.id
                                    )
                                  )
                                }
                                className="rounded border border-[#e55353] px-3 py-1 text-sm font-medium text-[#e55353] hover:bg-[#e55353] hover:text-white"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AdminPanel>
              </section>
            )}

            {activeView === "orders" && (
              <section>
                <AdminPanel
                  title="Orders"
                  subtitle="Update fake fulfillment states locally."
                >
                  <OrdersTable orders={orders} updateOrderStatus={updateOrderStatus} />
                </AdminPanel>
              </section>
            )}

            {activeView === "customers" && (
              <section>
                <AdminPanel title="Customers" subtitle={`${users.length} registered users`}>
                  <CustomersList users={users} />
                </AdminPanel>
              </section>
            )}

            {activeView === "settings" && (
              <section className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
                <AdminPanel
                  title="Store Settings"
                  subtitle="Functional local settings used by this admin preview."
                >
                  <div className="grid gap-4">
                    <AdminField label="Store name">
                      <input
                        value={settings.storeName}
                        onChange={(event) =>
                          setSettings({ ...settings, storeName: event.target.value })
                        }
                        className="admin-input"
                      />
                    </AdminField>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <AdminField label="Currency">
                        <select
                          value={settings.currency}
                          onChange={(event) =>
                            setSettings({ ...settings, currency: event.target.value })
                          }
                          className="admin-input"
                        >
                          <option>USD</option>
                          <option>EUR</option>
                          <option>TRY</option>
                        </select>
                      </AdminField>
                      <AdminField label="Free shipping threshold">
                        <input
                          type="number"
                          value={settings.freeShippingThreshold}
                          onChange={(event) =>
                            setSettings({
                              ...settings,
                              freeShippingThreshold: event.target.value,
                            })
                          }
                          className="admin-input"
                        />
                      </AdminField>
                      <AdminField label="Low stock threshold">
                        <input
                          type="number"
                          value={settings.lowStockThreshold}
                          onChange={(event) =>
                            setSettings({
                              ...settings,
                              lowStockThreshold: event.target.value,
                            })
                          }
                          className="admin-input"
                        />
                      </AdminField>
                    </div>
                    <label className="flex items-center justify-between rounded border border-[#d8dbe0] p-3 text-sm text-[#3c4b64]">
                      Allow guest checkout
                      <input
                        type="checkbox"
                        checked={settings.allowGuestCheckout}
                        onChange={(event) =>
                          setSettings({
                            ...settings,
                            allowGuestCheckout: event.target.checked,
                          })
                        }
                        className="rounded border-[#d8dbe0] text-[#321fdb]"
                      />
                    </label>
                    <label className="flex items-center justify-between rounded border border-[#d8dbe0] p-3 text-sm text-[#3c4b64]">
                      Email order notifications
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(event) =>
                          setSettings({
                            ...settings,
                            emailNotifications: event.target.checked,
                          })
                        }
                        className="rounded border-[#d8dbe0] text-[#321fdb]"
                      />
                    </label>
                  </div>
                </AdminPanel>
                <AdminPanel title="Current Values" subtitle="Live settings preview">
                  <dl className="grid gap-3 text-sm">
                    {Object.entries(settings).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between gap-4 rounded bg-[#f8f9fa] px-3 py-2"
                      >
                        <dt className="capitalize text-[#768192]">
                          {key.replace(/([A-Z])/g, " $1")}
                        </dt>
                        <dd className="font-medium text-[#3c4b64]">
                          {typeof value === "boolean" ? (value ? "Enabled" : "Disabled") : value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </AdminPanel>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const AdminNavItem = ({
  active,
  icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-3 rounded px-3 py-2 ${
      active ? "bg-[#321fdb] text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
    } w-full text-left`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const OrdersTable = ({
  orders,
  updateOrderStatus,
}: {
  orders: AdminOrder[];
  updateOrderStatus: (id: number, orderStatus: string) => void;
}) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[680px] text-left text-sm">
      <thead className="border-b border-[#d8dbe0] bg-[#f8f9fa] text-xs uppercase text-[#768192]">
        <tr>
          <th className="px-4 py-3 font-semibold">Order</th>
          <th className="px-4 py-3 font-semibold">Customer</th>
          <th className="px-4 py-3 font-semibold">Total</th>
          <th className="px-4 py-3 font-semibold">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#d8dbe0]">
        {orders.map((order) => (
          <tr key={order.id} className="hover:bg-[#f8f9fa]">
            <td className="px-4 py-3 font-medium text-[#3c4b64]">#{order.id}</td>
            <td className="px-4 py-3 text-[#768192]">
              {order.user?.email || order.data?.emailAddress || "Guest"}
            </td>
            <td className="px-4 py-3 font-medium">
              ${order.subtotal.toLocaleString()}
            </td>
            <td className="px-4 py-3">
              <select
                value={order.orderStatus || "Processing"}
                onChange={(event) =>
                  updateOrderStatus(order.id, event.target.value)
                }
                className="h-8 rounded border border-[#d8dbe0] px-2 text-sm"
              >
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CustomersList = ({ users }: { users: AdminUser[] }) => (
  <div className="divide-y divide-[#d8dbe0]">
    {users.map((user) => (
      <div
        key={user.id}
        className="flex items-center justify-between gap-4 px-4 py-4"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#321fdb] text-sm font-semibold text-white">
            {user.name.charAt(0)}
            {user.lastname.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium text-[#3c4b64]">
              {user.name} {user.lastname}
            </p>
            <p className="truncate text-sm text-[#768192]">{user.email}</p>
          </div>
        </div>
        <span className="rounded bg-[#f8f9fa] px-2 py-1 text-xs uppercase text-[#768192]">
          {user.role || "Customer"}
        </span>
      </div>
    ))}
  </div>
);

const MetricCard = ({
  color,
  icon,
  label,
  value,
  detail,
}: {
  color: string;
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) => (
  <div className={`${color} rounded text-white shadow-sm`}>
    <div className="flex items-start justify-between p-5">
      <div>
        <p className="text-sm text-white/75">{label}</p>
        <p className="mt-2 text-3xl font-semibold">{value}</p>
      </div>
      <span className="text-white/80">{icon}</span>
    </div>
    <div className="border-t border-white/15 px-5 py-3 text-xs text-white/70">
      {detail}
    </div>
  </div>
);

const AdminPanel = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) => (
  <div className="rounded border border-[#d8dbe0] bg-white shadow-sm">
    <div className="border-b border-[#d8dbe0] px-4 py-3">
      <h2 className="font-semibold text-[#3c4b64]">{title}</h2>
      <p className="mt-1 text-sm text-[#768192]">{subtitle}</p>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const AdminField = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <label className="grid gap-2 text-sm font-medium text-[#3c4b64]">
    {label}
    {children}
  </label>
);

export default Admin;
