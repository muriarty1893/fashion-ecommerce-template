import { NextResponse } from "next/server";
import { readSession } from "../../../../lib/auth";

export const GET = async (request: Request) => {
  const session = readSession(request);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json(session);
};

