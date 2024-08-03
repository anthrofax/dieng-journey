import db from "@/lib/db";
import { calcAndSortListings } from "@/lib/sort-data-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const listings = await db.listing.findMany({
      include: {
        reviews: true,
      },
    });

    const sortedListings = calcAndSortListings(listings).slice(0, 4);

    return NextResponse.json(sortedListings);
  } catch (error) {
    NextResponse.json({ error });
  }
}
