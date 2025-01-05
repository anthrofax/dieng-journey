import db from "./db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { currentUserDataType } from "@/data/types";

async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser(): Promise<currentUserDataType | null> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return null;
    }

    const { password, ...currentUser } = user;

    return currentUser as currentUserDataType;
  } catch (error) {
    console.log(error);
    return null;
  }
}
