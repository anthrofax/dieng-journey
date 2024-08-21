import {
  Destination,
  Experience,
  Order,
  PackageOrder,
  Penginapan,
  User,
} from "@prisma/client";

export type AdminRegularOrderType = Order & {
  user: User;
  penginapan?: Penginapan | null;
  destination: Destination;
  experiences: {
    experiences: Experience;
  }[];
};

export type AdminPackageOrderType = PackageOrder & {
  user: User;
  penginapan?: Penginapan | null;
  destinations: {
    destinations: Destination;
  }[];
  experiences: {
    experiences: Experience;
  }[];
};
