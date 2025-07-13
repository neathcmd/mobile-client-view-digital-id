import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const privatePaths = ["/profile"];
  const publicPaths = ["/login", "/register", "user_card"];

  const isPrivate = privatePaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  const isPublic = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // Redirect unauthorized user from private page to login
  if (isPrivate && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect logged-in user away from public page (like login) to dashboard
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/login", "/register"],
};
