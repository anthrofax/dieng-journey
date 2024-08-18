import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import db from "@/lib/db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("Invalid input");
        }

        const isCorrectPass = await bcryptjs.compare(password, user.password);

        if (!isCorrectPass) {
          throw new Error("Invalid input");
        } else {
          const { password, ...currentUser } = user;

          return currentUser;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.profileImage = user.profileImage;
      }
      return token;
    },
    session({ session, token }) {
      session.user.isAdmin = token.isAdmin;
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.profileImage = token.profileImage;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
