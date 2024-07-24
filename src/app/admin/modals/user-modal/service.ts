import AXIOS_API from "@/utils/axios-api";

export async function getUserById(userId:string) {
  const { data } = await AXIOS_API.get(`/admin/user/${userId}`);

  return data;
}

export async function updateUser({
  userId,
  data,
}: {
  userId: string;
  data: any;
}) {
  const { data: updatedUser } = await AXIOS_API.put(
    `/admin/user/${userId}`,
    data
  );

  return updatedUser;
}
