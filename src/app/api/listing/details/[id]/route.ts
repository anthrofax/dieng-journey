import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: any) {
  try {
    const { id } = ctx.params;

    const currentListing = db.listing.findUnique({
      where: {
        id,
      },
      include: {
        reservations:true,
        reviews:true,
      } 
    });
  } catch (error) {
    NextResponse.json(error);
  }
}
