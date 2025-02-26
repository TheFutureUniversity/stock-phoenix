// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const allowedRoutes = [/^\/[^/]+\/new-long-free$/];


export function middleware(request: NextRequest) {
    
  const { pathname } = request.nextUrl;
 
  const isAllowed = allowedRoutes.some((pattern) => pattern.test(pathname));

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/cm1c5u2hw2i1apcqsokwvm46x/new-long-free", request.url)); 
  }
  return NextResponse.next();
}


export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|Common|paid-video|prabhu-swing|public|star|logo).*)',
    ],
  }