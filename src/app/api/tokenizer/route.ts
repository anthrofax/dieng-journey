import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/currentUser";
import { MidtransClient } from "midtrans-node-client";
import { v4 as uuidv4 } from "uuid";
import { Experience, Penginapan } from "@prisma/client";
import db from "@/lib/db";

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
      penginapanId,
      qty,
      tanggalPerjalanan,
      destinationId,
      allLodgings,
      allExperiences,
    } = await req.json();

    const penginapanYangDipilih = await db.penginapan.findUnique({
      where: {
        id: penginapanId,
      },
      select: {
        namaPenginapan: true,
        biaya: true,
      },
    });

    const biayaExperience = experience.reduce(
      (acc: number, selectedExperienceId: string) => {
        const experienceItem = allExperiences.find(
          (exp: Experience) => exp.id === selectedExperienceId
        );
        if (experienceItem) {
          return acc + experienceItem.biaya;
        }
        return acc;
      },
      0
    );

    const totalBiaya =
      hargaDestinasi * qty +
      biayaExperience +
      (penginapanYangDipilih?.biaya || 0) * masaPerjalanan;

    const parameter = {
      item_details: [
        {
          price: hargaDestinasi,
          quantity: qty,
          name: `Tiket Destinasi ${namaDestinasi}`,
        },
        {
          price: penginapanYangDipilih?.biaya || 0,
          quantity: masaPerjalanan,
          name: `${
            penginapanYangDipilih?.namaPenginapan
              ? `Malam | ${penginapanYangDipilih.namaPenginapan}`
              : "Tidak memesan penginapan"
          }`,
        },
        {
          price: biayaExperience,
          quantity: 1,
          name: "Experience yang dipilih",
        },
      ],
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
    console.log(token);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Midtrans Error: ", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
