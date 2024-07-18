import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: any) {
  try {
    const { id } = ctx.params;

    const listing = await db.listing.findUnique({
      where: {
        id,
      },
      include: {
        reservations: true,
        reviews: true,
      },
    });

    if (!listing) throw new Error("Listing is not found");

    const avgRating =
      listing.reviews.reduce((a, b) => {
        return a + b.stars;
      }, 0) / listing.reviews.length;

    return NextResponse.json({
      ...listing,
      avgRating: avgRating ? Number(avgRating.toFixed(2)) : 0,
    });
  } catch (error) {
    NextResponse.json(error);
  }
}
