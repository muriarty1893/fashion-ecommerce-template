import { NextResponse } from "next/server";
import { getNextNumericId, readDemoDb, writeDemoDb } from "../../../lib/demoDb";

export const GET = async () => {
  const db = await readDemoDb();
  return NextResponse.json(db.users);
};

export const POST = async (request: Request) => {
  const db = await readDemoDb();
  const body = await request.json();
  const user = {
    ...body,
    id: String(getNextNumericId(db.users)),
  } as User;

  db.users.push(user);
  await writeDemoDb(db);

  return NextResponse.json(user, { status: 201 });
};
