import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { decrypt } from "@/utils/session";
import { JWTPayload } from "jose";
import { emailTransporter } from "@/utils/emailTransporter";
import { headers } from "next/headers";

interface ReceivedDecodedType {
  userId: string;
  ait: number;
  exp: number;
}

interface ResultType {
  error?: string;
  normalMessage?: string;
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

    const signedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      },
    });

    // Kirim email verifikasi
    const hostname = headers().get("x-forwarded-host");
    const loginLink = `http://${hostname}/login`;

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Selamat Datang di Fierto Travel Agency</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; color: #333;">
  <table align="center" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #fff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <tr>
      <td style="background-color: #007bff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; font-size: 24px; margin: 0;">Fierto Travel Agency</h1>
        <p style="color: #fff; margin: 0; font-size: 16px;">Partner for Your Incredible Journey</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="font-size: 16px; margin: 0;">Halo <strong>${signedUser.username}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6; margin-top: 10px;">Selamat! Akun Anda di <strong>Fierto Travel Agency</strong> telah berhasil terdaftar. Kami sangat senang Anda menjadi bagian dari perjalanan luar biasa ini.</p>
        <p style="font-size: 14px; line-height: 1.6; margin-top: 10px;">Anda sekarang dapat mulai menjelajahi berbagai layanan kami dan merencanakan perjalanan yang tak terlupakan.</p>
        <p style="text-align: center; margin-top: 20px;">
          <a href="${loginLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 4px;">Masuk ke Akun Anda</a>
        </p>
        <p style="font-size: 14px; line-height: 1.6; margin-top: 20px;">Jika Anda memerlukan bantuan atau memiliki pertanyaan, jangan ragu untuk menghubungi kami kapan saja.</p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px;">
        <p style="margin: 0;">© 2025 Fierto Travel Agency. All Rights Reserved.</p>
        <p style="margin: 0;">Jika Anda tidak merasa membuat akun, abaikan email ini.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: signedUser.email,
      subject: "Fierto Travel Agency | Partner for Your Incredible Journey",
      html,
    };

    const res = await new Promise((resolve, reject) => {
      emailTransporter.sendMail(mailOptions, (error) => {
        if (error) {
          reject({
            error: `Terjadi kesalahan internal.`,
          });
        }
      });
      resolve({
        message: "Akun anda berhasil terdaftar.",
      });
    });

    return NextResponse.json(res as ResultType, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
