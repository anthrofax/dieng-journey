"use server";
import db from "@/lib/db";
import { FieldValues } from "react-hook-form";
import jwt from "jsonwebtoken";
import { emailTransporter } from "@/utils/emailTransporter";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";

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

export async function verifyEmail(
  data: FieldValues | SignupData
): Promise<ResultType> {
  try {
    const { username, email, password } = data;
    console.log(data);

    //   // Pastikan semua kolom diisi
    if (!username || !email || !password) {
      console.log("Test");
      throw new Error("Kolom tidak lengkap");
    }

    if (password.length < 8)
      return {
        error: "Password harus berjumlah 8 karakter.",
      };

    // Periksa apakah email sudah terdaftar
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    console.log(existingUser);

    if (existingUser) {
      return {
        error: "Email sudah terdaftar!",
      };
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

    emailTransporter.sendMail(mailOptions, (error) => {
      if (error) {
        return {
          error: `Gagal mengirim OTP. Coba lagi. ${error}`,
        };
      }
    });
    return {
      normalMessage: "Link verifikasi pendaftaran sudah dikirim ke email anda.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: `${error.message}` };
    }

    return { error: `${error}` };
  }
}
