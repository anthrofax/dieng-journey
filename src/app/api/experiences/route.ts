import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const allExperiences = await db.experience.findMany({});

    return NextResponse.json(allExperiences);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
