import AXIOS_API from "@/utils/axios-api";

export async function getUserData(id: string) {
  const { data: user } = await AXIOS_API.get(`/user/${id}`);

  return user;
}

export async function updateUserData(id: string, body: any) {
  try {
    const { data: user } = await AXIOS_API.patch(`/user/${id}`, body);
    
  } catch (error) {
    return error;
  }
}
