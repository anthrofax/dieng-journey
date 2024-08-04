import { getCurrentUser } from "@/lib/currentUser";
import { getDatesInRange } from "@/lib/date-to-milliseconds";
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
        penginapan,
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
      // const reservedDates = getDatesInRange(startDate, endDate);
      console.log("etst");
      const newReservation = await db.order.create({
        data: {
          lokasiPenjemputan,
          masaPerjalanan: Number(masaPerjalanan),
          nama,
          nomorHp,
          qty,
          tanggalPerjalanan: new Date(tanggalPerjalanan),
          totalBiaya,
          penginapan,
          userId,
          destinationId,
          experience,
        },
      });

      return NextResponse.json(newReservation);
    }

    return NextResponse.json({ message: "Loading" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
