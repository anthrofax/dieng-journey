import {
  getAllDestinations,
  getSelectedDestination,
} from "@/services/destination-services";
import { useQuery } from "@tanstack/react-query";

export const useDestinationHook = () => {
  const { data: allDestinations, isLoading } = useQuery({
    queryKey: ["destinasi"],
    queryFn: getAllDestinations,
  });

  return {
    allDestinations,
    isLoading,
  };
};
