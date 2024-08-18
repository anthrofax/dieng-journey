import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    const getAllOrders = await db.order.findMany({
      include: {
        destination: true,
        user: true,
        experiences: true,
      },
    });

    return NextResponse.json(getAllOrders);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
