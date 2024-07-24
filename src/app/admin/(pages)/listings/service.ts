import AXIOS_API from "@/utils/axios-api";

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
