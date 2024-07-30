import AXIOS_API from "@/utils/axios-api";

export async function getSelectedExperience({ id }: { id: string }) {
  const { data: selectedExperience } = await AXIOS_API.get(
    `/admin/experience/${id}`
  );

  return selectedExperience;
}

export async function createNewExperience({
  data,
  imageUrls,
}: {
  data: any;
  imageUrls: string[];
}) {
  const { data: newExperience } = await AXIOS_API.post("/admin/experience", {
    ...data,
    imageUrls,
  });

  console.log(newExperience);
  return newExperience;
}

export async function updateExperience({
  experienceId,
  body,
}: {
  experienceId: string;
  body: any;
}) {
  const { data: updatedExperience } = await AXIOS_API.put(
    `/admin/experience/${experienceId}`,
    body
  );

  return updatedExperience;
}

export async function deleteExperience(id: string) {
  const { data } = await AXIOS_API.delete(`/admin/experience/${id}`);

  return data;
}
