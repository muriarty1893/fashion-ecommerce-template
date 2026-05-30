import { NextResponse } from "next/server";
import { hashPassword, requireAdmin, setSessionCookie } from "../../../lib/auth";
import { query } from "../../../lib/database";
import { userFromRow } from "../../../lib/storeDb";

type UserRow = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
};

export const GET = async (request: Request) => {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;

  const result = await query<UserRow>(
    "SELECT id, name, lastname, email, role FROM users ORDER BY id ASC",
  );
  return NextResponse.json(result.rows.map(userFromRow));
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const result = await query<UserRow>(
    `INSERT INTO users (name, lastname, email, role, password_hash)
     VALUES ($1, $2, LOWER($3), $4, $5)
     RETURNING id, name, lastname, email, role`,
    [
      body.name,
      body.lastname,
      body.email,
      body.role || "customer",
      hashPassword(body.password),
    ],
  );
  const user = userFromRow(result.rows[0]);
  const response = NextResponse.json(user, { status: 201 });
  setSessionCookie(response, user);

  return response;
};
