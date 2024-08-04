import AXIOS_API from "@/utils/axios-api";
import { MutateLodgingFormType } from "../../modals/lodging-modal/type";

export async function getSelectedLodging({ id }: { id: string }) {
  const { data: selectedExperience } = await AXIOS_API.get(
    `/admin/lodging/${id}`
  );

  return selectedExperience;
}

export async function createNewLodging(data: MutateLodgingFormType) {
  const { data: newLodging } = await AXIOS_API.post(
    "/admin/lodging",
    data
  );

  return newLodging;
}

export async function updateLodging({
  lodgingId,
  data,
}: {
  lodgingId: string;
  data: MutateLodgingFormType;
}) {
  const { data: updatedLodging } = await AXIOS_API.patch(
    `/admin/lodging/${lodgingId}`,
    data
  );

  return updatedLodging;
}

export async function deleteLodging(id: string) {
  const { data } = await AXIOS_API.delete(`/admin/lodging/${id}`);

  return data;
}
