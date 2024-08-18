import { Session } from "inspector";
import type { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      isAdmin;
      id;
      profileImage;
      username;
      email;
    };
  }

  interface User {
    isAdmin: boolean;
    id: string;
    profileImage: string;
    username: string;
    email: string;
  }
}
