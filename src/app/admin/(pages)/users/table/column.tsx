"use client";
import Image from "next/image";
import { format } from "timeago.js";
import { FaPen, FaTrash } from "react-icons/fa";
import { useUserHook } from "../../../hooks/user-hook";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserModal from "@/app/admin/modals/user-modal/user-modal";
import { Skeleton } from "@/components/ui/skeleton";

export const columns = [
  {
    accessorKey: "profileImage",
    header: "Foto Profil",
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("profileImage");

      return (
        <Image
          className="h-10 w-10 rounded-full object-cover"
          height="40"
          width="50"
          src={value}
          alt="Person's image"
          onLoad={() => <Skeleton className="w-[50px] h-[40px] rounded-full"/>}
        />
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
  },
  {
    accessorKey: "orders",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jumlah Transaksi
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const orders = row.getValue("orders")?.length || 0;
      const packageOrders = row.original.packageOrders?.length || 0;

      console.log(orders);
      console.log(packageOrders);

      return <div>{orders + packageOrders} transaksi</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="Flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dibuat pada
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("createdAt");
      return <div>{format(value)}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: CreatedAtColumn,
  },
];

function CreatedAtColumn({ row }: { row: any }) {
  const { id: userId } = row.original;
  const [showModal, setShowModal] = useState(false);

  const handleHideModal = () => setShowModal(false);

  // const { handleDeleteUser, isPending } = useUserHook();

  return (
    <>
      <Dialog onOpenChange={setShowModal} open={showModal}>
        <DialogTrigger asChild className="px-2 py-1">
          <Button variant="ghost">
            {" "}
            <FaPen color="#ffc400" />
          </Button>
        </DialogTrigger>
        <UserModal
          handleHideModal={handleHideModal}
          userId={userId}
          setShowModal={setShowModal}
        />
      </Dialog>
    </>
  );
}
