import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    const getAllPackageOrders = await db.packageOrder.findMany({
      include: {
        user: true,
        penginapan: true,
        destinations: {
          select: {
            destinations: true,
          },
        },
        experiences: {
          select: {
            experiences: true,
          },
        },
      },
    });

    return NextResponse.json(getAllPackageOrders);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
