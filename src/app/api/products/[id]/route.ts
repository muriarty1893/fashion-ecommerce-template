import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import { getProduct, productFromRow } from "../../../../lib/storeDb";
import { query } from "../../../../lib/database";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;

  const { id } = await params;
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
    `UPDATE products
     SET title = COALESCE($2, title),
       image = COALESCE($3, image),
       category = COALESCE($4, category),
       price = COALESCE($5, price),
       discount_price = CASE WHEN $6::boolean THEN $7 ELSE discount_price END,
       popularity = COALESCE($8, popularity),
       stock = COALESCE($9, stock),
       rating = CASE WHEN $10::boolean THEN $11 ELSE rating END,
       colors = COALESCE($12::jsonb, colors),
       sizes = COALESCE($13::jsonb, sizes),
       updated_at = NOW()
     WHERE id = $1 AND deleted_at IS NULL
     RETURNING id, title, image, category, price, discount_price, popularity,
       stock, rating, colors, sizes, created_at`,
    [
      id,
      body.title ?? null,
      body.image ?? null,
      body.category ?? null,
      body.price === undefined ? null : Number(body.price),
      body.discountPrice !== undefined,
      body.discountPrice === undefined ? null : Number(body.discountPrice),
      body.popularity === undefined ? null : Number(body.popularity),
      body.stock === undefined ? null : Number(body.stock),
      body.rating !== undefined,
      body.rating === undefined ? null : Number(body.rating),
      body.colors ? JSON.stringify(body.colors) : null,
      body.sizes ? JSON.stringify(body.sizes) : null,
    ],
  );

  if (!result.rows[0]) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(productFromRow(result.rows[0]));
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;

  const { id } = await params;
  await query("UPDATE products SET deleted_at = NOW() WHERE id = $1", [id]);
  return NextResponse.json({ ok: true });
};
