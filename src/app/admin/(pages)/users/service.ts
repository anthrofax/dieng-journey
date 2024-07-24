import AXIOS_API from "@/utils/axios-api";

export async function deleteUser(id: string) {
  const { data } = await AXIOS_API.delete(`/admin/user/${id}`);

  return data;
}
