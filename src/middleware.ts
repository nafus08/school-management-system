import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth";

const publicRoutes = ["/", "/api/auth/login", "/sign-in"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Skip auth check for static files
  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Get session from cookie
  const token = request.cookies.get("auth_token")?.value;
  const session = token ? await getSession() : null;

  // Redirect to sign-in if not authenticated and accessing protected route
  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Redirect authenticated users away from sign-in
  if (pathname === "/sign-in" && session) {
    return NextResponse.redirect(new URL(`/${session.role}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
