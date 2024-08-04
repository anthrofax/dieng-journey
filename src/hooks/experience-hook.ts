import { getAllExperiences } from "@/services/experience-services";
import { Experience } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useExperienceHooks():{
  allExperiences: Experience[];
  isLoadingQuery: boolean
} {
  const { data: allExperiences, isLoading: isLoadingQuery } = useQuery({
    queryKey: ["experience"],
    queryFn: () => getAllExperiences(),
  });

  return { allExperiences, isLoadingQuery };
}
