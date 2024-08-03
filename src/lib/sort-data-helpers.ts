import { Destination, Listing, Review } from "@prisma/client";

type ListingWithReviews = Listing & {
  reviews: Review[];
};

type destinationWithReviews = Destination & {
  reviews: Review[];
};

export function calcAndSortListings(listings: ListingWithReviews[]) {
  const sortedListings = listings
    .map((listing: ListingWithReviews) => {
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

export function calcAndSortDestinations(destinations: destinationWithReviews[]) {
  const sortedListings = destinations
    .map((destination: destinationWithReviews) => {
      if (destination.reviews.length === 0) return { ...destination, avgRating: 0 };

      const avgRating =
        destination.reviews.reduce((a, b) => {
          return a + b.stars;
        }, 0) / destination.reviews.length;

      return { ...destination, avgRating: Number(avgRating.toFixed(2)) };
    })
    .sort((a: any, b: any) => b.avgRating - a.avgRating);

  return sortedListings;
}
