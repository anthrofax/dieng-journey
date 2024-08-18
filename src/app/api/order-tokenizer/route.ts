import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/currentUser";
import { MidtransClient } from "midtrans-node-client";
import { v4 as uuidv4 } from "uuid";
import { Experience, Penginapan } from "@prisma/client";
import db from "@/lib/db";
import { TokenizerRequestBodyType } from "@/app/(pages)/destinations/[destinationId]/type";

const snap = new MidtransClient.Snap({
  isProduction: false,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
  serverKey: process.env.MIDTRANS_ID_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Kamu belum login.");

    const body = await req.json();

    const {
      namaDestinasi,
      hargaDestinasi,
      experience,
      lokasiPenjemputan,
      masaPerjalanan,
      nama,
      nomorHp,
      penginapanId,
      qty,
      tanggalPerjalanan,
      destinationId,
      allExperiences,
      allLodgings,
      totalBiaya
    } = body as TokenizerRequestBodyType;

    const itemDetails: {
      price: number;
      quantity: number;
      name: string;
    }[] = [];

    itemDetails.push({
      price: hargaDestinasi,
      quantity: qty,
      name: `Tiket Destinasi ${namaDestinasi}`,
    });

    const penginapanYangDipilih = allLodgings.find(
      (penginapan) => penginapan.id === penginapanId
    );

    if (penginapanYangDipilih) {
      itemDetails.push({
        price: penginapanYangDipilih.biaya,
        quantity: masaPerjalanan,
        name: `${`Malam | ${penginapanYangDipilih.namaPenginapan}`}`,
      });
    }

    experience.forEach((idExperienceYgDipilih) => {
      const experienceYgDipilih = allExperiences.find(
        (experienceItem) => experienceItem.id === idExperienceYgDipilih
      );

      if (experienceYgDipilih) {
        itemDetails.push({
          name: experienceYgDipilih.namaExperience,
          price: experienceYgDipilih.biaya,
          quantity: 1,
        });
      }
    });

    const parameter = {
      item_details: itemDetails,
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
        tanggalPerjalanan: tanggalPerjalanan,
        userId: currentUser.id,
        qty,
        totalBiaya,
        destinationId,
        penginapanId,
      },
    };

    console.log(
      "Sending parameter to Midtrans:",
      JSON.stringify(parameter, null, 2)
    );

    const token = await snap.createTransactionToken(parameter);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Midtrans Error: ", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
