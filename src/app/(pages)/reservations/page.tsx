"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "./card";
import { deleteReservation, getUserReservations } from "./service";
import toast from "react-hot-toast";
import Spinner from "@/components/spinner/spinner";

function Reservations() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: getUserReservations,
  });

  const { mutate } = useMutation({
    mutationFn: ({
      chargeId,
      reservationId,
    }: {
      chargeId: string;
      reservationId: string;
    }) => deleteReservation({ chargeId, reservationId }),
    onSuccess: handleSuccess,
  });

  function handleSuccess() {
    toast.success("Successfully deleted a reservation");
    queryClient.invalidateQueries({
      queryKey: ["reservations"],
    });
  }

  return (
    <div className=" px-16 min-h-screen w-full col-span-7">
      <div className="h-full w-full flex flex-wrap gap-12">
        {isLoading? <Spinner/> : data?.length > 0 ? (
          data?.map((reservation: any) => (
            <Card
              key={reservation.id}
              reservation={reservation}
              mutate={mutate}
            />
          ))
        ) : (
          <h1 className="text-start text-3xl font-bold text-slate-700">
            You have no reservations.
          </h1>
        )}
      </div>
    </div>
  );
}

export default Reservations;
