import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const allDestinations = await db.destination.findMany({});

    return NextResponse.json(allDestinations);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
