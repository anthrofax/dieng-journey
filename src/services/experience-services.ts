import AXIOS_API from "@/utils/axios-api";

export async function getAllExperiences() {
  const { data } = await AXIOS_API.get("/experiences");

  return data;
}