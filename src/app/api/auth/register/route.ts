import { NextResponse } from "next/server";
import { hashPassword, setSessionCookie } from "../../../../lib/auth";
import { query } from "../../../../lib/database";
import { userFromRow } from "../../../../lib/storeDb";

type UserRow = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
};

export const POST = async (request: Request) => {
  const body = await request.json();

  try {
    const result = await query<UserRow>(
      `INSERT INTO users (name, lastname, email, role, password_hash)
       VALUES ($1, $2, LOWER($3), 'customer', $4)
       RETURNING id, name, lastname, email, role`,
      [body.name, body.lastname, body.email, hashPassword(body.password)],
    );
    const user = userFromRow(result.rows[0]);
    const response = NextResponse.json(user, { status: 201 });
    setSessionCookie(response, user);
    return response;
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("duplicate")
        ? "User already exists"
        : "Registration failed";
    const status = message === "User already exists" ? 409 : 500;
    return NextResponse.json({ message }, { status });
  }
};

