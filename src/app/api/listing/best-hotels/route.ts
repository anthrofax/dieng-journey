import db from "@/lib/db";
import { calcAndSortListings } from "@/lib/sort-listings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const listings = await db.listing.findMany({
      include: {
        reviews: true,
      },
    });

    const sortedListings = calcAndSortListings(listings).slice(0, 4);
    console.log("GET Request: " + sortedListings);

    return NextResponse.json(sortedListings);
  } catch (error) {
    NextResponse.json({ error });
  }
}
