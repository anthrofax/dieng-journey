import db from "@/lib/db";
import { calcAndSortListings } from "@/lib/sort-listings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const listings = db.listing.findMany({
      include: {
        reviews: true,
      },
    });

    const sortedListings = calcAndSortListings(listings).slice(0, 4);
  } catch (error) {
    NextResponse.json({ error });
  }
}
