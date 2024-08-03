import AXIOS_API from "@/utils/axios-api";

export async function getAllDestinations() {
  const { data } = await AXIOS_API.get("/destinations");

  return data;
}

export async function getSelectedDestination({ id }: { id: string }) {
  const { data } = await AXIOS_API.get(`/destinations/${id}`);

  return data;
}
