import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, stars } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("Kamu belum login");

    const userId = currentUser.id;

    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get("id") ?? "";

    console.log(listingId);

    const createdReview = await db.review.create({
      data: {
        text,
        stars,
        listingId,
        userId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(createdReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
