import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const urlOrigin = "https://a5ef-2400-9800-6036-91f-3c90-1e86-2cd6-b240.ngrok-free.app/";

  if (pathname.includes("/admin") && !token?.isAdmin) {
    return NextResponse.redirect('/');
  }

  if (!pathname.includes("/login") && !pathname.includes("/signup") && !token) {
    return NextResponse.redirect("/login");
  }

  if ((pathname.includes("/login") || pathname.includes("/signup")) && token) {
    return NextResponse.redirect('/');
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/details/((?!general).*)",
    "/user/((?!general).*)",
    "/reservations",
    "/login",
    "/signup",
    "/admin/dashboard",
    "/admin/users",
    "/admin/reservations",
    "/admin/listings",
  ],
};
