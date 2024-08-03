import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await isAdminUser();

    const body = await req.json();
    Object.values(body).forEach((v) => {
      if (v === "") return NextResponse.json({ error: "Fill all fields!" });
    });

    const { city, description, destinationName, imageUrls, price } = body;
    console.log(body);

    await db.destination.create({
      data: {
        city,
        description,
        destinationName,
        imageUrls,
        price,
      },
    });

    return NextResponse.json(
      { message: "Data Destinasi telah berhasil ditambah" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
