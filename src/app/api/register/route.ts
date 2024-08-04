import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, username, password } = body;

    const isExisting = await db.user.findUnique({
      where: {
        email,
        username,
      },
    });

    if (isExisting) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        phone: "",
        profileImage:
          "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1721879584/empty-profile_d7fhjp.webp",
        displayName: "Unknown",
      },
    });

    return NextResponse.json(
      { message: "User has registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("error");
  }
}
