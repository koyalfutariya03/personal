export async function GET() {
  const robotsTxt = `User-agent: *
Disallow: /AdminLogin
Disallow: /dashboard
Disallow: /superadmin
Disallow: /terms
Disallow: /privacy
Disallow: /919004002941
Disallow: /wa.me/919004002941
Disallow: /tel:9004008253
Sitemap: https://connectingdotserp.com/sitemap.xml`;

  return new Response(robotsTxt, {
      headers: {
          "Content-Type": "text/plain",
      },
  });
}
