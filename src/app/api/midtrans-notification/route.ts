import db from "@/lib/db";
import { Experience } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      transaction_status,
      order_id,
      metadata: {
        experience,
        lokasiPenjemputan,
        masaPerjalanan,
        nama,
        nomorHp,
        tanggalPerjalanan,
        userId,
        qty,
        totalBiaya,
        destinationId,
        penginapanId,
      },
    } = await req.json();

    if (
      (transaction_status === "deny" ||
        transaction_status === "cancel" ||
        transaction_status === "expire" ||
        transaction_status === "failure") &&
      transaction_status !== "pending"
    ) {
      throw new Error("Pembayaran Gagal");
    }

    if (
      (transaction_status === "settlement" ||
        transaction_status === "capture") &&
      transaction_status !== "pending"
    ) {
      const createdOrder = await db.order.create({
        data: {
          lokasiPenjemputan,
          masaPerjalanan,
          nama,
          nomorHp,
          qty,
          tanggalPerjalanan,
          totalBiaya: totalBiaya.toString(),
          penginapanId,
          userId,
          destinationId,
        },
      });

      experience.forEach(async (experienceItem: Experience) => {
        await db.orderExperience.create({
          data: {
            experienceId: experienceItem.id,
            orderId: createdOrder.id,
          },
        });
      });

      return NextResponse.json({ message: "Pembayaran berhasil" });
    }

    return NextResponse.json({ message: "Loading" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
