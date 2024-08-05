"use client";

import { FaPen, FaTrash } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmationBox from "@/components/confirmation-box/confirmation-box";
import { confirmAlert } from "react-confirm-alert";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { format } from "timeago.js";
import { handleHideModal } from "@/utils/helper-functions";
import { Rupiah } from "@/utils/format-currency";
import { editSchema } from "@/app/admin/modals/lodging-modal/edit-schema";
import { MutateLodgingFormType } from "@/app/admin/modals/lodging-modal/type";
import EditLodgingModal from "@/app/admin/modals/lodging-modal/edit-lodging-modal";
import { useLodgingHook } from "@/app/admin/hooks/lodging-hook";

export const columns = [
  {
    accessorKey: "namaPenginapan",
    header: "Penginapan",
  },
  {
    accessorKey: "deskripsi",
    header: <div className="text-center">Deskripsi</div>,
    cell: ({ row }: { row: any }) => {
      const description = row.getValue("deskripsi");

      return (
        <p className="w-[70%] text-justify mx-auto">
          {description !== ""
            ? `${description.slice(0, 200)}${
                description.length >= 200 ? "..." : ""
              }`
            : ""}
        </p>
      );
    },
  },
  {
    accessorKey: "biaya",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Biaya
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const price = row.getValue("biaya");
      return <div>{Rupiah.format(price)}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex items-center gap-1"
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
      console.log(value);
      return <div>{format(new Date(value))}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("updatedAt");
      return <div>{format(new Date(value))}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ActionsColumn,
  },
];

function ActionsColumn({ row }: { row: any }) {
  const { id, namaPenginapan } = row.original;
  const { handleDeleteLodging, isPendingDelete } = useLodgingHook();
  const [showEditModal, setShowEditModal] = useState(false);
  const editFormState = useForm<MutateLodgingFormType>({
    defaultValues: {
      biaya: 0,
      deskripsi: "",
      namaPenginapan: "",
    },
    resolver: zodResolver(editSchema),
  });

  return (
    <>
      <Button
        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
        disabled={isPendingDelete}
        onClick={() => {
          confirmAlert({
            customUI: ({ onClose }: { onClose: () => void }) => {
              return (
                <ConfirmationBox
                  icon={<MdAutoDelete />}
                  judul="Konfirmasi Penghapusan Data"
                  pesan={`Apakah anda yakin ingin melakukan menghapus "${namaPenginapan}"?`}
                  onClose={onClose}
                  onClickIya={() => handleDeleteLodging(id)}
                  labelIya="Yakin"
                  labelTidak="Ohh, sebentar"
                />
              );
            },
          });
        }}
        variant="ghost"
      >
        <FaTrash color={`${isPendingDelete ? "#bdb2b2" : "#f00"}`} />
      </Button>

      <Dialog
        onOpenChange={() =>
          handleHideModal({
            formState: editFormState,
            showModalStateSetter: setShowEditModal,
          })
        }
        open={showEditModal}
      >
        <DialogTrigger asChild className="px-2 py-1">
          <Button variant="ghost">
            {" "}
            <FaPen color="#ffc400" />
          </Button>
        </DialogTrigger>

        <EditLodgingModal
          handleHideModal={() =>
            handleHideModal({
              formState: editFormState,
              showModalStateSetter: setShowEditModal,
            })
          }
          formState={editFormState}
          lodgingId={id}
        />
      </Dialog>
    </>
  );
}
