import { postImages } from "@/lib/cloudinary-helpers";
import toast from "react-hot-toast";

export const uploadImage = async (image: any, idx?: number) => {
  if (!image) return;

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  let toastId;

  if (idx)
    toastId = toast.loading(
      `Image ${idx ? `${idx + 1}` : ""} is being uploaded`
    );

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", UPLOAD_PRESET as string);

  try {
    const imageUrl = await postImages(CLOUD_NAME as string, formData);

    toast.success(`Successfully uploaded image ${idx ? `${idx + 1}` : ""}`);
    toast.dismiss(toastId);

    return imageUrl;
  } catch (error) {
    console.error(error);
  }
};
