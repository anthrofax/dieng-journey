import { Listing, Reservation, Review } from "@prisma/client";

export interface ListingType extends Listing {
  blurredImage: string;
  avgRating: number;
  reservations: Reservation[]
}
