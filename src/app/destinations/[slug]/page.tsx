import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, Clock, Compass, MapPin } from "lucide-react";
import { destinations } from "@/data/travel";
import Photo from "@/components/shared/Photo";
import TravelSearch from "@/components/search/TravelSearch";
const guides: Record<
  string,
  { season: string; duration: string; moments: string[]; story: string }
> = {
  maldives: {
    season: "November to April inspiration",
    duration: "5–7 nights",
    moments: [
      "Slow mornings beside the lagoon",
      "Coral-colored sunsets and ocean breezes",
      "A day left beautifully unplanned",
    ],
    story:
      "There’s a certain kind of quiet you only find by the ocean. Let the days unfold between turquoise water, soft white sand, and the luxury of having nowhere else to be.",
  },
  istanbul: {
    season: "Spring & autumn inspiration",
    duration: "4–6 nights",
    moments: [
      "A ferry ride across the Bosphorus",
      "Neighborhood cafés and lively bazaars",
      "Historic skylines in the evening light",
    ],
    story:
      "Istanbul rewards the curious. Cross the water, follow the scent of fresh bread, and let a city of layers reveal itself one neighborhood at a time.",
  },
  dubai: {
    season: "November to March inspiration",
    duration: "4–5 nights",
    moments: [
      "Old Dubai and creek-side discoveries",
      "An evening among the desert dunes",
      "Skyline views and long beach mornings",
    ],
    story:
      "Look beyond the skyline and find a city of contrasts: old trading lanes, serene desert landscapes, contemporary design, and the warm rhythm of the Gulf.",
  },
  paris: {
    season: "Spring & autumn inspiration",
    duration: "4–6 nights",
    moments: [
      "Unhurried walks along the Seine",
      "Small galleries and neighborhood bakeries",
      "An evening when the city lights up",
    ],
    story:
      "Paris is best discovered slowly. Make room for the little things: a quiet courtyard, a perfect pastry, a bridge that gives you a whole new view of the city.",
  },
  tokyo: {
    season: "Spring & autumn inspiration",
    duration: "6–8 nights",
    moments: [
      "Side-street eateries and tiny cafés",
      "Temples, gardens, and quiet rituals",
      "Neon-lit nights in the city",
    ],
    story:
      "A city that moves fast and notices everything. Find your own rhythm between meticulous gardens, extraordinary food, and neighborhoods with worlds of their own.",
  },
  london: {
    season: "Late spring to early autumn inspiration",
    duration: "4–6 nights",
    moments: [
      "Markets, museums, and riverside walks",
      "Leafy parks and neighborhood pubs",
      "Theatre evenings and timeless streets",
    ],
    story:
      "Come for the landmarks. Stay for the neighborhoods. London offers a new story around every corner, from quiet garden squares to the energy of its markets.",
  },
};
export const dynamicParams = false;
export function generateStaticParams() {
  return destinations.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = destinations.find((destination) => destination.slug === slug);
  return {
    title: item ? `${item.name} travel inspiration` : "Destination",
    description: item?.description,
  };
}
export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = destinations.find((destination) => destination.slug === slug);
  if (!item) notFound();
  const guide = guides[slug];
  return (
    <>
      <section className="destination-detail-hero">
        <Photo
          src={item.image}
          alt={`${item.name}, ${item.country} travel landscape`}
          priority
          sizes="100vw"
        />
        <div className="container">
          <Link href="/destinations" className="back-link">
            ← All destinations
          </Link>
          <p className="eyebrow">{item.country}</p>
          <h1 data-hero-line>
            {item.name}
            <em> awaits.</em>
          </h1>
          <p>{item.description}</p>
        </div>
      </section>
      <section className="section-space container destination-story">
        <div>
          <p className="eyebrow">
            <span />A PLACE TO FEEL SOMETHING
          </p>
          <h2>
            Find your own
            <br />
            <em>kind of {item.name}.</em>
          </h2>
          <p>{guide.story}</p>
          <ul className="destination-moments">
            {guide.moments.map((moment) => (
              <li key={moment}>
                <Check size={17} />
                {moment}
              </li>
            ))}
          </ul>
        </div>
        <aside className="trip-summary">
          <Compass size={29} />
          <h3>A journey, imagined.</h3>
          <p>
            <MapPin size={17} />
            {item.name}, {item.country}
          </p>
          <p>
            <Clock size={17} />
            {guide.duration} · Suggested length
          </p>
          <p>{guide.season}</p>
          <strong>
            From ${item.price.toLocaleString()}
            <small> / person · Indicative example</small>
          </strong>
          <Link
            href={`/contact?subject=${encodeURIComponent("My " + item.name + " journey")}`}
            className="button button-dark"
          >
            Plan my journey <ArrowUpRight size={17} />
          </Link>
          <span className="fine-print">
            Illustrative land package starting point. No live availability. No
            reservation or payment.
          </span>
        </aside>
      </section>
      <section className="section-space tinted-section">
        <div className="container">
          <div className="inline-heading">
            <h2>
              A stay in <em>{item.name}.</em>
            </h2>
            <p>Discover sample accommodation options for your journey.</p>
          </div>
          <TravelSearch initialService="hotels" fixed destination={item.name} />
        </div>
      </section>
    </>
  );
}
