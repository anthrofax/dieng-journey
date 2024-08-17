import {
  getAllDestinations,
  getSelectedDestination,
} from "@/services/destination-services";
import { Destination } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useDestinationHook = (): {
  allDestinations: Destination[];
  isLoading: boolean;
} => {
  const { data: allDestinations, isLoading } = useQuery({
    queryKey: ["destinasi"],
    queryFn: getAllDestinations,
  });

  return {
    allDestinations,
    isLoading,
  };
};
