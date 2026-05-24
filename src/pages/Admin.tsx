import { FormEvent, ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Bell,
  Boxes,
  ChevronRight,
  ClipboardList,
  DollarSign,
  Home,
  LayoutDashboard,
  Menu,
  PackageCheck,
  PackagePlus,
  Search,
  Settings,
  ShoppingBag,
  Truck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import db from "../data/db.json";
import { formatCategoryName } from "../utils/formatCategoryName";
import { Language, useLanguage } from "../i18n";

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
    email?: string;
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

const navItems: Array<{ view: AdminView; icon: ReactNode; label: string }> = [
  { view: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { view: "products", icon: <Boxes size={18} />, label: "Products" },
  { view: "orders", icon: <ClipboardList size={18} />, label: "Orders" },
  { view: "customers", icon: <Users size={18} />, label: "Customers" },
  { view: "settings", icon: <Settings size={18} />, label: "Settings" },
];

const salesSeries = [
  { label: "Mon", value: 3200 },
  { label: "Tue", value: 4600 },
  { label: "Wed", value: 3900 },
  { label: "Thu", value: 6100 },
  { label: "Fri", value: 7200 },
  { label: "Sat", value: 6800 },
  { label: "Sun", value: 8400 },
];

const Admin = () => {
  const [products, setProducts] = useState<Product[]>(db.products as Product[]);
  const [orders, setOrders] = useState<AdminOrder[]>(
    db.orders as unknown as AdminOrder[]
  );
  const [users] = useState<AdminUser[]>(db.users as unknown as AdminUser[]);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [activeView, setActiveView] = useState<AdminView>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const lowStockProducts = products
    .filter((product) => product.stock < lowStockLimit)
    .sort((a, b) => a.stock - b.stock);
  const lowStockCount = lowStockProducts.length;
  const pendingShipments = orders.filter((order) =>
    ["Processing", "Pending", "Paid"].includes(order.orderStatus || "Processing")
  ).length;
  const averageOrder = orders.length > 0 ? Math.round(revenue / orders.length) : 0;
  const bestSellingProducts = [...products]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);
  const totalInventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  const recentActivities = [
    {
      title: "New customer account",
      detail: users[0] ? `${users[0].name} ${users[0].lastname} joined` : "Guest signup",
      time: "12 min ago",
      icon: <UserPlus size={16} />,
    },
    {
      title: "Order moved to fulfillment",
      detail: orders[0] ? `Order #${orders[0].id} is being prepared` : "No orders yet",
      time: "28 min ago",
      icon: <PackageCheck size={16} />,
    },
    {
      title: "Inventory alert",
      detail: lowStockProducts[0]
        ? `${lowStockProducts[0].title} is below threshold`
        : "All stock levels look healthy",
      time: "1 hr ago",
      icon: <Activity size={16} />,
    },
  ];

  const setView = (view: AdminView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

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
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="flex min-h-screen">
        <AdminSidebar activeView={activeView} setView={setView} />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
              <div className="flex min-w-0 items-center gap-4">
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-slate-950 hover:text-slate-950 lg:hidden"
                  aria-label="Open admin menu"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu size={18} />
                </button>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Store operations
                  </p>
                  <h1 className="truncate text-lg font-bold text-slate-950">
                    {viewLabels[activeView]}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search products"
                    className="h-10 w-72 rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-700/10"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-950 hover:text-slate-950"
                >
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500" />
                </button>
                <Link
                  to="/"
                  className="hidden h-10 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-blue-800 sm:inline-flex"
                >
                  <Home size={16} />
                  Storefront
                </Link>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-700 text-xs font-bold text-white">
                    AD
                  </span>
                  <div className="hidden text-sm sm:block">
                    <p className="font-bold leading-4">Admin</p>
                    <p className="text-xs text-slate-500">Operations</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 py-5 md:px-6">
            <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Admin / Store operations / {viewLabels[activeView]}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Manage demo products, orders, customers, and operational settings.
                </p>
              </div>
              <div className="relative md:hidden">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products"
                  className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium outline-none focus:border-blue-700"
                />
              </div>
            </div>

            {activeView === "dashboard" && (
              <DashboardView
                revenue={revenue}
                orders={orders}
                users={users}
                products={products}
                pendingShipments={pendingShipments}
                averageOrder={averageOrder}
                totalInventoryValue={totalInventoryValue}
                lowStockProducts={lowStockProducts}
                lowStockLimit={lowStockLimit}
                bestSellingProducts={bestSellingProducts}
                recentActivities={recentActivities}
                language={language}
                setView={setView}
                updateOrderStatus={updateOrderStatus}
              />
            )}

            {activeView === "products" && (
              <ProductsView
                products={products}
                filteredProducts={filteredProducts}
                form={form}
                setForm={setForm}
                setProducts={setProducts}
                handleProductSubmit={handleProductSubmit}
                updateProduct={updateProduct}
                lowStockCount={lowStockCount}
                language={language}
              />
            )}

            {activeView === "orders" && (
              <AdminPanel
                title="Orders"
                subtitle="Review and update local fulfillment states."
              >
                <OrdersTable orders={orders} updateOrderStatus={updateOrderStatus} />
              </AdminPanel>
            )}

            {activeView === "customers" && (
              <AdminPanel
                title="Customers"
                subtitle={`${users.length} registered demo customers`}
              >
                <CustomersList users={users} />
              </AdminPanel>
            )}

            {activeView === "settings" && (
              <SettingsView settings={settings} setSettings={setSettings} />
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            aria-label="Close admin menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative h-full w-80 max-w-[86vw] bg-slate-950 text-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <span className="text-lg font-black tracking-tight">MODE Admin</span>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/10"
                aria-label="Close admin menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <nav className="space-y-1 px-3 py-4 text-sm">
              {navItems.map((item) => (
                <AdminNavItem
                  key={item.view}
                  active={activeView === item.view}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => setView(item.view)}
                />
              ))}
            </nav>
          </aside>
        </div>
      )}
    </main>
  );
};

const AdminSidebar = ({
  activeView,
  setView,
}: {
  activeView: AdminView;
  setView: (view: AdminView) => void;
}) => (
  <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white lg:block">
    <div className="flex h-16 items-center border-b border-white/10 px-6">
      <div>
        <p className="text-lg font-black tracking-tight">MODE Admin</p>
        <p className="text-xs text-white/45">Fashion commerce operations</p>
      </div>
    </div>
    <nav className="space-y-1 px-3 py-4 text-sm">
      {navItems.map((item) => (
        <AdminNavItem
          key={item.view}
          active={activeView === item.view}
          icon={item.icon}
          label={item.label}
          onClick={() => setView(item.view)}
        />
      ))}
    </nav>
    <div className="mx-4 mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
        Demo data
      </p>
      <p className="mt-2 text-sm leading-6 text-white/68">
        Local admin tools for json-server products, orders, customers, and
        settings previews.
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-amber-200"
      >
        Open storefront
        <ChevronRight size={16} />
      </Link>
    </div>
  </aside>
);

const DashboardView = ({
  revenue,
  orders,
  users,
  products,
  pendingShipments,
  averageOrder,
  totalInventoryValue,
  lowStockProducts,
  lowStockLimit,
  bestSellingProducts,
  recentActivities,
  language,
  setView,
  updateOrderStatus,
}: {
  revenue: number;
  orders: AdminOrder[];
  users: AdminUser[];
  products: Product[];
  pendingShipments: number;
  averageOrder: number;
  totalInventoryValue: number;
  lowStockProducts: Product[];
  lowStockLimit: number;
  bestSellingProducts: Product[];
  recentActivities: Array<{ title: string; detail: string; time: string; icon: ReactNode }>;
  language: Language;
  setView: (view: AdminView) => void;
  updateOrderStatus: (id: number, orderStatus: string) => void;
}) => (
  <div className="grid gap-5">
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <MetricCard
        icon={<DollarSign size={20} />}
        label="Total revenue"
        value={`$${revenue.toLocaleString()}`}
        detail={`Avg. order $${averageOrder.toLocaleString()}`}
        tone="blue"
      />
      <MetricCard
        icon={<ShoppingBag size={20} />}
        label="Orders"
        value={orders.length.toString()}
        detail="All local orders"
        tone="slate"
      />
      <MetricCard
        icon={<Users size={20} />}
        label="Customers"
        value={users.length.toString()}
        detail="Registered accounts"
        tone="green"
      />
      <MetricCard
        icon={<Boxes size={20} />}
        label="Products"
        value={products.length.toString()}
        detail={`$${totalInventoryValue.toLocaleString()} inventory`}
        tone="amber"
      />
      <MetricCard
        icon={<Truck size={20} />}
        label="Pending shipments"
        value={pendingShipments.toString()}
        detail="Needs fulfillment"
        tone="rose"
      />
    </section>

    <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
      <AdminPanel
        title="Sales analytics"
        subtitle="Seven-day revenue trend for the demo storefront."
        action={
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-slate-950 hover:text-slate-950"
          >
            Export
          </button>
        }
      >
        <SalesChart />
      </AdminPanel>

      <AdminPanel
        title="Quick actions"
        subtitle="Common operations for store managers."
      >
        <div className="grid gap-3">
          <QuickAction
            icon={<PackagePlus size={18} />}
            label="Add Product"
            text="Create a local demo product"
            onClick={() => setView("products")}
          />
          <QuickAction
            icon={<ClipboardList size={18} />}
            label="View Orders"
            text="Review fulfillment states"
            onClick={() => setView("orders")}
          />
          <QuickAction
            icon={<Boxes size={18} />}
            label="Manage Inventory"
            text="Edit price and stock levels"
            onClick={() => setView("products")}
          />
        </div>
      </AdminPanel>
    </section>

    <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <AdminPanel
        title="Recent orders"
        subtitle="Newest local orders with fulfillment status."
      >
        <OrdersTable orders={orders.slice(0, 6)} updateOrderStatus={updateOrderStatus} />
      </AdminPanel>

      <AdminPanel
        title="Low stock products"
        subtitle={`${lowStockProducts.length} below threshold of ${lowStockLimit}.`}
      >
        <LowStockList products={lowStockProducts.slice(0, 6)} language={language} />
      </AdminPanel>
    </section>

    <section className="grid gap-5 xl:grid-cols-2">
      <AdminPanel
        title="Product inventory summary"
        subtitle="Top products by popularity and current stock position."
      >
        <InventorySummary products={bestSellingProducts} language={language} />
      </AdminPanel>

      <AdminPanel
        title="Recent customer activity"
        subtitle="Operational feed for customer and fulfillment events."
      >
        <ActivityList items={recentActivities} />
      </AdminPanel>
    </section>
  </div>
);

const ProductsView = ({
  products,
  filteredProducts,
  form,
  setForm,
  setProducts,
  handleProductSubmit,
  updateProduct,
  lowStockCount,
  language,
}: {
  products: Product[];
  filteredProducts: Product[];
  form: ProductForm;
  setForm: (form: ProductForm) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  handleProductSubmit: (event: FormEvent<HTMLFormElement>) => void;
  updateProduct: (id: string, field: "price" | "stock", value: number) => void;
  lowStockCount: number;
  language: Language;
}) => (
  <section className="grid gap-5 xl:grid-cols-[360px_1fr]">
    <AdminPanel
      title="Add Product"
      subtitle="Create local preview products for the storefront."
    >
      <form onSubmit={handleProductSubmit} className="grid gap-4">
        <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-white">
            <PackagePlus size={18} />
          </span>
          <p className="text-sm text-slate-600">
            Changes are stored in browser state for this preview.
          </p>
        </div>
        <AdminField label="Product name">
          <input
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            className="admin-input"
            placeholder="Structured Evening Dress"
          />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Price">
            <input
              type="number"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
              className="admin-input"
              placeholder="2400"
            />
          </AdminField>
          <AdminField label="Stock">
            <input
              type="number"
              value={form.stock}
              onChange={(event) => setForm({ ...form, stock: event.target.value })}
              className="admin-input"
              placeholder="30"
            />
          </AdminField>
        </div>
        <AdminField label="Category">
          <select
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
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
            onChange={(event) => setForm({ ...form, image: event.target.value })}
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
          className="h-11 rounded-full bg-blue-700 px-4 text-sm font-bold text-white transition hover:bg-blue-800"
        >
          Add product
        </button>
      </form>
    </AdminPanel>

    <AdminPanel
      title="Inventory"
      subtitle={`${filteredProducts.length} visible products, ${lowStockCount} low-stock items`}
    >
      <InventoryTable
        products={filteredProducts}
        language={language}
        updateProduct={updateProduct}
        removeProduct={(id) =>
          setProducts((currentProducts) =>
            currentProducts.filter((item) => item.id !== id)
          )
        }
      />
    </AdminPanel>
  </section>
);

const SettingsView = ({
  settings,
  setSettings,
}: {
  settings: {
    storeName: string;
    currency: string;
    freeShippingThreshold: string;
    lowStockThreshold: string;
    allowGuestCheckout: boolean;
    emailNotifications: boolean;
  };
  setSettings: (settings: {
    storeName: string;
    currency: string;
    freeShippingThreshold: string;
    lowStockThreshold: string;
    allowGuestCheckout: boolean;
    emailNotifications: boolean;
  }) => void;
}) => (
  <section className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
    <AdminPanel
      title="Store settings"
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
        <ToggleField
          label="Allow guest checkout"
          checked={settings.allowGuestCheckout}
          onChange={(checked) =>
            setSettings({ ...settings, allowGuestCheckout: checked })
          }
        />
        <ToggleField
          label="Email order notifications"
          checked={settings.emailNotifications}
          onChange={(checked) =>
            setSettings({ ...settings, emailNotifications: checked })
          }
        />
      </div>
    </AdminPanel>
    <AdminPanel title="Current values" subtitle="Live settings preview">
      <dl className="grid gap-3 text-sm">
        {Object.entries(settings).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-3 py-2"
          >
            <dt className="capitalize text-slate-500">
              {key.replace(/([A-Z])/g, " $1")}
            </dt>
            <dd className="font-bold text-slate-950">
              {typeof value === "boolean" ? (value ? "Enabled" : "Disabled") : value}
            </dd>
          </div>
        ))}
      </dl>
    </AdminPanel>
  </section>
);

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
    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left font-semibold transition ${
      active
        ? "bg-white text-slate-950 shadow-sm"
        : "text-white/68 hover:bg-white/10 hover:text-white"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const MetricCard = ({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  tone: "blue" | "slate" | "green" | "amber" | "rose";
}) => {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${tones[tone]}`}>
          {icon}
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500">{detail}</p>
    </article>
  );
};

const SalesChart = () => {
  const maxValue = Math.max(...salesSeries.map((item) => item.value));

  return (
    <div className="pt-2">
      <div className="flex h-72 items-end gap-3 rounded-3xl bg-slate-50 p-4">
        {salesSeries.map((item) => (
          <div key={item.label} className="flex h-full flex-1 flex-col justify-end gap-3">
            <div className="flex flex-1 items-end">
              <div
                className="w-full rounded-t-2xl bg-gradient-to-t from-blue-800 to-blue-500 shadow-sm transition hover:from-blue-900"
                style={{ height: `${Math.max(12, (item.value / maxValue) * 100)}%` }}
                title={`$${item.value.toLocaleString()}`}
              />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-500">{item.label}</p>
              <p className="mt-1 text-xs text-slate-400">
                ${(item.value / 1000).toFixed(1)}k
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <MiniStat label="Conversion" value="4.8%" />
        <MiniStat label="Return rate" value="2.1%" />
        <MiniStat label="AOV trend" value="+12%" />
      </div>
    </div>
  );
};

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-3">
    <p className="text-xs font-semibold text-slate-500">{label}</p>
    <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
  </div>
);

const QuickAction = ({
  icon,
  label,
  text,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  text: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-700 hover:bg-blue-50"
  >
    <span className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-white">
        {icon}
      </span>
      <span>
        <span className="block font-bold text-slate-950">{label}</span>
        <span className="text-sm text-slate-500">{text}</span>
      </span>
    </span>
    <ChevronRight className="h-4 w-4 text-slate-400" />
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
    <table className="w-full min-w-[720px] text-left text-sm">
      <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
        <tr>
          <th className="px-4 py-3 font-bold">Order</th>
          <th className="px-4 py-3 font-bold">Customer</th>
          <th className="px-4 py-3 font-bold">Total</th>
          <th className="px-4 py-3 font-bold">Payment</th>
          <th className="px-4 py-3 font-bold">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {orders.map((order, index) => {
          const status = order.orderStatus || (index % 3 === 0 ? "Shipped" : "Processing");
          return (
            <tr key={order.id} className="transition hover:bg-slate-50">
              <td className="px-4 py-4 font-bold text-slate-950">#{order.id}</td>
              <td className="px-4 py-4 text-slate-600">
                {order.user?.email || order.data?.emailAddress || order.data?.email || "Guest"}
              </td>
              <td className="px-4 py-4 font-bold text-slate-950">
                ${order.subtotal.toLocaleString()}
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={index % 4 === 0 ? "Pending" : "Paid"} />
              </td>
              <td className="px-4 py-4">
                <select
                  value={status}
                  onChange={(event) =>
                    updateOrderStatus(order.id, event.target.value)
                  }
                  className="h-9 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-700"
                >
                  <option>Processing</option>
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const InventoryTable = ({
  products,
  language,
  updateProduct,
  removeProduct,
}: {
  products: Product[];
  language: Language;
  updateProduct: (id: string, field: "price" | "stock", value: number) => void;
  removeProduct: (id: string) => void;
}) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[820px] text-left text-sm">
      <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
        <tr>
          <th className="px-4 py-3 font-bold">Product</th>
          <th className="px-4 py-3 font-bold">Category</th>
          <th className="px-4 py-3 font-bold">Price</th>
          <th className="px-4 py-3 font-bold">Stock</th>
          <th className="px-4 py-3 font-bold">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {products.map((product) => (
          <tr key={product.id} className="transition hover:bg-slate-50">
            <td className="px-4 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={`/assets/${product.image}`}
                  alt={product.title}
                  className="h-12 w-12 rounded-2xl object-cover object-top"
                />
                <span className="font-bold text-slate-950">{product.title}</span>
              </div>
            </td>
            <td className="px-4 py-4 text-slate-600">
              {formatCategoryName(product.category, language)}
            </td>
            <td className="px-4 py-4">
              <input
                type="number"
                value={product.price}
                onChange={(event) =>
                  updateProduct(product.id, "price", Number(event.target.value))
                }
                className="h-9 w-24 rounded-full border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-blue-700"
              />
            </td>
            <td className="px-4 py-4">
              <input
                type="number"
                value={product.stock}
                onChange={(event) =>
                  updateProduct(product.id, "stock", Number(event.target.value))
                }
                className="h-9 w-20 rounded-full border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-blue-700"
              />
            </td>
            <td className="px-4 py-4">
              <button
                type="button"
                onClick={() => removeProduct(product.id)}
                className="rounded-full border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-600 hover:text-white"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LowStockList = ({
  products,
  language,
}: {
  products: Product[];
  language: Language;
}) => (
  <div className="grid gap-3">
    {products.length === 0 && (
      <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
        No low stock alerts.
      </div>
    )}
    {products.map((product) => (
      <div
        key={product.id}
        className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3"
      >
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={`/assets/${product.image}`}
            alt={product.title}
            className="h-12 w-12 rounded-2xl object-cover object-top"
          />
          <div className="min-w-0">
            <p className="truncate font-bold text-slate-950">{product.title}</p>
            <p className="text-sm text-slate-500">
              {formatCategoryName(product.category, language)}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">
          {product.stock} left
        </span>
      </div>
    ))}
  </div>
);

const InventorySummary = ({
  products,
  language,
}: {
  products: Product[];
  language: Language;
}) => (
  <div className="grid gap-3">
    {products.map((product, index) => (
      <div
        key={product.id}
        className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-sm font-black text-slate-700">
            {index + 1}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold text-slate-950">{product.title}</p>
            <p className="text-sm text-slate-500">
              {formatCategoryName(product.category, language)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-slate-950">${product.price.toLocaleString()}</p>
          <p className="text-xs text-slate-500">{product.stock} in stock</p>
        </div>
      </div>
    ))}
  </div>
);

const ActivityList = ({
  items,
}: {
  items: Array<{ title: string; detail: string; time: string; icon: ReactNode }>;
}) => (
  <div className="grid gap-3">
    {items.map((item) => (
      <div key={item.title} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-blue-700 shadow-sm">
          {item.icon}
        </span>
        <div>
          <p className="font-bold text-slate-950">{item.title}</p>
          <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
          <p className="mt-2 text-xs font-semibold text-slate-400">{item.time}</p>
        </div>
      </div>
    ))}
  </div>
);

const CustomersList = ({ users }: { users: AdminUser[] }) => (
  <div className="divide-y divide-slate-200">
    {users.map((user) => (
      <div
        key={user.id}
        className="flex items-center justify-between gap-4 px-4 py-4"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-700 text-sm font-bold text-white">
            {user.name.charAt(0)}
            {user.lastname.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold text-slate-950">
              {user.name} {user.lastname}
            </p>
            <p className="truncate text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-500">
          {user.role || "Customer"}
        </span>
      </div>
    ))}
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const normalized = status.toLowerCase();
  const className = normalized.includes("paid")
    ? "bg-emerald-50 text-emerald-700"
    : normalized.includes("pending") || normalized.includes("processing")
      ? "bg-amber-50 text-amber-700"
      : normalized.includes("shipped") || normalized.includes("delivered")
        ? "bg-blue-50 text-blue-700"
        : normalized.includes("cancel")
          ? "bg-rose-50 text-rose-700"
          : "bg-slate-100 text-slate-600";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
};

const ToggleField = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-3 text-sm font-semibold text-slate-700">
    {label}
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      className="rounded border-slate-300 text-blue-700 focus:ring-blue-700"
    />
  </label>
);

const AdminPanel = ({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}) => (
  <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
      <div>
        <h2 className="font-bold text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      {action}
    </div>
    <div className="p-5">{children}</div>
  </section>
);

const AdminField = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <label className="grid gap-2 text-sm font-bold text-slate-700">
    {label}
    {children}
  </label>
);

export default Admin;
