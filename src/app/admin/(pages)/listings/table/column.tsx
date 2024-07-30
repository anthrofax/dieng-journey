"use client";

import Image from "next/image";
import { FaPen, FaTrash } from "react-icons/fa";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { useState } from "react";
import { useListingHook } from "@/app/admin/hooks/listing-hook";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditListingModal from "@/app/admin/modals/listing-modal/edit-listing/edit-listing-modal";
import { Rupiah } from "@/utils/format-currency";
import CreateListingModal from "@/app/admin/modals/listing-modal/create-listing/create-listing-modal";
export const columns = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }: { row: any }) => {
      const image = row.original?.imageUrls[0];

      return (
        <div>
          <Image
            className="rounded-full object-cover"
            width="35"
            height="35"
            src={image}
            alt="Listing's image"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }: { row: any }) => {
      const location = row.getValue("location");

      return <span className="capitalize">{location}</span>;
    },
  },
  {
    accessorKey: "pricePerNight",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price per night
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const pricePerNight = row.getValue("pricePerNight");

      return <span>{Rupiah.format(pricePerNight.toFixed(0))}</span>;
    },
  },
  {
    accessorKey: "beds",
    header: "Beds",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ActionsColumn,
  },
];

function ActionsColumn({ row }: { row: any }) {
  const listingId = row.original.id;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { handleDeleteListing, isPending } = useListingHook();
  const handleHideEditModal = () => setShowEditModal(false);
  const handleHideCreateModal = () => setShowCreateModal(false);

  return (
    <>
      <Button
        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
        disabled={isPending}
        onClick={() => handleDeleteListing(listingId)}
        variant="ghost"
      >
        <FaTrash color={`${isPending ? "#bdb2b2" : "#f00"}`} />
      </Button>

      <Dialog>
        <DialogTrigger asChild className="px-2 py-1">
          <Button variant="ghost">
            {" "}
            <FaPen color="#ffc400" />
          </Button>
        </DialogTrigger>
        <EditListingModal
          handleHideModal={handleHideEditModal}
          listingId={listingId}
        />
      </Dialog>

      <Dialog>
        <DialogTrigger asChild className="px-2 py-1">
          <Button variant="ghost">
            {" "}
            <IoIosCreate color="#00ab30" />
          </Button>
        </DialogTrigger>
        <CreateListingModal handleHideModal={handleHideEditModal} />
      </Dialog>
    </>
  );
}
