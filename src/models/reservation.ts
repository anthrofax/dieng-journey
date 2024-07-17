export type Reservation = {
  id: string;
  startDate: Date;
  endDate: Date;
  chargeId: string;
  daysDifference: number;
  reservedDates: number[];
  listingId: string;
  userId: string;
};
