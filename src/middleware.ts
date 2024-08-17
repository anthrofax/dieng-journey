import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const urlOrigin = req.nextUrl.origin;

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
  ],
};
