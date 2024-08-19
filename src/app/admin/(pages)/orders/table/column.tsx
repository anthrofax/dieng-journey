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
import { Order } from "@prisma/client";
import { AdminRegularOrderType } from "../type";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "destination.imageUrls[0]",
    id: "image",
    header: "Gambar Destinasi",
    cell: ({ row }: { row: any }) => {
      const image = row.original.destination.imageUrls[0];

      return (
        <div>
          <Image
            alt="Gambar Destinasi yang Diorder"
            src={image}
            width="35"
            height="35"
            className="rounded-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorFn: (row: any) => row.destination.destinationName,
    id: "destinationName",
    header: "Destinasi",
    cell: ({ row }: { row: any }) => {
      const destinationName = row.original.destination.destinationName;

      return <span>{destinationName}</span>;
    },
  },
  {
    accessorKey: "user",
    header: "Pelanggan",
    cell: ({ row }: { row: any }) => {
      const customerUsername = row.original.user.username;

      return <span>{customerUsername}</span>;
    },
  },
  {
    accessorKey: "qty",
    header: "Jumlah Pembelian Ticket",
    cell: ({ row }: { row: any }) => {
      const qty = row.original.qty;

      return <span>{qty}</span>;
    },
  },
  {
    accessorKey: "totalBiaya",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted === "asc")}
        >
          Total Biaya
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const totalBiaya = row.original.totalBiaya;

      return (
        <span className="block text-left">{Rupiah.format(totalBiaya)}</span>
      );
    },
  },
  {
    accessorKey: "experiences",
    header: "Experience Tambahan",
    cell: ({ row }: { row: any }) => {
      const experienceOrderItems = row.original.experiences;

      return <span>{experienceOrderItems.length} Tempat</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ActionsColumn,
  },
];

function ActionsColumn({ row }: { row: any }) {
  const regularOrder = row.original as AdminRegularOrderType; // Assuming the row contains regularOrder data

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
            <p className="col-span-3">{regularOrder.nama}</p>
          </div>

          <div className="grid grid-cols-5 gap-x-2 items-start">
            <div className="col-span-2 font-semibold flex items-start gap-2">
              <label className="w-[98%]">Nomor HP</label>
              <span>:</span>
            </div>
            <p className="col-span-3">{regularOrder.nomorHp}</p>
          </div>

          <div className="grid grid-cols-5 gap-x-2 items-start">
            <div className="col-span-2 font-semibold flex items-start gap-2">
              <label className="w-[98%]">Lokasi Penjemputan</label>
              <span>:</span>
            </div>
            <p className="col-span-3">{regularOrder.lokasiPenjemputan}</p>
          </div>

          <div className="grid grid-cols-5 gap-x-2 items-start">
            <div className="col-span-2 font-semibold flex items-start gap-2">
              <label className="w-[98%]">Masa Perjalanan</label>
              <span>:</span>
            </div>
            <p className="col-span-3">{regularOrder.masaPerjalanan} Hari</p>
          </div>

          {regularOrder.masaPerjalanan === 3 && (
            <div className="grid grid-cols-5 gap-x-2 items-start">
              <div className="col-span-2 font-semibold flex items-start gap-2">
                <label className="w-[98%]">Opsi Penginapan</label>
                <span>:</span>
              </div>
              <p className="col-span-3">
                {regularOrder.penginapan?.namaPenginapan ||
                  "Tidak Memesan Penginapan"}
              </p>
            </div>
          )}

          <div className="grid grid-cols-5 gap-x-2 items-start">
            <div className="col-span-2 font-semibold flex items-start gap-2">
              <label className="w-[98%]">Tanggal Perjalanan</label>
              <span>:</span>
            </div>
            <p className="col-span-3">
              {regularOrder.tanggalPerjalanan
                ? format(regularOrder.tanggalPerjalanan, "d MMMM yyyy", {
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
            <p className="col-span-3">Untuk {regularOrder.qty} Orang</p>
          </div>

          {regularOrder.experiences.length > 0 && (
            <div className="grid grid-cols-5 gap-x-2 items-start">
              <div className="col-span-2 font-semibold flex items-start gap-2">
                <label className="w-[98%]">Experience</label>
                <span>:</span>
              </div>
              <ul className="col-span-3 list-disc pl-5">
                {regularOrder.experiences.map(({ experiences }) => (
                  <li key={experiences.id}>{experiences.namaExperience}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
