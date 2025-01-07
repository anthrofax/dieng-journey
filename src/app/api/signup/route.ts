import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { emailTransporter } from "@/utils/emailTransporter";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termCondition: boolean;
}

interface ResultType {
  error?: string;
  normalMessage?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SignupData;
    console.log(body);

    const { username, email, password, confirmPassword } = body;

    console.log({ username, email, password });

    //   // Pastikan semua kolom diisi
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Kolom tidak lengkap" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password yang anda inputkan tidak sama." },
        { status: 400 }
      );
    }

    if (password.length < 8)
      return NextResponse.json(
        { error: "Password harus berjumlah 8 karakter." },
        { status: 400 }
      );

    let existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser && existingUser.isVerified) {
      return NextResponse.json(
        { error: "Email sudah terdaftar!" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!existingUser)
      existingUser = await db.user.create({
        data: { username, email, password: hashedPassword, isVerified: false },
      });
    else {
      existingUser = await db.user.update({
        where: {
          id: existingUser.id,
        },
        data: { username, password: hashedPassword },
      });
    }

    const verificationToken = jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 30,
      }
    );

    // Kirim email verifikasi
    const hostname = headers().get("x-forwarded-host");
    const verificationLink = `http://${hostname}/verify-email`;

    const htmlTemplate = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifikasi Email</title>
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
        <p style="font-size: 16px; margin: 0;">Halo <strong>${username}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6; margin-top: 10px;">Terima kasih telah mendaftar di <strong>Fierto Travel Agency</strong>. Kami senang Anda bergabung dengan kami. Untuk menyelesaikan proses pendaftaran, silakan verifikasi alamat email Anda dengan mengklik tombol di bawah ini:</p>
        <p style="text-align: center; margin-top: 20px;">
          <a href="${verificationLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 4px;">Verifikasi Email</a>
        </p>
        <p style="font-size: 14px; line-height: 1.6; margin-top: 20px;">Jika tombol di atas tidak berfungsi, Anda juga dapat menyalin dan menempelkan URL berikut ke browser Anda:</p>
        <p style="font-size: 14px; color: #007bff; word-break: break-all; margin: 10px 0;">${verificationLink}</p>
        <p style="font-size: 14px; line-height: 1.6; margin-top: 20px; color: #e74c3c;"><strong>Catatan:</strong> Link ini hanya berlaku selama <strong>30 menit</strong>. Pastikan Anda membuka link ini di browser yang sama saat Anda melakukan pendaftaran.</p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px;">
        <p style="margin: 0;">© 2025 Fierto Travel Agency. All Rights Reserved.</p>
        <p style="margin: 0;">Jika Anda tidak merasa melakukan pendaftaran, abaikan email ini.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Fierto Travel Agency | Partner for Your Incredible Journey",
      html: htmlTemplate,
    };

    const res = await new Promise((resolve, reject) => {
      emailTransporter.sendMail(mailOptions, (error) => {
        if (error) {
          reject({
            message: `Gagal mengirim OTP. Coba lagi. ${error}`,
          });
        }
      });
      resolve({
        message: "Link verifikasi pendaftaran sudah dikirim ke email anda.",
        token: verificationToken,
      });
    });

    return NextResponse.json(res as ResultType, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
