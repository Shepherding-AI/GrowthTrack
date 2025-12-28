import { NextRequest, NextResponse } from "next/server";

function getTenantFromHost(host: string, baseDomain: string): string | null {
  // host may include port in dev
  const hostNoPort = host.split(":")[0].toLowerCase();
  const base = baseDomain.toLowerCase();

  // If running on localhost, we support {tenant}.localhost
  // If baseDomain is "localhost", then host "demo.localhost" -> tenant "demo"
  // If host equals base domain (no subdomain), return null (marketing/root app)
  if (hostNoPort === base) return null;

  // If host endswith base domain, the left-most label(s) are the subdomain.
  // Example: grace.yourapp.com and baseDomain yourapp.com => tenant "grace"
  if (hostNoPort.endsWith("." + base)) {
    const sub = hostNoPort.slice(0, hostNoPort.length - (base.length + 1));
    if (!sub) return null;
    // If nested subdomains, take the first segment only for tenant slug (keep it simple)
    return sub.split(".")[0];
  }

  // If baseDomain is not in host (custom domain), treat as unknown for MVP
  return null;
}

export function middleware(req: NextRequest) {
  const baseDomain = process.env.APP_BASE_DOMAIN || "localhost";
  const host = req.headers.get("host") || "";
  const tenant = getTenantFromHost(host, baseDomain);

  const url = req.nextUrl.clone();

  // Always attach tenant slug for downstream server components.
  const res = NextResponse.next();
  if (tenant) res.headers.set("x-tenant-slug", tenant);

  // If request is to apex domain, no tenant rewrite.
  if (!tenant) return res;

  // For tenant subdomains, rewrite:
  // "/" -> "/t/{tenant}"
  // "/signup" -> "/t/{tenant}/signup"
  // "/me" -> "/t/{tenant}/me"
  // "/admin/..." stays "/admin/..." but tenant context exists via header
  const pathname = url.pathname;

  // Skip Next internals/static
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets")
  ) {
    return res;
  }

  // If already on /t/[tenant], leave it
  if (pathname.startsWith("/t/")) return res;

  // Map a few friendly public routes into tenant space
  const friendly = ["/", "/signup", "/me"];
  if (friendly.includes(pathname)) {
    const newPath =
      pathname === "/" ? `/t/${tenant}` : `/t/${tenant}${pathname}`;
    url.pathname = newPath;
    return NextResponse.rewrite(url, { headers: res.headers });
  }

  // For everything else on tenant subdomain, rewrite to /t/{tenant}{pathname}
  url.pathname = `/t/${tenant}${pathname}`;
  return NextResponse.rewrite(url, { headers: res.headers });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
