import { metadata } from "@/app/layout";
import { getDatesInRange } from "@/lib/date-to-milliseconds";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      transaction_status,
      order_id,
      metadata: {
        startDate,
        endDate,
        listingId,
        pricePerNight,
        daysDifference,
        userId,
      },
    } = await req.json();

    console.log(transaction_status);
    console.log(order_id);
    console.log(metadata);

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
      const reservedDates = getDatesInRange(startDate, endDate);

      const reservationData = {
        userId,
        listingId,
        startDate,
        endDate,
        chargeId: order_id,
        reservedDates,
        daysDifference: daysDifference,
      };

      console.log(reservationData);

      const newReservation = await db.reservation.create({
        data: reservationData,
      });

      console.log(newReservation);

      return NextResponse.json(newReservation);
    }

    return NextResponse.json({ message: "Loading" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
