import AXIOS_API from "@/utils/axios-api";

export async function getMostOrderedDestinations() {
  const { data } = await AXIOS_API.get("/admin/destination/most-ordered");

  return data;
}
