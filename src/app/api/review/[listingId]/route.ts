import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: any) {
  try {
    const { listingId } = ctx.params;

    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        reviews: true,
      },
    });

    if (!listing) throw new Error("Listing is not found");

    const reviewsIds = listing.reviews.map(({ id }) => id);

    const reviews = await db.review.findMany({
      where: {
        id: {
          in: reviewsIds,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
