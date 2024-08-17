import AXIOS_API from "@/utils/axios-api";

export async function getAllLodgings() {
  const { data } = await AXIOS_API.get("/lodgings");

  return data;
}

export async function getSelectedLodging(id: string) {
  const { data } = await AXIOS_API.get(`/lodgings/${id}`);

  return data;
}
