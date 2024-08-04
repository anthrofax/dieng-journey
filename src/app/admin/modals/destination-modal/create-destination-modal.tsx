"use client";

import React, { MutableRefObject, RefObject, useEffect } from "react";
import { GrClearOption } from "react-icons/gr";
import ModalLayout from "../../layout/modal-layout";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { FiUpload } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FieldValues, Message, UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { createNewDestination } from "@/app/admin/(pages)/destinations/service";
import { clearImageInput, uploadImage } from "@/utils/helper-functions";
import { MAXIMUM_IMAGE_UPLOAD } from "@/data/app-config";

const CreateDestinationModal = ({
  handleHideModal,
  formState,
  imageInput,
  images,
  setImages,
}: {
  handleHideModal: () => void;
  formState: UseFormReturn<FieldValues, any, undefined>;
  imageInput: RefObject<HTMLInputElement>;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = formState;

  const { mutateAsync, isPending: isPendingMutation } = useMutation({
    mutationFn: ({ data, imageUrls }: { data: any; imageUrls: string[] }) =>
      createNewDestination({
        data,
        imageUrls,
      }),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["admin", "destinations"],
      });
      toast.success("Destinasi anda telah berhasil ditambahkan");
      handleHideModal();
    },
  });

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      Object.keys(errors)?.map((key) => {
        toast.error(errors[key]?.message as Message);
      });
    }
  }, [errors]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = Array.from(e.target.files || []);
    if (images.length + newImages.length > MAXIMUM_IMAGE_UPLOAD) {
      return toast.error(
        `Hanya bisa mengunggah ${MAXIMUM_IMAGE_UPLOAD} gambar`
      );
    }

    setImages((imageList) => [...imageList, ...newImages]);
  };

  const onSubmit = async (data: any) => {
    if (images.length < 1) return toast.error("Anda perlu mengunggah gambar");

    const imageUrls = await Promise.all(
      images.map(async function (image, i) {
        const imageUrl = await uploadImage(image, i);
        return imageUrl;
      })
    );

    await mutateAsync({ data, imageUrls });
  };

  return (
    <ModalLayout
      document="Destinasi"
      isCreating
      description="Tambahkan data destinasimu disini, klik simpan jika telah selesai."
    >
      <form
        className="grid gap-4 py-4 overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="destinationName" className="text-right">
            Nama Destinasi
          </Label>

          <Input
            className="w-[300px] px-2 py-3 rounded-xl"
            type="text"
            placeholder="Pemandangan Air Hangat Segar Asri"
            {...register("destinationName")}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Deskripsi
          </Label>

          <Textarea
            className="w-[300px]"
            placeholder="Tambahkan deskripsi destinasimu disini."
            {...register("description")}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Harga
          </Label>

          <Input
            className="w-[300px] px-2 py-3 rounded-xl"
            type="number"
            placeholder="500000"
            {...register("price", { valueAsNumber: true })}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="city" className="text-right">
            Lokasi
          </Label>
          <Input
            className="w-[300px] px-2 py-3 rounded-xl"
            type="text"
            placeholder="Candi Arjuna"
            {...register("city")}
          />
        </div>

        <div className="grid grid-cols-12 items-start gap-2 place-items-start">
          <Label htmlFor="images" className="text-right col-span-3 ">
            Unggah Gambar Destinasi
          </Label>
          <div className="flex flex-col gap-3 col-span-4 pl-1">
            <Button
              type="button"
              disabled={images.length >= MAXIMUM_IMAGE_UPLOAD}
              onClick={() => {
                if (imageInput.current) imageInput.current.click();
              }}
            >
              <FiUpload className="mr-4 h-4 w-4" /> Unggah Gambar
            </Button>
            <ul>
              {images.slice(0, 6).length > 0 &&
                images.map((image) => (
                  <li className="text-xs text-slate-700" key={image.name}>
                    {image.name}
                  </li>
                ))}
              {images.length > 5 && (
                <p className="underline">
                  {images.length - 5} gambar lainnya teunggah.
                </p>
              )}
            </ul>
          </div>

          <Button
            variant="outline"
            size="icon"
            disabled={images.length < 1}
            onClick={() => clearImageInput(imageInput, setImages)}
          >
            <GrClearOption className="h-4 w-4" />
          </Button>

          <input
            type="file"
            name="images"
            onChange={handleImage}
            id="images"
            className="hidden"
            accept="image/png, image/jpg, image/jpeg"
            multiple={true}
            ref={imageInput}
            disabled={images.length >= MAXIMUM_IMAGE_UPLOAD}
          />
        </div>

        <DialogFooter>
          <Button disabled={isPendingMutation} label="Simpan" />
        </DialogFooter>
      </form>
    </ModalLayout>
  );
};

export default CreateDestinationModal;
