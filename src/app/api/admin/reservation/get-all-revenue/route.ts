import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { getDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    const allReservations = await db.reservation.findMany({
      include: {
        listing: true,
      },
    });

    if (allReservations.length === 0) return NextResponse.json(0);

    const revenueData = allReservations.map((reservation) => {
      return {
        revenue: reservation.daysDifference * reservation.listing.pricePerNight,
        day: getDay(reservation.endDate),
      };
    });

    const totalRevenue = revenueData.reduce((a, b) => a + b.revenue, 0);

    return NextResponse.json({
      revenueData,
      totalRevenue,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
