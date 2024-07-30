import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteDestination, getSelectedDestination } from "../(pages)/destinations/service";
import { getAllDestinations } from "../services/service";

export const useDestinationHook = () => {
  const queryClient = useQueryClient();

  const { data: allDestinations, isLoading: isLoadingQuery } = useQuery({
    queryFn: getAllDestinations,
    queryKey: ["admin", "destinations"],
  });
  

  const { mutate: handleDeleteDestination, isPending: isPendingDelete } =
    useMutation({
      mutationFn: (id: string) => deleteDestination(id),
      onSuccess: handleDeleteSuccess,
    });


  function handleDeleteSuccess() {
    toast.success("Data destinasi anda berhasil dihapus!");
    queryClient.invalidateQueries({
      queryKey: ["admin", "destinations"],
    });
  }

  return {
    handleDeleteDestination,
    allDestinations,
    isLoadingQuery,
    isPendingDelete,
  };
};
