import {
    Destination,
    Experience,
    Order,
    Penginapan,
    User,
  } from "@prisma/client";

export type AdminRegularOrderType = (Order & {
    user: User;
    penginapan?: Penginapan | null;
    destinations: {
      destinations: Destination;
    }[];
    experiences: {
      experiences: Experience;
    }[];
  });