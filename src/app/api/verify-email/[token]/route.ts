import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { decrypt } from "@/utils/session";
import { JWTPayload } from "jose";

interface ReceivedDecodedType {
  userId: string;
  ait: number;
  exp: number;
}

export async function POST(req: NextRequest, ctx: any) {
  const { token } = ctx.params;
  try {
    const decoded = await decrypt(token);

    if (!decoded)
      return NextResponse.json(
        { error: "Permintaan tidak valid." },
        { status: 400 }
      );

    const { userId } = decoded as JWTPayload | ReceivedDecodedType;

    if (!userId || typeof userId !== "string")
      return NextResponse.json(
        { error: "Permintaan tidak valid." },
        { status: 400 }
      );

    const isExisting = await db.user.findUnique({
      where: {
        id: userId,
        isVerified: true,
      },
    });

    if (isExisting)
      return NextResponse.json(
        {
          error:
            "Akun anda telah terverifikasi. Silahkan login menggunakan akun tersebut",
        },
        { status: 400 }
      );

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      },
    });

    return NextResponse.json(
      { message: "Akun anda berhasil terdaftar." },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
