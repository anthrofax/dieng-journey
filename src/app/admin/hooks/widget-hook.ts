import { useQueries } from "@tanstack/react-query";
import { getMostOrderedDestinations } from "../(pages)/dashboard/service";
import {
  getAllDestinations,
  getAllOrders,
  getAllRevenue,
  getAllUsers,
} from "../services/service";

export const useWidgetHook = () => {
  const [
    usersQuery,
    destinationsQuery,
    ordersQuery,
    revenueQuery,
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
        queryFn: getAllOrders,
        queryKey: ["admin", "orders"],
      },
      {
        queryFn: getAllRevenue,
        queryKey: ["admin", "revenue"],
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
    ordersQuery,
    revenueQuery,
    mostOrderedQuery,
  ];
};
