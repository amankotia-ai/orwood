import { NextRequest, NextResponse } from "next/server";

/**
 * Edge middleware — injects geo context from Vercel's edge headers into a
 * cookie (`pa_geo`) so the Panorama client-side runtime can read it as
 * `initialContext.geo`. This powers geo-conditional rules (UAE headline,
 * GCC CTA localisation) without any external API call.
 *
 * The cookie is HttpOnly=false (client-readable), SameSite=Lax, and
 * short-lived (1 hour) — it contains only ISO country/region/city codes,
 * no PII.
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const country = req.headers.get("x-vercel-ip-country") || "";
  const region = req.headers.get("x-vercel-ip-country-region") || "";
  const city = req.headers.get("x-vercel-ip-city") || "";
  const timezone = req.headers.get("x-vercel-ip-timezone") || "";

  if (country) {
    const geo = JSON.stringify({
      country,
      ...(region && { region }),
      ...(city && { city: decodeURIComponent(city) }),
      ...(timezone && { timezone }),
    });

    res.cookies.set("pa_geo", geo, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 3600,
    });
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Run on all page requests, skip static assets and API routes.
     * Next.js convention: negative lookahead for _next, api, and common statics.
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico|woff2?|ttf|eot)).*)",
  ],
};
