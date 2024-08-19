import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { getDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    const getAllPackageOrders = await db.packageOrder.findMany({});

    console.log(getAllPackageOrders);

    if (getAllPackageOrders.length === 0) return NextResponse.json(0);

    const dataPendapatan = getAllPackageOrders.map((order) => {
      return {
        pendapatan: order.totalBiaya,
        hari: getDay(order.createdAt),
      };
    });

    const totalPendapatan = dataPendapatan.reduce(
      (a, b) => a + b.pendapatan,
      0
    );

    return NextResponse.json({
      dataPendapatan,
      totalPendapatan,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
