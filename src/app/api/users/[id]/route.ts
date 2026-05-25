import { NextResponse } from "next/server";
import { readDemoDb, writeDemoDb } from "../../../../lib/demoDb";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const db = await readDemoDb();
  const user = db.users.find((item) => String(item.id) === id);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const db = await readDemoDb();
  const body = await request.json();
  const userIndex = db.users.findIndex((item) => String(item.id) === id);

  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  db.users[userIndex] = {
    ...db.users[userIndex],
    ...body,
    id: db.users[userIndex].id,
  };

  await writeDemoDb(db);

  return NextResponse.json(db.users[userIndex]);
};
