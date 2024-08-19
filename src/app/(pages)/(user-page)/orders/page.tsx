import React from "react";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import OrdersTable from "./components/orders-table";
import { PackageOrderType, RegularOrderType } from "./type";

export default async function OrdersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    return (
      <div className="orders-container">
        <h1>Transaksi Saya</h1>
        <p>
          Mohon untuk login terlebih dahulu untuk melihat daftar transaksimu.
        </p>
      </div>
    );
  }

  const regularOrders: RegularOrderType[] = await db.order.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      destination: true,
      penginapan: true,
      experiences: {
        select: {
          experiences: true,
        },
      },
    },
  });

  const packageOrders: PackageOrderType[] = await db.packageOrder.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      destinations: {
        select: {
          destinations: true,
        },
      },
      experiences: {
        select: {
          experiences: true,
        },
      },
      penginapan: true,
    },
  });

  return (
    <div className="col-span-8 lg:col-span-7 w-full px-5">
      <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">
        Transaksi Saya
      </h1>
      <OrdersTable
        regularOrders={regularOrders}
        packageOrders={packageOrders}
      />
    </div>
  );
}
