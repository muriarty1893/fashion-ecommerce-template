import { NextResponse } from "next/server";
import { setSessionCookie, verifyPassword } from "../../../../lib/auth";
import { query } from "../../../../lib/database";
import { userFromRow } from "../../../../lib/storeDb";

type UserRow = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password_hash: string;
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const result = await query<UserRow>(
    `SELECT id, name, lastname, email, role, password_hash
     FROM users
     WHERE email = LOWER($1)`,
    [body.email],
  );
  const row = result.rows[0];

  if (!row || !verifyPassword(String(body.password || ""), row.password_hash)) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const user = userFromRow(row);
  const response = NextResponse.json(user);
  setSessionCookie(response, user);
  return response;
};

