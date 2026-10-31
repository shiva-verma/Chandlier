import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Next.js 16 renamed `middleware` to `proxy` and runs it on the Node.js
 * runtime. This is an *optimistic* gate only — every Server Action and data
 * read still re-checks the session (see `requireAdmin`/`requireUser`).
 */
export const proxy = auth((request) => {
  const { pathname } = request.nextUrl;
  const user = request.auth?.user;

  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  if (pathname.startsWith("/admin") && user?.role !== "admin" && user?.role !== "super_admin") {
    const url = new URL("/login", request.nextUrl.origin);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/account") && !user) {
    const url = new URL("/login", request.nextUrl.origin);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/trade/dashboard/:path*", "/trade/catalogue/:path*", "/trade/quotations/:path*"],
};
