import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { getMostOrderedDestinations } from "../(pages)/dashboard/service";
import {
  getAllDestinations,
  getAllExperiences,
  getAllLodgings,
  getAllPackageOrderRevenue,
  getAllPackageOrders,
  getAllRegularOrderRevenue,
  getAllRegularOrders,
  getAllUsers,
} from "../services/service";


export const useWidgetHook = () => {
  const [
    usersQuery,
    destinationsQuery,
    experiencesQuery,
    lodgingsQuery,
    regularOrdersQuery,
    regularOrdersRevenueQuery,
    packageOrdersQuery,
    packageOrdersRevenueQuery,
    mostOrderedQuery,
  ] = useQueries({
    queries: [
      {
        queryFn: getAllUsers,
        queryKey: ["admin", "users"],
      },
      {
        queryFn: getAllDestinations,
        queryKey: ["admin", "destinations"],
      },
      {
        queryFn: getAllExperiences,
        queryKey: ["admin", "experiences"],
      },
      {
        queryFn: getAllLodgings,
        queryKey: ["admin", "lodgings"],
      },
      {
        queryFn: getAllRegularOrders,
        queryKey: ["admin", "orders"],
      },
      {
        queryFn: getAllRegularOrderRevenue,
        queryKey: ["admin", "revenue"],
      },
      {
        queryFn: getAllPackageOrders,
        queryKey: ["admin", "package-orders"],
      },
      {
        queryFn: getAllPackageOrderRevenue,
        queryKey: ["admin", "package-orders-revenue"],
      },
      {
        queryFn: getMostOrderedDestinations,
        queryKey: ["admin", "most-ordered-destinations"],
      },
    ],
  });

  return [
    usersQuery,
    destinationsQuery,
    experiencesQuery,
    lodgingsQuery,
    regularOrdersQuery,
    regularOrdersRevenueQuery,
    packageOrdersQuery,
    packageOrdersRevenueQuery,
    mostOrderedQuery,
  ];
};
