import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import AXIOS_API from "@/utils/axios-api";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

interface ReceivedDecodedType {
  userId: string;
  ait: number;
  exp: number;
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    console.log("TOKEN TEST!!!");
    console.log(cookieStore);
    const token = cookieStore.get("token");

    console.log(token);

    if (!token || !token.value || token.value === "") {
      return NextResponse.json(
        {
          error:
            "Permintaan anda tidak valid.",
        },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string);

    if (!decoded)
      return NextResponse.json(
        { error: "Token tidak valid." },
        { status: 400 }
      );

    const { userId } = decoded as JwtPayload | ReceivedDecodedType;

    const isExisting = await db.user.findUnique({
      where: {
        id: userId,
        isVerified: true,
      },
    });

    console.log("TESTT LOL");
    console.log(isExisting);

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

    (await cookies()).delete("token");

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
