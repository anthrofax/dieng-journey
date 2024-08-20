import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { getMonth, getYear } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    const currentYear = getYear(new Date());

    const getAllPackageOrders = await db.packageOrder.findMany({
      where: {
        createdAt: {
          gte: new Date(currentYear, 0, 1), // Mulai dari 1 Januari tahun ini
          lt: new Date(currentYear + 1, 0, 1), // Kurang dari 1 Januari tahun depan
        },
      },
    });

    console.log(getAllPackageOrders);

    if (getAllPackageOrders.length === 0) return NextResponse.json(0);

    const dataPendapatan = getAllPackageOrders.map((order) => {
      return {
        pendapatan: order.totalBiaya,
        bulan: getMonth(order.createdAt),
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
