import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {  getAllLodgings } from "../services/service";
import { deleteLodging } from "../(pages)/lodging/service";

export const useLodgingHook = () => {
  const queryClient = useQueryClient();

  const { data: allLodgings, isLoading: isLoadingQuery } = useQuery({
    queryFn: getAllLodgings,
    queryKey: ["admin", "lodging"],
  });

  const { mutate: handleDeleteLodging, isPending: isPendingDelete } =
    useMutation({
      mutationFn: (id: string) => deleteLodging(id),
      onSuccess: handleDeleteSuccess,
    });

  function handleDeleteSuccess() {
    toast.success("Data lodging anda berhasil dihapus!");
    queryClient.invalidateQueries({
      queryKey: ["admin", "lodging"],
    });
  }

  return {
    handleDeleteLodging,
    allLodgings,
    isLoadingQuery,
    isPendingDelete,
  };
};
