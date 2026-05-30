import { NextResponse } from "next/server";
import { requireAdmin } from "../../../lib/auth";
import { getProducts, productFromRow } from "../../../lib/storeDb";
import { query } from "../../../lib/database";

export const GET = async () => {
  const products = await getProducts();
  return NextResponse.json(products);
};

export const POST = async (request: Request) => {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;

  const body = await request.json();
  const result = await query<{
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | string;
    discount_price: number | string | null;
    popularity: number;
    stock: number;
    rating: number | string | null;
    colors: string[] | null;
    sizes: string[] | null;
    created_at: Date;
  }>(
    `INSERT INTO products (
      id, title, image, category, price, discount_price, popularity, stock,
      rating, colors, sizes
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id, title, image, category, price, discount_price, popularity,
      stock, rating, colors, sizes, created_at`,
    [
      body.id || String(Date.now()),
      body.title,
      body.image,
      body.category,
      Number(body.price),
      body.discountPrice ? Number(body.discountPrice) : null,
      Number(body.popularity || 1),
      Number(body.stock || 0),
      body.rating ? Number(body.rating) : null,
      body.colors ? JSON.stringify(body.colors) : null,
      body.sizes ? JSON.stringify(body.sizes) : null,
    ],
  );

  return NextResponse.json(productFromRow(result.rows[0]), { status: 201 });
};
