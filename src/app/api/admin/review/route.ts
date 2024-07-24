import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    const reviews = await db.review.findMany({});

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({error});
  }
}
