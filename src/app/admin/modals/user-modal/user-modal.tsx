/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Message, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { schema } from "./schema";
import ModalLayout from "../../layout/modal-layout";
import { getUserById, updateUser } from "./service";
import { Label } from "flowbite-react";
import { DialogFooter } from "@/components/ui/dialog";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Image from "next/image";

const UserModal = ({
  userId,
  handleHideModal,
  setShowModal,
}: {
  userId: string;
  handleHideModal: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: user } = useQuery({
    queryFn: () => getUserById(userId),
    queryKey: ["admin", "users", userId],
  });

  const queryClient = useQueryClient();
  const { mutate: handleUpdateUser, isPending: isPendingMutation } =
    useMutation({
      mutationFn: ({ userId, data }: { userId: string; data: any }) =>
        updateUser({ userId, data }),
      onSuccess: () => {
        toast.success("Data pengguna berhasil diperbarui");
        queryClient.invalidateQueries({
          queryKey: ["admin", "users"],
        });
        setShowModal(false);
      },
    });

  const form = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    form.reset({
      username: user?.username,
      email: user?.email,
      displayName: user?.displayName,
      phone: user?.phone,
      isAdmin: user?.isAdmin,
    });
  }, [
    user?.username,
    user?.email,
    user?.displayName,
    user?.phone,
    user?.isAdmin,
  ]);

  useEffect(() => {
    if (Object.keys(form.formState.errors)?.length > 0) {
      console.log(form.formState.errors);
      Object.keys(form.formState.errors)?.map((key) => {
        toast.error(`${form.formState.errors[key]?.message as Message}`);
      });
    }
  }, [form.formState.errors]);

  const onSubmit = (data: any) => {
    handleUpdateUser({ userId, data });
    handleHideModal();
  };

  return (
    <>
      <ModalLayout
        document="User"
        description="Lakukan perubahan pada akun pengguna disini, klik save jika kamu telah selesai."
      >
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profileImage" className="text-right">
                Profil Pengguna
              </Label>

              <Image
                className="col-span-3 rounded-full"
                width={60}
                height={60}
                alt={`Gambar Profil ${user?.username}`}
                src={user?.profileImage}
              />
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>

                  <FormControl>
                    <Input
                      type="text"
                      id="username"
                      placeholder="John"
                      className="col-span-3"
                      disabled
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="displayName" className="text-right">
                    Display Name
                  </Label>

                  <FormControl>
                    <Input
                      type="text"
                      id="displayName"
                      placeholder="John Doe"
                      className="col-span-3"
                      disabled
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@gmail.com"
                    className="col-span-3"
                    disabled
                    {...field}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Nomor Telepon
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08130000..."
                    className="col-span-3"
                    disabled
                    {...field}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isAdmin" className="text-right">
                    Apakah Admin?
                  </Label>
                  <FormControl className="flex items-center space-x-2">
                    <Switch
                      id="isAdmin"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
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
    </>
  );
};

export default UserModal;
