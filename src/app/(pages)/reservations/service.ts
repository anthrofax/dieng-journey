import AXIOS_API from "@/utils/axios-api";

export async function getUserReservations() {
  const { data } = await AXIOS_API.get(`/reservation`);

  return data;
}

export async function deleteReservation({
  chargeId,
  reservationId,
}: {
  chargeId: string;
  reservationId: string;
}) {
  const { data: _, status: refundStatus } = await refundPayment({
    chargeId,
    reservationId,
  });
  if (refundStatus >= 400) throw new Error("Couldn't refund your reservation");

  const { data } = await AXIOS_API.delete(`/reservation/${reservationId}`);

  return { data };
}

async function refundPayment({
  chargeId,
  reservationId,
}: {
  chargeId: string;
  reservationId: string;
}) {
  const { data, status } = await AXIOS_API.delete(
    `/stripe?charge_id=${chargeId}&reservation_id=${reservationId}`
  );

  return { data, status };
}
