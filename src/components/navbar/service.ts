import AXIOS_API from "@/utils/axios-api";

export async function getUserDataForNavbar(id: string) {
  const { data: user } = await AXIOS_API.get(`/user-for-navbar/${id}`);

  console.log(user)

  return user;
}

