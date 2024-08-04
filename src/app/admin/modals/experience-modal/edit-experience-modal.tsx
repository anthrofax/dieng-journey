"use client";

import ModalLayout from "../../layout/modal-layout";
import Button from "@/ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Message, UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  getSelectedExperience,
  updateExperience,
} from "../../(pages)/experiences/service";
import { useDestinationHook } from "../../hooks/destination-hook";
import { Input } from "@/components/ui/input";
import { MutateExperienceFormType } from "./type";
import { Experience } from "@prisma/client";
import { useEffect } from "react";

const EditExperienceModal = ({
  handleHideModal,
  formState,
  experienceId,
}: {
  handleHideModal: () => void;
  formState: UseFormReturn<MutateExperienceFormType, any, undefined>;
  experienceId: string;
}) => {
  const queryClient = useQueryClient();
  const { allDestinations } = useDestinationHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = formState;

  const { data: selectedExperience, isLoading } = useQuery<Experience>({
    queryKey: ["admin", "experiences", experienceId],
    queryFn: () => getSelectedExperience({ id: experienceId }),
  });

  const { mutateAsync, isPending: isPendingMutation } = useMutation({
    mutationFn: ({
      experienceId,
      data,
    }: {
      experienceId: string;
      data: MutateExperienceFormType;
    }) =>
      updateExperience({
        experienceId,
        data,
      }),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["admin", "experiences"],
      });
      toast.success("Experience anda telah berhasil diperbarui");
      handleHideModal();
    },
  });

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      Object.keys(errors)?.map((key) => {
        toast.error(
          (
            errors as {
              [key: string]: { message: string };
            }
          )[key]?.message as Message
        );
      });
    }
  }, [errors]);

  useEffect(() => {
    console.log(selectedExperience);
    reset({
      namaExperience: selectedExperience?.namaExperience,
      deskripsi: selectedExperience?.deskripsi,
      biaya: selectedExperience?.biaya,
    });
  }, [
    selectedExperience?.namaExperience,
    selectedExperience?.deskripsi,
    selectedExperience?.biaya,
    reset,
    selectedExperience,
  ]);

  const onSubmit = async (data: any) => {
    await mutateAsync({
      experienceId,
      data,
    });
  };

  return (
    <ModalLayout
      document="Experience"
      description="Perbarui data experiencemu disini, klik simpan jika telah selesai."
    >
      <Form {...formState}>
        <form
          className="grid gap-4 py-4 overflow-y-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="namaExperience"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="namaExperience" className="text-right">
                  Nama Experience
                </Label>

                <FormControl>
                  <Input
                    className="w-[300px] px-2 py-3 rounded-xl"
                    type="text"
                    placeholder="Pabrik Carica"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="deskripsi"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deskripsi" className="text-right">
                  Deskripsi
                </Label>

                <FormControl>
                  <Textarea
                    className="w-[300px]"
                    placeholder="Tambahkan deskripsi experience disini."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="biaya"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="biaya" className="text-right">
                  Biaya
                </Label>

                <FormControl>
                  <Input
                    className="w-[300px] px-2 py-3 rounded-xl"
                    type="number"
                    placeholder="500000"
                    min={0}
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button disabled={isPendingMutation} label="Simpan" />
          </DialogFooter>
        </form>
      </Form>
    </ModalLayout>
  );
};

export default EditExperienceModal;
