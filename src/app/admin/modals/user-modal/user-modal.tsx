"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { schema } from "./schema";
import ModalLayout from "../../layout/modal-layout";
import { getUserById, updateUser } from "./service";
import { Label } from "flowbite-react";
import { DialogFooter } from "@/components/ui/dialog";
import Button from "@/ui/Button";
import Input from "@/ui/Input";

const UserModal = ({
  userId,
  handleHideModal,
  setShowModal,
}: {
  userId: string;
  handleHideModal: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: user, isPending } = useQuery({
    queryFn: () => getUserById(userId),
    queryKey: ["admin", "users", userId],
  });

  const queryClient = useQueryClient();
  const { mutate: handleUpdateUser, isPending: isPendingMutation } =
    useMutation({
      mutationFn: ({ userId, data }: { userId: string; data: any }) =>
        updateUser({ userId, data }),
      onSuccess: () => {
        toast.success("Successfully updated the user");
        queryClient.invalidateQueries({
          queryKey: ["admin", "users"],
        });
        setShowModal(false);
      },
    });

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset({
      username: user?.username,
      email: user?.email,
    });
  }, [user?.username, user?.email, reset]);

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
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              placeholder="John"
              className="col-span-3"
              register={register("username")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@gmail.com"
              className="col-span-3"
              register={register("email")}
            />
          </div>
          <DialogFooter>
            <Button disabled={isPendingMutation} label="Simpan" />
          </DialogFooter>
        </form>
      </ModalLayout>
    </>
  );
};

export default UserModal;
