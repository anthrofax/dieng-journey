"use client";

import { useEffect } from "react";
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
  getSelectedLodging,
  updateLodging,
} from "../../(pages)/lodging/service";
import { MutateLodgingFormType } from "./type";
import { Penginapan } from "@prisma/client";
import Input from "@/ui/Input";

const EditLodgingModal = ({
  handleHideModal,
  formState,
  lodgingId,
}: {
  handleHideModal: () => void;
  formState: UseFormReturn<MutateLodgingFormType, any, undefined>;
  lodgingId: string;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = formState;

  const { data: selectedLogding, isLoading } = useQuery<Penginapan>({
    queryKey: ["admin", "lodging", lodgingId],
    queryFn: () => getSelectedLodging({ id: lodgingId }),
  });

  const { mutateAsync, isPending: isPendingMutation } = useMutation({
    mutationFn: ({
      lodgingId,
      data,
    }: {
      lodgingId: string;
      data: MutateLodgingFormType;
    }) =>
      updateLodging({
        lodgingId,
        data,
      }),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["admin", "lodging"],
      });
      toast.success("Penginapan anda telah berhasil diperbarui");
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
    console.log(selectedLogding);
    reset({
      namaPenginapan: selectedLogding?.namaPenginapan,
      deskripsi: selectedLogding?.deskripsi,
      biaya: selectedLogding?.biaya,
    });
  }, [
    selectedLogding?.namaPenginapan,
    selectedLogding?.deskripsi,
    selectedLogding?.biaya,
    reset,
    selectedLogding,
  ]);

  const onSubmit = async (data: any) => {
    await mutateAsync({
      lodgingId,
      data,
    });
  };

  return (
    <ModalLayout
      document="Penginapan"
      description="Perbarui data penginapan mu disini, klik simpan jika telah selesai."
    >
      <Form {...formState}>
        <form
          className="grid gap-4 py-4 overflow-y-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="namaPenginapan"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="namaPenginapan" className="text-right">
                  Nama Penginapan
                </Label>

                <FormControl>
                  <Input
                    className="w-[300px] px-2 py-3 rounded-xl"
                    type="text"
                    placeholder="Hotel Tirta Arum"
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
                    placeholder="Tambahkan deskripsi penginapan disini."
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

export default EditLodgingModal;
