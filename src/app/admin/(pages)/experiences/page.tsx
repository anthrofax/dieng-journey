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
import { createSchema } from "../../modals/experience-modal/create-schema";
import { MutateExperienceFormType } from "../../modals/experience-modal/type";
import AdminSkeleton from "../../components/admin-skeleton";

function Experiences() {
  const { isLoadingQuery, allExperiences } = useExperienceHook();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const createFormState = useForm<MutateExperienceFormType>({
    defaultValues: {
      namaExperience: "",
      deskripsi: "",
      biaya: 0,
    },
    resolver: zodResolver(createSchema),
  });

  console.log(allExperiences)

  return (
    <div className="py-10 col-span-12 lg:col-span-10 grid grid-rows-12">
      <div className="row-span-12 px-5">
        <div className="flex justify-between py-3 items-center">
          <h2 className="text-3xl text-slate-800 font-semibold text-center lg:text-left">
            Pengelolaan Data Pengalaman Perjalanan
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
                <IoIosCreate size={20} /> Tambah Data Experience Tambahan
              </Button>
            </DialogTrigger>
            <CreateExperienceModal
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
           <AdminSkeleton/>
          ) : (
            <DataTable
              columns={columns}
              data={allExperiences}
              filterBy="namaExperience"
              filterByLabel="nama experience"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Experiences;
