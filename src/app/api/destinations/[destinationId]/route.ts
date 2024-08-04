import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: any) {
  try {
    const { destinationId } = ctx.params;

    const destination = await db.destination.findUnique({
      where: { destinationId },
    });

    return NextResponse.json(destination);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
