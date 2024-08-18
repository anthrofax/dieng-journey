import { RegularOrderMidtransNotificationMetadataType } from "@/app/(pages)/destinations/[destinationId]/type";
import { PackageOrderMidtransNotificationMetadataType } from "@/app/(pages)/order-package/type";
import db from "@/lib/db";
import { Experience } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
      console.log(req.nextUrl.pathname);
      if (req.nextUrl.pathname === "/api/package-order-tokenizer") {
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

        experience.forEach(async (idExperience: string) => {
          await db.packageOrderExperience.create({
            data: {
              experienceId: idExperience,
              packageOrderId: createdOrder.id,
            },
          });
        });

        daftarDestinasi.forEach(async (idDestinasi: string) => {
          await db.packageOrderDestination.create({
            data: {
              destinationId: idDestinasi,
              packageOrderId: createdOrder.id,
            },
          });
        });

        return NextResponse.redirect("/orders");
      }

      if (req.nextUrl.pathname === "/api/order-tokenizer") {
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

        experience.forEach(async (experienceItem: Experience) => {
          await db.orderExperience.create({
            data: {
              experienceId: experienceItem.id,
              orderId: createdOrder.id,
            },
          });
        });

        return NextResponse.redirect("/orders");
      }
    }

    return NextResponse.json({ message: "Pembayaran Berhasil" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
