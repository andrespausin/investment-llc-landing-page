import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE, hasLocale } from "@/lib/i18n/config";
import { negotiateLocale } from "@/lib/i18n/negotiate";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Locale routing:
 * - Paths that already start with a supported locale pass through and the
 *   choice is remembered in a cookie.
 * - Any other path is redirected to the remembered locale, or to the best
 *   match for the browser language, falling back to English.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (hasLocale(firstSegment)) {
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== firstSegment) {
      response.cookies.set(LOCALE_COOKIE, firstSegment, {
        path: "/",
        maxAge: ONE_YEAR,
        sameSite: "lax",
      });
    }
    return response;
  }

  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = hasLocale(remembered)
    ? remembered
    : negotiateLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals, metadata files and any path with a file extension.
  matcher: ["/((?!api|_next/static|_next/image|robots.txt|sitemap.xml|.*\\..*).*)"],
};
