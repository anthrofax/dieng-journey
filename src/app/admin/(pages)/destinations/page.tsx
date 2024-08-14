"use client";

import { columns } from "./table/column";
import { DataTable } from "../../components/data-table";
import Skeleton from "react-loading-skeleton";
import Button from "@/ui/Button";
import { IoIosCreate } from "react-icons/io";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSchema } from "../../modals/destination-modal/create-schema";
import { handleHideModal } from "@/utils/helper-functions";
import { useDestinationHook } from "../../hooks/destination-hook";
import CreateDestinationModal from "../../modals/destination-modal/create-destination-modal";

function Destinations() {
  const { isLoadingQuery, allDestinations } = useDestinationHook();
  const [images, setImages] = useState<File[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const createFormState = useForm({
    resolver: zodResolver(createSchema),
  });
  const imageInput = useRef<HTMLInputElement>(null);

  return (
    <div className="py-10 col-span-12 lg:col-span-10 grid grid-rows-12">
      <div className="row-span-12 px-5">
        <div className="flex justify-between py-3 items-center">
          <h2 className="text-3xl text-slate-800 font-semibold text-center lg:text-left">
            Pengelolaan Data Destinasi
          </h2>
          <Dialog
            onOpenChange={() =>
              handleHideModal({
                formState: createFormState,
                showModalStateSetter: setShowCreateModal,
                imageInputRef: imageInput,
                imageListSetState: setImages,
              })
            }
            open={showCreateModal}
          >
            <DialogTrigger asChild className="px-2 py-1">
              <Button className="text-sm flex gap-3 px-3 items-center bg-primary hover:text-primary hover:bg-slate-300">
                <IoIosCreate size={20} /> Tambah Data Destinasi
              </Button>
            </DialogTrigger>
            <CreateDestinationModal
              images={images}
              setImages={setImages}
              imageInput={imageInput}
              handleHideModal={() =>
                handleHideModal({
                  formState: createFormState,
                  showModalStateSetter: setShowCreateModal,
                  imageInputRef: imageInput,
                  imageListSetState: setImages,
                })
              }
              formState={createFormState}
            />
          </Dialog>
        </div>
        <div className="mt-2 h-2/3 w-[80vw] max-lg:mx-auto">
          {isLoadingQuery ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <DataTable columns={columns} data={allDestinations} filterByLabel="nama destinasi" filterBy="destinationName" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Destinations;
