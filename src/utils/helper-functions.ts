import { MutateExperienceFormType } from "@/app/admin/modals/experience-modal/type";
import { postImages } from "@/lib/cloudinary-helpers";
import React, { MutableRefObject, RefObject } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";

export const uploadImage = async (image: any, idx?: number) => {
  if (!image) return;

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  let toastId;

  if (idx)
    toastId = toast.loading(
      `Gambar ${idx ? `${idx + 1}` : ""} sedang diunggah`
    );

  console.log(image);

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", UPLOAD_PRESET as string);

  try {
    const imageUrl = await postImages(CLOUD_NAME as string, formData);

    toast.success(`Gambar ${idx ? `${idx + 1}` : ""} telah berhasil diunggah`);
    toast.dismiss(toastId);

    return imageUrl;
  } catch (error) {
    console.error(error);
  }
};

export function clearImageInput(
  imageInputRef: RefObject<HTMLInputElement>,
  imageListSetState: React.Dispatch<React.SetStateAction<File[]>>
) {
  if (imageInputRef.current) imageInputRef.current.value = "";

  imageListSetState([]);
}

export const handleHideModal = ({
  formState,
  showModalStateSetter,
  imageInputRef,
  imageListSetState,
}: {
  formState: UseFormReturn<any, any, undefined>;
  showModalStateSetter: React.Dispatch<React.SetStateAction<boolean>>;
  imageInputRef?: RefObject<HTMLInputElement>;
  imageListSetState?: React.Dispatch<React.SetStateAction<File[]>> | undefined;
}) => {
  formState!.reset();
  showModalStateSetter((cur) => !cur);

  if (imageInputRef && imageListSetState)
    clearImageInput(imageInputRef, imageListSetState);
};

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
