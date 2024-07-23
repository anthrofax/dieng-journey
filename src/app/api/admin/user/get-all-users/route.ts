import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    const allUsers = await db.user.findMany({});

    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
