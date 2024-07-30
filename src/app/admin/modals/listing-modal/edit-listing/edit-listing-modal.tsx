"use client";
import React, { useEffect, useState } from "react";
import ModalLayout from "../../../layout/modal-layout";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getListingById } from "@/app/(pages)/details/[id]/service";
import { updateListing } from "../../../(pages)/listings/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { toast } from "react-hot-toast";
import { Message, useForm } from "react-hook-form";
import { postImages } from "@/lib/cloudinary-helpers";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const EditListingModal = ({
  handleHideModal,
  listingId,
}: {
  handleHideModal: () => void;
  listingId: string;
}) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  const [images, setImages] = useState<FileList[]>([]);
  const router = useRouter();

  const { data: listing } = useQuery({
    queryFn: () => getListingById(listingId),
    queryKey: ["admin", "listings", { listingId }],
  });

  const { mutateAsync, isPending: isPendingMutation } = useMutation({
    mutationFn: ({ listingId, body }: { listingId: string; body: any }) =>
      updateListing({ listingId, body }),
  });

  console.log(listing);

  const {
    register,
    handleSubmit,
    reset,
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

  useEffect(() => {
    reset({ ...listing });
  }, [
    listing?.name,
    listing?.desc,
    listing?.beds,
    listing?.type,
    listing?.hasFreeWifi,
    listing?.location,
    listing?.pricePerNight,
  ]);

  const handleImage = (e: any) => {
    setImages((prev) => {
      return [...prev, e.target.files[0]];
    });
  };

  const uploadImage = async (image: any, idx: number) => {
    if (!image) return;

    const toastId = toast.loading(`Image ${idx + 1} is being uploaded`);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET as string);

    try {
      const imageUrl = await postImages(CLOUD_NAME as string, formData);
      toast.success(`Successfully uploaded image ${idx + 1}`);
      toast.dismiss(toastId);

      return imageUrl;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: any) => {
    const imageUrls = await Promise.all(
      images.map((image, idx) => {
        const imageUrl = uploadImage(image, idx);
        return imageUrl;
      })
    );

    const body = data;
    if (imageUrls?.length > 0) body.imageUrls = imageUrls;
    else body.imageUrls = listing?.imageUrls;

    const updatedListing = await mutateAsync({ listingId, body });
    toast.success("Redirecting to listing...");
    router.push(`/details/${updatedListing.id}`);
  };

  return (
    <ModalLayout
      document="Hotel"
      handleHideModal={handleHideModal}
      description="Perbarui data hotelmu disini, klik simpan jika telah selesai."
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
          <Input
            className="h-4 w-4"
            type="checkbox"
            register={register("hasFreeWifi")}
            id="freeWifi"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="freeWifi" className="text-right">
            Unggah Gambar Hotel
          </Label>
          <Input
            type="file"
            onChange={handleImage}
            style={{ display: "none" }}
            id="images"
          />
        </div>

        <DialogFooter>
          <Button disabled={isPendingMutation} label="Simpan" />
        </DialogFooter>
      </form>
    </ModalLayout>
  );
};

export default EditListingModal;
