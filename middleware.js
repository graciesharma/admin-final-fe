import { NextResponse } from "next/server";

export function middleware(request) {
  // if (request.cookies.has("authtoken")) {
    return NextResponse.next();
  // }
  // return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/"],
};
