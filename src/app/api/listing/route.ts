import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import isAdminUser from "@/lib/isAdminUser";

export async function GET(req: NextRequest) {
  try {
    const listings = await db.listing.findMany({
      take: 10,
    });

    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json(error);
  }
}
