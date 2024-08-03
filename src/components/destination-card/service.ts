import AXIOS_API from "@/utils/axios-api";

export async function getBestHotels() {
  const { data } = await AXIOS_API.get("/listing/best-hotels");

  if (!data) return null;

  console.log(data)

  const blurredImages = await Promise.all(
    data.map((listing: any) =>
      AXIOS_API.get(`/base64?url=${listing.imageUrls[0]}`)
    )
  );

  console.log(blurredImages)

  const bestHotels = blurredImages.map((img, idx) => {
    const blurredImage = img.data;
    const currentHotel = data[idx];

    return { ...currentHotel, blurredImage };
  });

  console.log(bestHotels)

  return bestHotels;
}
