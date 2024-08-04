import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/currentUser";
import { MidtransClient } from "midtrans-node-client";
import { v4 as uuidv4 } from "uuid";

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
      destinationId,
    } = await req.json();

    console.log(hargaDestinasi);
    console.log(namaDestinasi);
    console.log(qty);

    // const reservedDates = getDatesInRange(startDate, endDate);

    const parameter = {
      customer_details: {
        first_name: nama,
        last_name: "",
        email: currentUser.email,
        phone: nomorHp,
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
        tanggalPerjalanan: new Date(tanggalPerjalanan),
        userId: currentUser.id,
        qty,
        totalBiaya,
        destinationId,
        penginapan
      },
    };

    console.log(
      "Sending parameter to Midtrans:",
      JSON.stringify(parameter, null, 2)
    );

    const token = await snap.createTransactionToken(parameter);
    console.log(token);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Midtrans Error: ", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
