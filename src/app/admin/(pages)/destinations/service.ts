import AXIOS_API from "@/utils/axios-api";

export async function getSelectedDestination({ id }: { id: string }) {
  const { data: selectedDestination } = await AXIOS_API.get(
    `/admin/destination/${id}`
  );

  return selectedDestination;
}

export async function createNewDestination({
  data,
  imageUrls,
}: {
  data: any;
  imageUrls: string[];
}) {
  const { data: newDestination } = await AXIOS_API.post("/admin/destination", {
    ...data,
    imageUrls,
  });

  console.log(newDestination);
  return newDestination;
}

export async function updateDestination({
  destinationId,
  body,
}: {
  destinationId: string;
  body: any;
}) {
  const { data: updatedDestination } = await AXIOS_API.patch(
    `/admin/destination/${destinationId}`,
    body
  );

  return updatedDestination;
}

export async function deleteDestination(id: string) {
  const { data } = await AXIOS_API.delete(`/admin/destination/${id}`);

  return data;
}
