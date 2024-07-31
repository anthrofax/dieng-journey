"use client";

import Image from "next/image";
import { FaPen, FaTrash } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { useRef, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmationBox from "@/components/confirmation-box/confirmation-box";
import { confirmAlert } from "react-confirm-alert";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { format } from "timeago.js";
import { handleHideModal } from "@/utils/helper-functions";
import { useExperienceHook } from "@/app/admin/hooks/experience-hook";
import { Rupiah } from "@/utils/format-currency";
import EditExperienceModal from "@/app/admin/modals/experience-modal/edit-experience-modal";
import { editSchema } from "@/app/admin/modals/experience-modal/edit-schema";

export const columns = [
  {
    accessorKey: "image",
    header: "Gambar",
    cell: ({ row }: { row: any }) => {
      const image = row.original?.imageUrls[0];

      return (
        <div>
          <Image
            className="rounded-full object-cover"
            width="35"
            height="35"
            src={image}
            alt="Experience's image"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "experienceName",
    header: "Nama Experience",
    cell: ({ row }: { row: any }) => {
      const experience = row.getValue("experienceName");

      return <span className="capitalize">{experience}</span>;
    },
  },
  {
    accessorKey: "description",
    header: <div className="text-center">Deskripsi</div>,
    cell: ({ row }: { row: any }) => {
      const description = row.getValue("description");

      return (
        <p className="w-[70%] text-justify mx-auto">
          {`${description.slice(0, 200)}${description.length >= 200 && "..."}`}
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }: { column: any }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const price = row.getValue("price");
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
  const { id, experienceName } = row.original;
  const { handleDeleteExperience, isPendingDelete } = useExperienceHook();
  const [images, setImages] = useState<File[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const editFormState = useForm({
    resolver: zodResolver(editSchema),
  });
  const imageInput = useRef<HTMLInputElement>(document.createElement("input"));

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
                  pesan={`Apakah anda yakin ingin melakukan menghapus "${experienceName}"?`}
                  onClose={onClose}
                  onClickIya={() => handleDeleteExperience(id)}
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
            imageInputRef: imageInput,
            imageListSetState: setImages,
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

        <EditExperienceModal
          images={images}
          setImages={setImages}
          imageInput={imageInput}
          handleHideModal={() =>
            handleHideModal({
              formState: editFormState,
              showModalStateSetter: setShowEditModal,
              imageInputRef: imageInput,
              imageListSetState: setImages,
            })
          }
          formState={editFormState}
          experienceId={id}
        />
      </Dialog>
    </>
  );
}
