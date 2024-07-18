import { Listing, Reservation, Review } from "@prisma/client";

export interface listingWithBlurredImage extends Listing {
  blurredImage: string;
  avgRating: number;
}
