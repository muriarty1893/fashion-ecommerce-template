import { query, getDb } from "./database";

type ProductRow = {
  id: string;
  title: string;
  image: string;
  category: string;
  price: string | number;
  discount_price: string | number | null;
  popularity: number | null;
  stock: number;
  rating: string | number | null;
  colors: string[] | null;
  sizes: string[] | null;
  created_at: Date | string | null;
};

type UserRow = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password_hash?: string;
};

type OrderRow = {
  id: number;
  order_status: string;
  order_date: Date | string;
  subtotal: string | number;
  discount: string | number | null;
  shipping: string | number | null;
  tax: string | number | null;
  total: string | number | null;
  email: string | null;
  address: Record<string, unknown> | null;
  user_id: number | null;
  user_email: string | null;
};

type OrderItemRow = {
  order_id: number;
  product_id: string;
  title: string;
  image: string;
  category: string;
  price: string | number;
  quantity: number;
  size: string | null;
  color: string | null;
};

const toNumber = (value: string | number | null | undefined) =>
  value === null || value === undefined ? undefined : Number(value);

export const productFromRow = (row: ProductRow): Product => ({
  id: row.id,
  title: row.title,
  image: row.image,
  category: row.category,
  price: Number(row.price),
  discountPrice: toNumber(row.discount_price),
  popularity: row.popularity || 1,
  stock: row.stock,
  rating: toNumber(row.rating),
  colors: row.colors || undefined,
  sizes: row.sizes || undefined,
  createdAt:
    typeof row.created_at === "string"
      ? row.created_at
      : row.created_at?.toISOString(),
});

export const userFromRow = (row: UserRow): User => ({
  id: String(row.id),
  name: row.name,
  lastname: row.lastname,
  email: row.email,
  role: row.role,
  password: "",
});

export const orderFromRows = (
  orderRow: OrderRow,
  itemRows: OrderItemRow[],
): Order => {
  const products = itemRows.map((item): ProductInCart => ({
    id: `${item.product_id}${item.size || ""}${item.color || ""}`,
    productId: item.product_id,
    title: item.title,
    image: item.image,
    category: item.category,
    price: Number(item.price),
    quantity: item.quantity,
    size: item.size || "",
    color: item.color || "",
    popularity: 1,
    stock: item.quantity,
  }));

  return {
    id: orderRow.id,
    orderStatus: orderRow.order_status,
    orderDate:
      typeof orderRow.order_date === "string"
        ? orderRow.order_date
        : orderRow.order_date.toISOString(),
    data: {
      ...(orderRow.address || {}),
      email: orderRow.email || orderRow.user_email || "",
      emailAddress: orderRow.email || orderRow.user_email || "",
    } as Order["data"],
    products,
    subtotal: Number(orderRow.subtotal),
    discount: Number(orderRow.discount || 0),
    shipping: Number(orderRow.shipping || 0),
    tax: Number(orderRow.tax || 0),
    total: Number(orderRow.total || orderRow.subtotal),
    user: {
      email: orderRow.user_email || orderRow.email || "",
      id: orderRow.user_id || 0,
    },
  };
};

export const getProducts = async () => {
  const result = await query<ProductRow>(
    `SELECT id, title, image, category, price, discount_price, popularity, stock,
      rating, colors, sizes, created_at
     FROM products
     WHERE deleted_at IS NULL
     ORDER BY created_at DESC, id ASC`,
  );

  return result.rows.map(productFromRow);
};

export const getProduct = async (id: string) => {
  const result = await query<ProductRow>(
    `SELECT id, title, image, category, price, discount_price, popularity, stock,
      rating, colors, sizes, created_at
     FROM products
     WHERE id = $1 AND deleted_at IS NULL`,
    [id],
  );

  return result.rows[0] ? productFromRow(result.rows[0]) : null;
};

export const getOrders = async (userId?: string) => {
  const orderResult = await query<OrderRow>(
    `SELECT orders.*, users.email AS user_email
     FROM orders
     LEFT JOIN users ON users.id = orders.user_id
     WHERE ($1::int IS NULL OR orders.user_id = $1::int)
     ORDER BY orders.order_date DESC`,
    [userId ? Number(userId) : null],
  );
  if (orderResult.rows.length === 0) return [];

  const itemResult = await query<OrderItemRow>(
    `SELECT order_id, product_id, title, image, category, price, quantity, size, color
     FROM order_items
     WHERE order_id = ANY($1::int[])`,
    [orderResult.rows.map((order) => order.id)],
  );

  return orderResult.rows.map((order) =>
    orderFromRows(
      order,
      itemResult.rows.filter((item) => item.order_id === order.id),
    ),
  );
};

export const getOrder = async (id: string) => {
  const orderResult = await query<OrderRow>(
    `SELECT orders.*, users.email AS user_email
     FROM orders
     LEFT JOIN users ON users.id = orders.user_id
     WHERE orders.id = $1`,
    [Number(id)],
  );

  if (!orderResult.rows[0]) return null;

  const itemResult = await query<OrderItemRow>(
    `SELECT order_id, product_id, title, image, category, price, quantity, size, color
     FROM order_items
     WHERE order_id = $1
     ORDER BY id ASC`,
    [Number(id)],
  );

  return orderFromRows(orderResult.rows[0], itemResult.rows);
};

export const createOrder = async ({
  products,
  data,
  subtotal,
  discount,
  shipping,
  tax,
  total,
  userId,
  userEmail,
}: {
  products: ProductInCart[];
  data: Record<string, unknown>;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  userId?: string;
  userEmail?: string;
}) => {
  const db = getDb();
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const productIds = products.map((item) => item.productId || item.id);
    const productResult = await client.query<ProductRow>(
      `SELECT id, title, image, category, price, discount_price, popularity, stock,
        rating, colors, sizes, created_at
       FROM products
       WHERE id = ANY($1::text[]) AND deleted_at IS NULL
       FOR UPDATE`,
      [productIds],
    );

    for (const cartItem of products) {
      const productId = cartItem.productId || cartItem.id;
      const dbProduct = productResult.rows.find((item) => item.id === productId);
      if (!dbProduct) throw new Error(`Product ${productId} not found.`);
      if (dbProduct.stock < cartItem.quantity) {
        throw new Error(`${dbProduct.title} does not have enough stock.`);
      }
    }

    const email =
      String(data.emailAddress || data.email || userEmail || "").trim() || null;
    const orderResult = await client.query<{ id: number }>(
      `INSERT INTO orders (
        user_id, order_status, order_date, email, address,
        subtotal, discount, shipping, tax, total
      )
      VALUES ($1, 'Processing', NOW(), $2, $3::jsonb, $4, $5, $6, $7, $8)
      RETURNING id`,
      [
        userId ? Number(userId) : null,
        email,
        JSON.stringify(data),
        subtotal,
        discount,
        shipping,
        tax,
        total,
      ],
    );
    const orderId = orderResult.rows[0].id;

    for (const cartItem of products) {
      const productId = cartItem.productId || cartItem.id;
      const dbProduct = productResult.rows.find((item) => item.id === productId);
      if (!dbProduct) continue;

      await client.query(
        `INSERT INTO order_items (
          order_id, product_id, title, image, category, price, quantity, size, color
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          orderId,
          productId,
          dbProduct.title,
          dbProduct.image,
          dbProduct.category,
          cartItem.price || Number(dbProduct.discount_price || dbProduct.price),
          cartItem.quantity,
          cartItem.size,
          cartItem.color,
        ],
      );

      await client.query("UPDATE products SET stock = stock - $1 WHERE id = $2", [
        cartItem.quantity,
        productId,
      ]);
    }

    await client.query("COMMIT");
    return getOrder(String(orderId));
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
