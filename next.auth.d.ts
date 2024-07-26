import { Session } from "inspector";
import type { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      isAdmin;
      id;
    };
  }

  interface User {
    isAdmin: boolean;
    id: string;
  }
}
