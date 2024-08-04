import AXIOS_API from "@/utils/axios-api";
import { MutateExperienceFormType } from "../../modals/experience-modal/type";

export async function getSelectedExperience({ id }: { id: string }) {
  const { data: selectedExperience } = await AXIOS_API.get(
    `/admin/experience/${id}`
  );

  return selectedExperience;
}

export async function createNewExperience(data: MutateExperienceFormType) {
  const { data: newExperience } = await AXIOS_API.post(
    "/admin/experience",
    data
  );

  return newExperience;
}

export async function updateExperience({
  experienceId,
  data,
}: {
  experienceId: string;
  data: MutateExperienceFormType;
}) {
  const { data: updatedExperience } = await AXIOS_API.patch(
    `/admin/experience/${experienceId}`,
    data
  );

  return updatedExperience;
}

export async function deleteExperience(id: string) {
  const { data } = await AXIOS_API.delete(`/admin/experience/${id}`);

  return data;
}
