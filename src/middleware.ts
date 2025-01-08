import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";
import { decrypt } from "./utils/session";

interface ReceivedDecodedType {
  userId: string;
  expiresAt: number;
}

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const urlOrigin = req.nextUrl.origin;
  console.log(pathname);

  if (pathname.startsWith("/reset-password")) {
    const resetPasswordToken = pathname.slice(1).split("/")[1];
    if (!!token) {
      return NextResponse.redirect(urlOrigin + "/");
    } else {
      if (!!resetPasswordToken) {
        try {
          const decoded = await decrypt(resetPasswordToken);

          if (!decoded) {
            return NextResponse.redirect(urlOrigin + "/login");
          }

          const { expiresAt } = decoded as JWTPayload | ReceivedDecodedType;

          if ((expiresAt as number) < Date.now()) {
            return NextResponse.redirect(urlOrigin + "/login");
          }
        } catch (err) {
          console.log(err);
          return NextResponse.redirect(urlOrigin + "/login");
        }
      }
      return NextResponse.next();
    }
  }

  if (pathname.includes("/admin") && !token?.isAdmin) {
    return NextResponse.redirect(urlOrigin + "/");
  }

  if (!pathname.includes("/login") && !pathname.includes("/signup") && !token) {
    return NextResponse.redirect(urlOrigin + "/login");
  }

  if ((pathname.includes("/login") || pathname.includes("/signup")) && token) {
    return NextResponse.redirect(urlOrigin + "/");
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/details/((?!general).*)",
    "/orders",
    "/user/((?!general).*)",
    "/reservations",
    "/login",
    "/signup",
    "/order-package",
    "/admin/dashboard",
    "/admin/users",
    "/admin/reservations",
    "/admin/listings",
    "/reset-password/:token*",
    "/reset-password",
  ],
};
