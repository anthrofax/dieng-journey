import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/currentUser";
import { MidtransClient } from "midtrans-node-client";
import { v4 as uuidv4 } from "uuid";
import { getDatesInRange } from "@/lib/date-to-milliseconds";

const snap = new MidtransClient.Snap({
  isProduction: false,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
  serverKey: process.env.MIDTRANS_ID_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("Kamu belum login.");

    const {
      namaDestinasi,
      hargaDestinasi,
      experience,
      lokasiPenjemputan,
      masaPerjalanan,
      nama,
      nomorHp,
      penginapan,
      qty,
      tanggalPerjalanan,
      totalBiaya,
      destinationId
    } = await req.json();

    // const reservedDates = getDatesInRange(startDate, endDate);

    let parameter = {
      item_details: {
        name: namaDestinasi,
        price: hargaDestinasi,
        quantity: qty,
        brand: "Dieng Journey",
        category: "Travel Place",
        userId: currentUser.id,
      },
      transaction_details: {
        order_id: uuidv4(),
        gross_amount: totalBiaya,
      },
      metadata: {
        experience,
        lokasiPenjemputan,
        masaPerjalanan,
        nama,
        nomorHp,
        penginapan,
        tanggalPerjalanan,
        userId: currentUser.id,
        qty,
        totalBiaya,
        destinationId
      },
    };

    const token = await snap.createTransactionToken(parameter);

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
