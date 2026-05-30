import { NextResponse } from "next/server";
import { hashPassword, requireSession } from "../../../../lib/auth";
import { query } from "../../../../lib/database";
import { userFromRow } from "../../../../lib/storeDb";

type UserRow = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
};

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const auth = requireSession(_request);
  if (auth.response) return auth.response;

  const { id } = await params;
  if (auth.session?.role !== "admin" && auth.session?.id !== id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const result = await query<UserRow>(
    "SELECT id, name, lastname, email, role FROM users WHERE id = $1",
    [Number(id)],
  );
  const user = result.rows[0] ? userFromRow(result.rows[0]) : null;

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const auth = requireSession(request);
  if (auth.response) return auth.response;

  const { id } = await params;
  if (auth.session?.role !== "admin" && auth.session?.id !== id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const result = await query<UserRow>(
    `UPDATE users
     SET name = COALESCE($2, name),
       lastname = COALESCE($3, lastname),
       email = COALESCE(LOWER($4), email),
       password_hash = COALESCE($5, password_hash),
       updated_at = NOW()
     WHERE id = $1
     RETURNING id, name, lastname, email, role`,
    [
      Number(id),
      body.name ?? null,
      body.lastname ?? null,
      body.email ?? null,
      body.password ? hashPassword(body.password) : null,
    ],
  );

  if (!result.rows[0]) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(userFromRow(result.rows[0]));
};
