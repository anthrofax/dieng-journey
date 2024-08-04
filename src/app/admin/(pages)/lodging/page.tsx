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
import { handleHideModal } from "@/utils/helper-functions";
import { useExperienceHook } from "../../hooks/experience-hook";
import CreateExperienceModal from "../../modals/experience-modal/create-experience-modal";
import { useLodgingHook } from "../../hooks/lodging-hook";
import { createSchema } from "../../modals/lodging-modal/create-schema";
import { MutateLodgingFormType } from "../../modals/lodging-modal/type";
import CreateLodgingModal from "../../modals/lodging-modal/create-lodging-modal";

function Lodging() {
  const { isLoadingQuery, allLodgings } = useLodgingHook();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const createFormState = useForm<MutateLodgingFormType>({
    defaultValues: {
      namaPenginapan: "",
      deskripsi: "",
      biaya: 0,
    },
    resolver: zodResolver(createSchema),
  });

  console.log(allLodgings)

  return (
    <div className="py-10 col-span-12 lg:col-span-10 grid grid-rows-12">
      <div className="row-span-12 px-5">
        <div className="flex justify-between py-3 items-center">
          <h2 className="text-3xl text-slate-800 font-semibold text-center lg:text-left">
            Pengelolaan Data Penginapan
          </h2>
          <Dialog
            onOpenChange={() =>
              handleHideModal({
                formState: createFormState,
                showModalStateSetter: setShowCreateModal,
              })
            }
            open={showCreateModal}
          >
            <DialogTrigger asChild className="px-2 py-1">
              <Button className="text-sm flex gap-3 px-3 items-center bg-primary hover:text-primary hover:bg-slate-300">
                <IoIosCreate size={20} /> Tambah Data Penginapan
              </Button>
            </DialogTrigger>
            <CreateLodgingModal
              handleHideModal={() =>
                handleHideModal({
                  formState: createFormState,
                  showModalStateSetter: setShowCreateModal,
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
            <DataTable
              columns={columns}
              data={allLodgings}
              filterBy="namaPenginapan"
              filterByLabel="nama penginapan"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Lodging;
