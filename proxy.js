import { NextResponse } from "next/server";

export function proxy(request) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  console.log("=================================");
  console.log("PROXY HOST:", hostname);

  // Bukan subdomain localhost
  if (!hostname.endsWith(".localhost")) {
    console.log("PROXY: normal request");
    console.log("=================================");

    return NextResponse.next();
  }

  const subdomain = hostname.replace(".localhost", "");

  console.log("PROXY SUBDOMAIN:", subdomain);

  const pathname = request.nextUrl.pathname;

  /*
   * URL public yang dipakai:
   *
   * smart.localhost/
   * smart.localhost/tentang
   * smart.localhost/akademik
   * smart.localhost/articles
   * smart.localhost/kontak
   *
   * Internal Next.js:
   *
   * /website/smart/
   * /website/smart/tentang
   * /website/smart/akademik
   * /website/smart/articles
   * /website/smart/kontak
   */

  // Kalau user masih membuka /website,
  // arahkan ke homepage public.
  if (pathname === "/website") {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/";

    console.log(
      "PROXY REDIRECT:",
      "/website -> /"
    );
    console.log("=================================");

    return NextResponse.redirect(redirectUrl);
  }

  /*
   * Kalau request sudah merupakan internal path:
   *
   * /website/smart/...
   *
   * jangan rewrite lagi.
   *
   * Ini mencegah:
   *
   * /website/smart/akademik
   *
   * menjadi:
   *
   * /website/smart/website/smart/akademik
   */
  const internalPrefix = `/website/${subdomain}`;

  if (
    pathname === internalPrefix ||
    pathname.startsWith(`${internalPrefix}/`)
  ) {
    console.log(
      "PROXY INTERNAL PATH:",
      pathname
    );
    console.log("=================================");

    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  /*
   * Public:
   *
   * /
   * /tentang
   * /akademik
   * /articles
   * /kontak
   *
   * menjadi:
   *
   * /website/smart/
   * /website/smart/tentang
   * /website/smart/akademik
   * /website/smart/articles
   * /website/smart/kontak
   */
  url.pathname = `/website/${subdomain}${pathname}`;

  console.log(
    "PROXY REWRITE:",
    url.pathname
  );
  console.log("=================================");

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Jalankan proxy untuk halaman public,
     * tetapi jangan ganggu:
     *
     * _next
     * api
     * favicon
     * robots
     * sitemap
     */
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};