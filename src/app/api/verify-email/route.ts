import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { emailTransporter } from "@/utils/emailTransporter";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

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
    console.log("testt");
    const body = await req.json();
    console.log(body);

    const { username, email, password } = body;

    console.log({ username, email, password });

    //   // Pastikan semua kolom diisi
    if (!username || !email || !password) {
      console.log("Test");
      return NextResponse.json(
        { error: "Kolom tidak lengkap" },
        { status: 400 }
      );
    }

    if (password.length < 8)
      return NextResponse.json(
        { error: "Password harus berjumlah 8 karakter." },
        { status: 400 }
      );

    // Periksa apakah email sudah terdaftar
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    console.log(existingUser);

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar!" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = jwt.sign(
      { username, email, password: hashedPassword },
      process.env.JWT_SECRET as string,
      {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 30,
      }
    );

    // Kirim email verifikasi
    const hostname = headers().get("x-forwarded-host");
    const verificationLink = `http://${hostname}/verify-email?token=${verificationToken}`;

    const htmlTemplate = `<p>Halo ${username},</p>
                 <p>Terima kasih telah mendaftar. Silakan klik link berikut untuk memverifikasi email Anda:</p>
                 <a href="${verificationLink}">Verifikasi Email</a>
                 <p>Link ini akan berlaku selama 30 menit.</p>`;

    console.log(htmlTemplate);

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
      });
    });

    console.log(res);

    return NextResponse.json(res as ResultType, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
