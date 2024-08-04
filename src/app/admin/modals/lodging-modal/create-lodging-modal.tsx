"use client";

import React, { useEffect } from "react";
import ModalLayout from "../../layout/modal-layout";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Message, UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { MutateLodgingFormType } from "./type";
import { createNewLodging } from "../../(pages)/lodging/service";

const CreateLodgingModal = ({
  handleHideModal,
  formState,
}: {
  handleHideModal: () => void;
  formState: UseFormReturn<MutateLodgingFormType, any, undefined>;
}) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = formState;

  const { mutateAsync, isPending: isPendingMutation } = useMutation({
    mutationFn: (data: MutateLodgingFormType) => createNewLodging(data),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["admin", "lodging"],
      });
      toast.success("Penginapan anda telah berhasil ditambahkan");
      handleHideModal();
    },
  });

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      console.log(errors);
      Object.keys(errors)?.map((key) => {
        toast.error(
          `${
            (
              errors as {
                [key: string]: { message: string };
              }
            )[key]?.message as Message
          }`
        );
      });
    }
  }, [errors]);

  const onSubmit = async (data: any) => {
    await mutateAsync(data);
  };

  return (
    <ModalLayout
      document="Penginapan"
      isCreating
      description="Tambahkan data penginapan anda disini, klik simpan jika telah selesai."
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
                  Harga
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

export default CreateLodgingModal;
