import db from "@/lib/db";
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

    const body = {
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
    };

    console.log(body);

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
      // const reservedDates = getDatesInRange(startDate, endDate);
      console.log("etst");
      const newReservation = await db.order.create({
        data: {
          lokasiPenjemputan,
          masaPerjalanan,
          nama,
          nomorHp,
          qty,
          tanggalPerjalanan,
          totalBiaya,
          penginapanId,
          userId,
          destinationId,
        },
      });

      return NextResponse.json(newReservation);
    }

    return NextResponse.json({ message: "Loading" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
