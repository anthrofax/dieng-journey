"use client";

import Input from "@/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, Message, useForm } from "react-hook-form";
import { schema } from "./schema";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import toast from "react-hot-toast";
import { createNewListing, postImages } from "./api";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function Create() {
  const router = useRouter();
  const [images, setImages] = useState<FileList[]>([]);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, imageUrls }: any) => createNewListing(data, imageUrls),
    mutationKey: ["listings"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      desc: "",
      beds: 5,
      hasFreeWifi: false,
      type: "luxury",
      location: "dubai",
      pricePerNight: 123,
    },
  });

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      Object.keys(errors)?.map((key) => {
        toast.error((errors as Record<string, any>)[key]?.message);
      });
    }
  }, [errors]);

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
      toast.error(`Image ${idx + 1} is failed to be uploaded`)
    }
  };

  const onSubmit = async (data: any) => {
    if (!images?.length) return toast.error("You must publish an image!");

    const imageUrls = await Promise.all(
      images.map((image, idx) => {
        const imageUrl = uploadImage(image, idx);
        return imageUrl;
      })
    );

    const newListing = await mutateAsync({data, imageUrls });
    toast.success("Redirecting to listing...");
    router.push(`/details/${newListing.id}`);
  };

  return (
    <div className="min-h-[900px] w-full flex justify-center items-center">
      <div className="h-2/5 w-1/5 rounded-xl border border-slate-300">
        <div className="p-3 w-full border-b border-slate-300">
          <h3 className="text-center font-semibold text-2xl ">
            Create a listing
          </h3>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-4 py-6 flex flex-col items-center gap-8"
        >
          <Input
            type="text"
            register={register("name")}
            className="text-slate-400 w-2/3 outline-none ml-2"
            placeholder="Arabian Paradise"
          />
          <Input
            type="text"
            register={register("desc")}
            className="text-slate-400 w-2/3 outline-none ml-2"
            placeholder="This hotel is amazing. It has its view..."
          />
          <Select
            data={optionTypes}
            register={register("type")}
            className="text-slate-400 w-2/3 outline-none ml-2"
          />
          <Select
            data={optionLocations}
            register={register("location")}
            className="text-slate-400 w-2/3 outline-none ml-2"
          />
          <Input
            type="text"
            register={register("beds", { valueAsNumber: true })}
            className="text-slate-400 w-2/3 outline-none ml-2"
            step={0.01}
            placeholder="$249.00"
          />
          <Input
            type="text"
            register={register("pricePerNight", { valueAsNumber: true })}
            className="text-slate-400 w-2/3 outline-none ml-2"
            step={1}
            placeholder="$249.00"
          />

          <div className=" text-slate-400 ml-4 w-2/3 flex items-center gap-4">
            <label htmlFor="freeWifi">Free Wifi</label>

            <Input
              type="checkbox"
              register={register("hasFreeWifi")}
              id="freeWifi"
              className="w-4 h-4"
            />
          </div>

          <label htmlFor="images" className="text-slate-400 w-2/3 ml-4">
            Upload Images
          </label>
          <input
            type="file"
            className="text-slate-400"
            style={{ display: "none" }}
            id="images"
            onChange={handleImage}
          />

          <Button
            disabled={isPending}
            className="w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700"
            label="Submit"
          />
        </form>
      </div>
    </div>
  );
}

export default Create;
