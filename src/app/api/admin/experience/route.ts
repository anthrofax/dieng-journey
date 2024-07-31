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

    const { experienceName, price, imageUrls, description, destinationId } =
      body;

    console.log(body);

    const test = await db.experience.create({
      data: {
        experienceName,
        price: +price,
        imageUrls,
        description,
        destinationId,
      },
    });

    console.log(test);

    return NextResponse.json({
      message: "Data Experience telah berhasil ditambahkan",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
