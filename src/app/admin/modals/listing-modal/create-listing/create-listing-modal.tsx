"use client";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import ModalLayout from "../../../layout/modal-layout";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import { Button as ShadButton } from "@/components/ui/button";
import { FiUpload } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { createNewListing } from "../../../(pages)/listings/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { toast } from "react-hot-toast";
import { Message, useForm } from "react-hook-form";
import { postImages } from "@/lib/cloudinary-helpers";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from "@/utils/helper-functions";

const CreateListingModal = ({
  handleHideModal,
}: {
  handleHideModal: () => void;
}) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  const [images, setImages] = useState<FileList[]>([]);
  const router = useRouter();
  const imageInput = useRef<HTMLInputElement>();

  const { mutateAsync, isPending: isPendingMutation } = useMutation({
    mutationFn: ({ data, imageUrls }: { data: any; imageUrls: string[] }) =>
      createNewListing({
        data,
        imageUrls,
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      Object.keys(errors)?.map((key) => {
        toast.error(errors[key]?.message as Message);
      });
    }
  }, [errors]);

  const handleImage = (e: any) => {
    setImages((prev) => {
      return [...prev, e.target.files[0]];
    });
  };

  const onSubmit = async (data: any) => {
    const imageUrls = await Promise.all(
      images.map((image, idx) => {
        const imageUrl = uploadImage(image, idx);
        return imageUrl;
      })
    );

    const updatedListing = await mutateAsync({ data, imageUrls });
    toast.success("Redirecting to listing...");
    router.push(`/details/${updatedListing.id}`);
  };

  return (
    <ModalLayout
      document="Hotel"
      isCreating
      description="Tambahkan data hotelmu disini, klik simpan jika telah selesai."
    >
      <form
        className="grid gap-4 py-4 overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nama Hotel
          </Label>

          <Input
            className="w-[300px] px-2 py-3 rounded-xl"
            type="text"
            placeholder="Grand Hotel"
            register={register("name")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="desc" className="text-right">
            Deskripsi
          </Label>

          <Textarea
            className="w-[300px]"
            placeholder="Pelayanannya cukup baik."
            {...register("desc")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="location" className="text-right">
            Lokasi
          </Label>
          <Select
            register={register("location")}
            data={optionLocations}
            width="300px"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Kategori
          </Label>
          <Select
            register={register("type")}
            data={optionTypes}
            width="300px"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="pricePerNight" className="text-right">
            Harga per malam
          </Label>
          <Input
            className="w-[300px] px-2 py-3 rounded-xl"
            type="number"
            placeholder="500000"
            register={register("pricePerNight", { valueAsNumber: true })}
            step={0.01}
          />{" "}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="beds" className="text-right">
            Jumlah Kasur
          </Label>
          <Input
            className="w-[300px] px-2 py-3 rounded-xl"
            type="number"
            register={register("beds", { valueAsNumber: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="freeWifi" className="text-right">
            Free Wifi
          </Label>
          <Checkbox
            className="h-4 w-4"
            {...register("hasFreeWifi")}
            id="freeWifi"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="images" className="text-right">
            Unggah Gambar Hotel
          </Label>
          <Button
            type="button"
            onClick={() => {
              if (imageInput.current) imageInput.current.click();
            }}
            className="w-fit px-3"
          >
            <FiUpload className="mr-2 h-4 w-4" /> Unggah Gambar
          </Button>

          <input
            type="file"
            name="images"
            onChange={handleImage}
            id="images"
            className="hidden"
            accept="image/png, image/jpg, image/jpeg"
            multiple={true}
            ref={(el) => {
              if (el) imageInput.current = el;
            }}
          />
        </div>

        <DialogFooter>
          <Button disabled={isPendingMutation} label="Simpan" />
        </DialogFooter>
      </form>
    </ModalLayout>
  );
};

export default CreateListingModal;
