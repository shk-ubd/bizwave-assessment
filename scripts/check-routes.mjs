import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const routes = [
  "/",
  "/about",
  "/contact",
  "/contact?subject=Demo%20trip",
  "/destinations",
  "/destinations/maldives",
  "/destinations/istanbul",
  "/destinations/dubai",
  "/destinations/paris",
  "/destinations/tokyo",
  "/destinations/london",
  "/services/flights",
  "/services/hotels",
  "/services/visa",
  "/services/cars",
  "/privacy",
  "/terms",
  "/sitemap.xml",
  "/robots.txt",
];
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  if (!route.endsWith(".xml") && !route.endsWith(".txt")) {
    assert.match(html, /<h1[\s>]/, `${route} must have a primary heading`);
    assert.match(html, /<title>/, `${route} must have metadata`);
    assert.doesNotMatch(
      html,
      /href="#"/,
      `${route} must not have placeholder links`,
    );
    assert.doesNotMatch(
      html,
      /Internal Server Error|NEXT_HTTP_ERROR_FALLBACK;500/,
      `${route} must render without server errors`,
    );
  }
  console.log(`PASS ${response.status} ${route}`);
}
assert.equal((await fetch(base + "/unknown-page")).status, 404);
console.log("PASS unknown route returns 404");
for (const image of [
  "hero",
  "maldives",
  "istanbul",
  "dubai",
  "paris",
  "tokyo",
  "london",
  "hotel",
  "stay",
  "flight",
  "visa",
  "car",
  "economy",
  "suv",
  "portrait",
]) {
  const response = await fetch(`${base}/images/${image}.jpg`);
  assert.equal(response.status, 200, image);
  assert.match(response.headers.get("content-type") || "", /image/);
}
const optimized = await fetch(
  `${base}/_next/image?url=%2Fimages%2Fhero.jpg&w=1080&q=75`,
);
assert.equal(optimized.status, 200, "Next.js optimized hero image");
console.log("PASS 15 local photographs and Next.js image optimization");
