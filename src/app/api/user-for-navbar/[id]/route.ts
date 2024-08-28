import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: any) {
  try {
    const { id } = res.params;

    const user = await db.user.findUnique({
      where: { id },
      select: {
        email: true,
        username: true,
        profileImage: true,
      },
    });

    if (!user) throw new Error("User not found");

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
