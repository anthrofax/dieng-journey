import { listingWithBlurredImage } from "@/models/listing";
import AXIOS_API from "@/utils/axios-api";
import { Listing } from "@prisma/client";

export async function getListingById(
  id: string
): Promise<listingWithBlurredImage> {
  const { data } = await AXIOS_API.get(`/listing/details/${id}`);

  if (data) {
    const { data: base64 } = await AXIOS_API.get(
      `/base64?url=${data.imageUrls[0]}`
    );
    data.blurredImage = base64;
  }

  return data;
}

export async function postReview(id: string, body: any) {
  try {
    const { data } = await AXIOS_API.post(`/review?id=${id}`, body);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getReviewsByListing(id: string) {
  const { data } = await AXIOS_API.get(`/review/${id}`);

  return data;
}
