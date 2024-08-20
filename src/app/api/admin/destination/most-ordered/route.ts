import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    const allDestinations = await db.destination.findMany({
      include: {
        orders: true,
        packageOrders: true
      },
    });

    const mostOrderedDestination = allDestinations.reduce((a, b) => {
      return a?.orders?.length + a?.packageOrders?.length >=
        b?.orders?.length + b?.packageOrders?.length
        ? a
        : b;
    });

    return NextResponse.json(mostOrderedDestination);
  } catch (error) {
    console.log("Error message: " + error);
    return NextResponse.json({ error });
  }
}
