import { Session } from "inspector";
import type { DefaultSession, User } from "next-auth";


declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            isAdmin;
        };
    }

    interface User {
        isAdmin: boolean;
    }
}

