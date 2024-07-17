import { Listing } from "@/models/listing";

export function calcAndSortListings(listings: any) {
  const sortedListings = listings
    .map((listing: Listing) => {
      if (listing.reviews.length === 0) return { ...listing, avgRating: 0 };

      const avgRating =
        listing.reviews.reduce((a, b) => {
          return a + b.stars;
        }, 0) / listing.reviews.length;

      return { ...listing, avgRating: Number(avgRating.toFixed(2)) };
    })
    .sort((a: any, b: any) => b.avgRating - a.avgRating);

  return sortedListings;
}
