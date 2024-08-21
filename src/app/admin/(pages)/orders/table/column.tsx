import Image from "next/image";
import { format } from "date-fns";
import { IoEye } from "react-icons/io5";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";
import { Rupiah } from "@/utils/format-currency";
import { id } from "date-fns/locale";
import { Destination, Experience, Order } from "@prisma/client";
import { AdminRegularOrderType } from "../type";
import Link from "next/link";
import { lokasiPenjemputan } from "@/app/(pages)/order-package/page";

export const columns = [
  {
    accessorKey: "nama",
    header: "Pelanggan",
    cell: ({ row }: { row: any }) => {
      const customerName = row.original.nama;
      const customerProfileImage = row.original.userProfile;

      return (
        <div className="flex gap-x-3 items-center">
          <Image
            alt="Gambar Destinasi yang Diorder"
            src={customerProfileImage}
            width={35}
            height={35}
            className="rounded-full object-cover aspect-square"
          />
          <span>
            {Array.isArray(customerName)
              ? customerName.join(",")
              : customerName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "destinasi",
    header: "Destinasi",
    cell: ({ row }: { row: any }) => {
      const jumlahTempatDestinasi = Array.isArray(row.original.destinasi)
        ? row.original.destinasi.length
        : 1;

      return <span>{jumlahTempatDestinasi} Tempat</span>;
    },
  },
  {
    accessorKey: "jumlahPembelianTiket",
    header: "Jumlah Pembelian Ticket",
    cell: ({ row }: { row: any }) => {
      const jumlahPembelianTiket = row.original.jumlahPembelianTiket;

      return <span>Untuk {jumlahPembelianTiket} Orang</span>;
    },
  },
  {
    accessorKey: "totalPendapatan",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted === "asc")}
        >
          Pendapatan
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const totalPendapatan = row.original.totalPendapatan;

      return (
        <span className="block text-left">
          {Rupiah.format(totalPendapatan)}
        </span>
      );
    },
  },
  {
    accessorKey: "jumlahTempatExperienceTambahan",
    header: "Experience Tambahan",
    cell: ({ row }: { row: any }) => {
      const jumlahTempatExperienceTambahan = row.original.experience.length;

      return <span>{jumlahTempatExperienceTambahan} Tempat</span>;
    },
  },
  {
    accessorKey: "jenisPesanan",
    header: "Jenis Pesanan",
    cell: ({ row }: { row: any }) => {
      const jenisPesanan = row.original.jenisPesanan;

      return <span>{jenisPesanan}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ActionsColumn,
  },
];

function ActionsColumn({ row }: { row: any }) {
  const orders = row.original;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <IoEye color="rgb(37 99 235)" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detail Transaksi</DialogTitle>
          <DialogDescription>
            Gunakan data ini untuk keperluan koordinasi dengan customer nanti.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-4 text-sm md:text-base w-full h-fit max-h-[512px] overflow-y-auto">
          {/* Detail Regular Order */}
          <div className="grid grid-cols-5 gap-x-2 items-start">
            <div className="col-span-2 font-semibold flex items-start gap-2">
              <label className="w-[98%]">Nama</label>
              <span>:</span>
            </div>
            {Array.isArray(orders.nama) ? (
              <ul className="col-span-3 list-disc pl-5">
                {orders.nama.map((nama: string, i: number) => (
                  <li key={i}>{nama}</li>
                ))}
              </ul>
            ) : (
              <p className="col-span-3">{orders.nama}</p>
            )}
          </div>

          <div className="grid grid-cols-5 gap-x-2 items-start">
            <div className="col-span-2 font-semibold flex items-start gap-2">
              <label className="w-[98%]">Nomor HP</label>
              <span>:</span>
            </div>
            <p className="col-span-3">{orders.nomorHp}</p>
          </div>

          <div className="grid grid-cols-5 gap-x-2 items-start">
            <div className="col-span-2 font-semibold flex items-start gap-2">
              <label className="w-[98%]">Lokasi Penjemputan</label>
              <span>:</span>
            </div>
            <p className="col-span-3">
              {
                lokasiPenjemputan.find(
                  (lokasi) => lokasi.value === orders.lokasiPenjemputan
                )?.label || "Tidak memesan penginapan"
              }
            </p>
          </div>

          <div className="grid grid-cols-5 gap-x-2 items-start">
            <div className="col-span-2 font-semibold flex items-start gap-2">
              <label className="w-[98%]">Masa Perjalanan</label>
              <span>:</span>
            </div>
            <p className="col-span-3">{orders.masaPerjalanan} Hari</p>
          </div>

          {orders.masaPerjalanan === 3 && (
            <div className="grid grid-cols-5 gap-x-2 items-start">
              <div className="col-span-2 font-semibold flex items-start gap-2">
                <label className="w-[98%]">Opsi Penginapan</label>
                <span>:</span>
              </div>
              <p className="col-span-3">
                {orders.penginapan?.namaPenginapan ||
                  "Tidak memesan penginapan"}
              </p>
            </div>
          )}

          <div className="grid grid-cols-5 gap-x-2 items-start">
            <div className="col-span-2 font-semibold flex items-start gap-2">
              <label className="w-[98%]">Tanggal Perjalanan</label>
              <span>:</span>
            </div>
            <p className="col-span-3">
              {orders.tanggalPerjalanan
                ? format(orders.tanggalPerjalanan, "d MMMM yyyy", {
                    locale: id,
                  })
                : "Tanggal tidak tersedia"}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-x-2 items-start">
            <div className="col-span-2 font-semibold flex items-start gap-2">
              <label className="w-[98%]">Jumlah Pembelian Tiket</label>
              <span>:</span>
            </div>
            <p className="col-span-3">
              Untuk {orders.jumlahPembelianTiket} Orang
            </p>
          </div>

          {
            <div className="grid grid-cols-5 gap-x-2 items-start">
              <div className="col-span-2 font-semibold flex items-start gap-2">
                <label className="w-[98%]">Destinasi</label>
                <span>:</span>
              </div>
              {Array.isArray(orders.destinasi) ? (
                <ul className="col-span-3 list-disc pl-5">
                  {orders.destinasi.map(
                    ({ destinations }: { destinations: Destination }) => (
                      <li key={destinations.destinationId}>
                        {destinations.destinationName}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="col-span-3">{orders.destinasi.destinationName}</p>
              )}
            </div>
          }

          {orders.experience && orders.experience.length > 0 ? (
            <div className="grid grid-cols-5 gap-x-2 items-start">
              <div className="col-span-2 font-semibold flex items-start gap-2">
                <label className="w-[98%]">Experience</label>
                <span>:</span>
              </div>
              <ul className="col-span-3 list-disc pl-5">
                {orders.experience.map(
                  ({ experiences }: { experiences: Experience }) => (
                    <li key={experiences.id}>{experiences.namaExperience}</li>
                  )
                )}
              </ul>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
