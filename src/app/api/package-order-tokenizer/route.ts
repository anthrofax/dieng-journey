import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/currentUser";
import { MidtransClient } from "midtrans-node-client";
import { v4 as uuidv4 } from "uuid";
import { Experience, Penginapan } from "@prisma/client";
import db from "@/lib/db";
import { TokenizerRequestBodyType } from "@/app/(pages)/order-package/type";

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
      experience,
      lokasiPenjemputan,
      masaPerjalanan,
      nama,
      nomorHp,
      penginapanId,
      tanggalPerjalanan,
      daftarDestinasi,
      totalBiaya,
      selectedPackage,
    } = (await req.json()) as TokenizerRequestBodyType;

    const parameter = {
      item_details: {
        price: totalBiaya,
        quantity: nama.length,
        name: `Tiket Paket ${
          selectedPackage === "travelling" ? "Travelling" : "Healing"
        }`,
      },

      customer_details: {
        first_name: nama[0],
        last_name: "",
        email: currentUser.email,
        phone: nomorHp,
      },
      transaction_details: {
        order_id: uuidv4(),
        gross_amount: totalBiaya * nama.length,
      },
      metadata: {
        experience,
        lokasiPenjemputan,
        masaPerjalanan,
        nama,
        nomorHp,
        tanggalPerjalanan: tanggalPerjalanan,
        userId: currentUser.id,
        totalBiaya,
        penginapanId,
        daftarDestinasi,
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
