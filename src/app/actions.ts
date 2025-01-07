"use server";

import db from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ReceivedDecodedType {
  userId: string;
  ait: number;
  exp: number;
}

export async function verifyEmail() {
  let path = "";
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    console.log(token);

    if (!token || !token.value || token.value === "") {
      throw new Error("Permintaan anda tidak valid");
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string);

    if (!decoded) throw new Error("Token tidak valid.");

    const { userId } = decoded as JwtPayload | ReceivedDecodedType;

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      },
    });

    (await cookies()).delete("token");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    path = "/not-found";
  } finally {
    if (path !== "") redirect(path);
  }
}
