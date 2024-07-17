import { Reservation } from "./reservation";
import { Review } from "./review";

export type Listing = {
  id: string;
  name: string;
  location: string;
  type: string;
  desc: string;
  pricePerNight: number;
  beds: number;
  hasFreeWifi: boolean;
  imageUrls: string[];
  reviews: Review[];
  reservations: Reservation[];
};
