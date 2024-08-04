import Image from "next/image";
import { format } from "date-fns";
import { IoEye } from "react-icons/io5";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Column } from "@tanstack/react-table";

import React from "react";
import { Rupiah } from "@/utils/format-currency";

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
    accessorKey: "totalPrice",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted === "asc")}
        >
          Total Harga
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const qty = row.original.qty;
      const destinationPrice = row.original.destination.price;
      const experienceTotalPrice = row.original.orderExperience.reduce(
        (
          acc: number,
          {
            experience,
          }: { experience: { experienceName: string; price: number } }
        ) => {
          return acc + experience.price;
        },
        0
      );

      return (
        <span className="block text-left">
          {Rupiah.format(qty * (destinationPrice + experienceTotalPrice))}
        </span>
      );
    },
  },
  {
    accessorKey: "orderExperience",
    header: "Experience Tambahan",
    cell: ({ row }: { row: any }) => {
      const experienceOrderItems = row.original.orderExperience;

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
  const { chargeId, id: reservationId } = row.original;

  return (
    <>
      <button
        onClick={() => {}}
        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
      >
        <IoEye color="yellow" />
      </button>
    </>
  );
}
