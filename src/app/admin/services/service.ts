import AXIOS_API from "@/utils/axios-api";

export async function getAllListings() {
  const { data } = await AXIOS_API.get("/admin/listing/get-all-listings");

  return data;
}

export async function getAllRooms() {
  const { data } = await AXIOS_API.get("/admin/room/get-all-rooms");

  return data;
}

export async function getAllDestinations() {
  const { data } = await AXIOS_API.get("/admin/destination/get-all-destinations");

  return data;
}

export async function getAllExperiences() {
  const { data } = await AXIOS_API.get("/admin/experience/get-all-experiences");

  return data;
}

export async function getAllLodgings() {
  const { data } = await AXIOS_API.get("/admin/lodging/get-all-lodgings");

  return data;
}

export async function getAllRegularOrders() {
  const { data } = await AXIOS_API.get(
    "/admin/order/get-all-orders"
  );

  return data;
}

export async function getAllPackageOrders() {
  const { data } = await AXIOS_API.get(
    "/admin/package-order/get-all-package-orders"
  );

  return data;
}

export async function getAllRegularOrderRevenue() {
  const { data } = await AXIOS_API.get("/admin/order/get-all-revenue");

  return data;
}

export async function getAllPackageOrderRevenue() {
  const { data } = await AXIOS_API.get("/admin/package-order/get-all-revenue");

  return data;
}

export async function getAllUsers() {
  const { data } = await AXIOS_API.get("/admin/user/get-all-users");

  return data;
}

export async function deleteReview(id: string) {
  const { data } = await AXIOS_API.delete(`/admin/review/${id}`);

  return data;
}
