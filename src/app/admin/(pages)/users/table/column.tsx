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

export const columns = [
  {
    accessorKey: "profileImage",
    header: "Profile Photo",
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("profileImage");

      return (
        <Image
          className="h-10 w-10 rounded-full object-cover"
          height="40"
          width="50"
          src={value}
          alt="Person's image"
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
    accessorKey: "reservations",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reservations
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("reservations")?.length || 0;

      return <div>{value} reservations</div>;
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
          Created At
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
    header: "Actions",
    cell: CreatedAtColumn,
  },
];

function CreatedAtColumn({ row }: { row: any }) {
  const { id: userId } = row.original;
  const [showModal, setShowModal] = useState(false);

  const handleHideModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const { handleDeleteUser, isPending } = useUserHook();

  return (
    <>
      <button
        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
        disabled={isPending}
        onClick={() => handleDeleteUser(userId)}
      >
        <FaTrash color={`${isPending ? "#bdb2b2" : "#f00"}`} />
      </button>
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
