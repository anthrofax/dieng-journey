"use server";

import db from "@/lib/db";
import { sendEmail } from "@/utils/send-email";
import { decrypt, encrypt } from "@/utils/session";
import { JWTPayload } from "jose";
import { headers } from "next/headers";
import bcryptjs from "bcryptjs";

interface SendResetPasswordLinkVerificationReturnedDataType {
  message?: string;
  error?: string;
  token?: string;
}

export async function sendResetPasswordLinkVerification(
  data: FormData
): Promise<SendResetPasswordLinkVerificationReturnedDataType> {
  try {
    const email = data.get("email") as string | undefined;

    if (!email) throw new Error("Email belum diinput!");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Email tidak valid");

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.isVerified) throw new Error("Email belum terdaftar!");

    const expiresAtInMinutes = 30;
    const resetToken = await encrypt(
      { email, expiresAt: Date.now() + 1000 * 60 * expiresAtInMinutes },
      expiresAtInMinutes
    );

    const updatedUser = await db.user.update({
      where: {
        email,
      },
      data: {
        resetToken,
        resetTokenExpiration: new Date(
          Date.now() + 1000 * 60 * expiresAtInMinutes
        ),
      },
    });

    // Kirim email verifikasi
    const hostname = headers().get("x-forwarded-host");
    const verificationLink = `http://${hostname}/reset-password/${resetToken}`;
    const html = `<!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password</title>
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
            <p style="font-size: 16px; margin: 0;">Halo <strong>${updatedUser.username}</strong>,</p>
            <p style="font-size: 14px; line-height: 1.6; margin-top: 10px;">Kami menerima permintaan untuk mereset kata sandi akun Anda di <strong>Fierto Travel Agency</strong>. Untuk melanjutkan, silakan klik tombol di bawah ini:</p>
            <p style="text-align: center; margin-top: 20px;">
              <a href="${verificationLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 4px;">Reset Kata Sandi</a>
            </p>
            <p style="font-size: 14px; line-height: 1.6; margin-top: 20px; color: #e74c3c;"><strong>Catatan:</strong> Link ini hanya berlaku selama <strong>30 menit</strong>. Pastikan Anda membuka link ini di browser yang aman.</p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© 2025 Fierto Travel Agency. All Rights Reserved.</p>
            <p style="margin: 0;">Jika Anda tidak merasa meminta reset kata sandi, abaikan email ini.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    console.log("WOWW");
    const res = await sendEmail({
      emailReceiver: email,
      html,
      returnedSuccessData: {
        message:
          "Link Verifikasi Pemulihan Kata Sandi telah dikirim ke Email anda.",
      },
      subject: "Reset Your Password| Fierto Travel Agency",
    });
    console.log(res);

    return res as { message: string };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: `${error}` };
  }
}

export async function resetPassword(data: FormData, token: string) {
  try {
    const decoded:
      | JWTPayload
      | { email: string; expiresAt: number }
      | undefined = await decrypt(token);

    if (!decoded || typeof decoded.email !== "string")
      throw new Error("Permintaan anda tidak valid");

    const { email } = decoded;

    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    if (!password || typeof password !== "string")
      throw new Error("Anda belum mengisi kata sandi");

    if (password !== confirmPassword)
      throw new Error("Kata sandi yang anda masukkan tidak cocok");

    if ((password as string).length < 8)
      throw new Error("Kata sandi minimal terdiri 8 karakter");

    const existingUser = await db.user.findUnique({
      where: {
        email,
        resetToken: token,
        resetTokenExpiration: {
          gte: new Date(),
        },
      },
    });

    if (!existingUser) throw new Error("Permintaan anda tidak valid");

    const isTheSamePassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (isTheSamePassword)
      throw new Error(
        "Ganti dengan kata sandi yang berbeda dari yang sebelumnya"
      );

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await db.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
        resetTokenExpiration: new Date(0),
      },
    });

    return {
      message: "Kata sandi anda telah berhasil diubah",
    };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: `${error}` };
  }
}
