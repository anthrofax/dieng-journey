import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getAllExperiences } from "../services/service";
import { deleteExperience } from "../(pages)/experiences/service";

export const useExperienceHook = () => {
  const queryClient = useQueryClient();

  const { data: allExperiences, isLoading: isLoadingQuery } = useQuery({
    queryFn: getAllExperiences,
    queryKey: ["admin", "experiences"],
  });

  const { mutate: handleDeleteExperience, isPending: isPendingDelete } =
    useMutation({
      mutationFn: (id: string) => deleteExperience(id),
      onSuccess: handleDeleteSuccess,
    });

  function handleDeleteSuccess() {
    toast.success("Data experience anda berhasil dihapus!");
    queryClient.invalidateQueries({
      queryKey: ["admin", "experiences"],
    });
  }

  return {
    handleDeleteExperience,
    allExperiences,
    isLoadingQuery,
    isPendingDelete,
  };
};
