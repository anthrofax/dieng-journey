import { Reservation } from "./reservation";
import { Review } from "./review";

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  reservations: Reservation[];
  reviews: Review[];
};
