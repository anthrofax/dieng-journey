import { getAllExperiences } from "@/services/experience-services";
import { getAllLodgings } from "@/services/lodging-services";
import { Penginapan } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useLodgingHooks():{
  allLodgings: Penginapan[];
  isLoadingQuery: boolean
} {
  const { data: allLodgings, isLoading: isLoadingQuery } = useQuery({
    queryKey: ["lodging"],
    queryFn: () => getAllLodgings(),
  });

  return { allLodgings, isLoadingQuery };
}
