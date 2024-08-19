import { RegularOrderMidtransNotificationMetadataType } from "@/app/(pages)/destinations/[destinationId]/type";
import { PackageOrderMidtransNotificationMetadataType } from "@/app/(pages)/order-package/type";
import db from "@/lib/db";
import { Experience } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(body.metadata);

    const { transaction_status, order_id } = body;

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
      if (body.metadata.tokenizerType === "package-order") {
        const {
          lokasiPenjemputan,
          masaPerjalanan,
          nama,
          nomorHp,
          tanggalPerjalanan,
          totalBiaya,
          penginapanId,
          userId,
          experience,
          daftarDestinasi,
        } = body.metadata as PackageOrderMidtransNotificationMetadataType;

        const createdOrder = await db.packageOrder.create({
          data: {
            lokasiPenjemputan,
            masaPerjalanan,
            nama,
            nomorHp,
            tanggalPerjalanan,
            totalBiaya,
            penginapanId: penginapanId || "",
            userId,
          },
        });

        let createdExperience;
        let createdDestinations;

        experience.forEach(async (idExperience: string) => {
          createdExperience = await db.packageOrderExperience.create({
            data: {
              experienceId: idExperience,
              packageOrderId: createdOrder.id,
            },
          });
        });

        daftarDestinasi.forEach(async (idDestinasi: string) => {
          createdDestinations = await db.packageOrderDestination.create({
            data: {
              destinationId: idDestinasi,
              packageOrderId: createdOrder.id,
            },
          });
        });

        if (createdOrder || createdExperience || createdDestinations)
          return NextResponse.json({ message: "Pembayaran Berhasil" });
      }

      if (body.metadata.tokenizerType === "regular-order") {
        const {
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
          experience,
        } = body.metadata as RegularOrderMidtransNotificationMetadataType;

        const createdOrder = await db.order.create({
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

        const createdExperience = experience.forEach(
          async (experienceId: string) => {
            const addedExperience = await db.orderExperience.create({
              data: {
                experienceId: experienceId,
                orderId: createdOrder.id,
              },
            });

            console.log(addedExperience);
          }
        );

        if (createdOrder || createdExperience)
          return NextResponse.json({ message: "Pembayaran Berhasil" });
      }
    }

    return NextResponse.json({ message: "Pembayaran Berhasil" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
