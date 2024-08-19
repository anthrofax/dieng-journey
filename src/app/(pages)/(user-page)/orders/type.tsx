import {
  Destination,
  Experience,
  Order,
  PackageOrder,
  Penginapan,
} from "@prisma/client";

export type RegularOrderType = (Order & {
  destination: Destination;
  penginapan?: Penginapan | null;
  experiences: {
    experiences: Experience
  }[];
});

export type PackageOrderType = (PackageOrder & {
  penginapan?: Penginapan | null;
  destinations: {
    destinations: Destination;
  }[];
  experiences: {
    experiences: Experience;
  }[];
});
