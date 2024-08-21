"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../components/data-table";
import {
  getAllPackageOrders,
  getAllRegularOrders,
} from "../../services/service";
import { Destination, Experience, Order, PackageOrder } from "@prisma/client";
import { columns } from "./table/column";
import { AdminPackageOrderType, AdminRegularOrderType } from "./type";
import { Skeleton } from "@/components/ui/skeleton";
import AdminSkeleton from "../../components/admin-skeleton";

const Orders = () => {
  const { data: allRegularOrders, isLoading: isRegularOrdersLoading } =
    useQuery({
      queryFn: getAllRegularOrders,
      queryKey: ["admin", "orders"],
    });

  const { data: allPackageOrders, isLoading: isPackageOrdersLoading } =
    useQuery({
      queryFn: getAllPackageOrders,
      queryKey: ["admin", "package-orders"],
    });

  if (isRegularOrdersLoading || isPackageOrdersLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  const combinedOrders = [
    ...allRegularOrders.map((order: AdminRegularOrderType) => ({
      userProfile: order.user.profileImage,
      nama: order.nama,
      nomorHp: order.nomorHp,
      lokasiPenjemputan: order.lokasiPenjemputan,
      masaPerjalanan: order.masaPerjalanan,
      opsiPenginapan: order?.penginapan,
      tanggalPerjalanan: order.tanggalPerjalanan,
      destinasi: order.destination,
      jumlahPembelianTiket: order.qty,
      totalPendapatan: order.totalBiaya,
      experience: order.experiences,
      jenisPesanan: "Reguler",
      action: <button>Lihat Detail</button>,
    })),
    ...allPackageOrders.map((order: AdminPackageOrderType) => ({
      nama: order.nama,
      nomorHp: order.nomorHp,
      lokasiPenjemputan: order.lokasiPenjemputan,
      masaPerjalanan: order.masaPerjalanan,
      opsiPenginapan: order?.penginapan || "Tidak memesan penginapan",
      tanggalPerjalanan: order.tanggalPerjalanan,
      destinasi: order.destinations,
      jumlahPembelianTiket: order.nama.length,
      totalPendapatan: order.totalBiaya,
      experience: order.experiences,
      jenisPesanan: "Paket",
      action: <button>Lihat Detail</button>,
    })),
  ];

  return (
    <div className="py-10 col-span-12 lg:col-span-10 lg:w-full grid grid-rows-12">
      <div className="row-span-12 px-5">
        <div className="flex justify-between py-3 items-center">
          <h2 className="text-3xl text-slate-800 font-semibold mb-3 text-center lg:text-left">
            Semua Transaksi
          </h2>
        </div>
        <div className="mt-2 h-full w-[80vw] max-lg:mx-auto">
          {isPackageOrdersLoading || isRegularOrdersLoading ? (
            <AdminSkeleton />
          ) : (
            <DataTable
              columns={columns}
              data={combinedOrders}
              filterByLabel="Nama Customer"
              filterBy="nama"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
