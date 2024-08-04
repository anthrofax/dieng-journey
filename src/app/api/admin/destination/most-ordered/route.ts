import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    console.log("test");
    const allDestinations = await db.destination.findMany({
      include: {
        orders: true, 
      },
    });

    const mostOrderedDestination = allDestinations.reduce((a, b) => {
      return a?.orders?.length >= b?.orders?.length ? a : b;
    });

    console.log("hasil " + mostOrderedDestination);

    return NextResponse.json(mostOrderedDestination);
  } catch (error) {
    console.log("Error message: " + error);
    return NextResponse.json({ error });
  }
}
