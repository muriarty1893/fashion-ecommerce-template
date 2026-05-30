import { NextResponse } from "next/server";
import { clearSessionCookie } from "../../../../lib/auth";

export const POST = async () => {
  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
};

