import AXIOS_API from "@/utils/axios-api";

export async function createNewListing({
  data,
  imageUrls,
}: {
  data: any;
  imageUrls: string[];
}) {
  const { data: newListing } = await AXIOS_API.post("/admin/listing", {
    ...data,
    imageUrls,
  });

  console.log(newListing);
  return newListing;
}

export async function updateListing({
  listingId,
  body,
}: {
  listingId: string;
  body: any;
}) {
  const { data: updatedListing } = await AXIOS_API.put(
    `/admin/listing/${listingId}`,
    body
  );

  return updatedListing;
}

export async function deleteListing(id: string) {
  const { data } = await AXIOS_API.delete(`/admin/listing/${id}`);

  return data;
}
