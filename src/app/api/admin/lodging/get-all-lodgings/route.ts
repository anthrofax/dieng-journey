import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    const allLodgings = await db.penginapan.findMany({});

    return NextResponse.json(allLodgings);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
