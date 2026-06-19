import { NextRequest, NextResponse } from "next/server";

/**
 * Edge middleware — injects visitor geo context from Vercel's edge headers
 * into a lightweight cookie that the Panorama runtime reads on the client.
 *
 * This powers geo-targeted experiments (e.g. UAE headline variant) without
 * any third-party geo-IP service. The cookie is first-party, session-scoped,
 * and contains no PII — only ISO country/region codes and timezone.
 */
export function middleware(request: NextRequest) {
  const geo: Record<string, string> = {};

  const country = request.headers.get("x-vercel-ip-country");
  const region = request.headers.get("x-vercel-ip-country-region");
  const city = request.headers.get("x-vercel-ip-city");
  const timezone = request.headers.get("x-vercel-ip-timezone");

  if (country) geo.country = country;
  if (region) geo.region = region;
  if (city) geo.city = decodeURIComponent(city);
  if (timezone) geo.timezone = timezone;

  // Only set the cookie when we actually have geo data (i.e. running on Vercel
  // edge, not localhost). Skip if cookie already present in this session.
  if (Object.keys(geo).length === 0) return NextResponse.next();

  const existing = request.cookies.get("pa_geo");
  if (existing) return NextResponse.next();

  const response = NextResponse.next();
  response.cookies.set("pa_geo", JSON.stringify(geo), {
    path: "/",
    httpOnly: false,       // client-side Panorama runtime needs to read it
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 30,       // 30 min — session-scoped, refreshed on next visit
  });

  return response;
}

export const config = {
  // Run on page navigations only — skip static assets, API routes, and _next.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
