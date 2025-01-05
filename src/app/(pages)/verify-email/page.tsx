import db from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

interface ReceivedDecodedType {
  username: string;
  email: string;
  password: string;
  ait: number;
  exp: number;
}

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) {
  let path = "";

  try {
    let token = (await searchParams).token || "";

    if (typeof token === "object") token = token[0];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) throw new Error("Token tidak valid.");

    const { username, email, password } = decoded as
      | JwtPayload
      | ReceivedDecodedType;

    const isExist = await db.user.findUnique({
      where: {
        email,
      },
    });

    console.log("Test 2");
    if (!!isExist)
      throw new Error(
        "Anda sudah melakukan pendaftaran sebelumnya. Silahkan login menggunakan akun tersebut."
      );

    await db.user.create({
      data: { username, email, password },
    });
  } catch (error) {
    console.log(error);
    path = "/login";
  } finally {
    if (path !== "") redirect(path);
  }

  return (
    <div className="pt-28 pb-16">
      <p>Email anda berhasil terdaftar</p>
      <p>
        Silahkan login, dengan akun mu <a href="/login">disini</a>
      </p>
    </div>
  );
}

export default page;
