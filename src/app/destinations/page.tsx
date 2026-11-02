import type { Metadata } from "next";
import DestinationGrid from "@/components/home/DestinationGrid";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Find your next somewhere: Maldives, Istanbul, Dubai, Paris, Tokyo, and London. Explore illustrative journeys and travel inspiration.",
};
export default function Destinations() {
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow" data-hero-copy>
          <span />
          FOLLOW YOUR CURIOSITY
        </p>
        <h1 data-hero-line>
          A world to discover.
          <br />
          <em>A somewhere for you.</em>
        </h1>
        <p data-hero-copy>
          From familiar favorites to beautiful firsts. Find the place that
          speaks to you.
        </p>
      </section>
      <section className="container destination-index">
        <DestinationGrid all />
        <p className="section-note">
          All prices are illustrative starting prices in USD per person.
          Flights, taxes, dates, and exact inclusions require a personalized
          itinerary.
        </p>
      </section>
      <section className="service-bottom-cta">
        <div className="container">
          <div>
            <p className="eyebrow">YOUR MAP DOESN’T END HERE</p>
            <h2>
              Dreaming of <em>somewhere else?</em>
            </h2>
          </div>
          <Link
            className="button"
            href="/contact?subject=Tailored%20destination%20inquiry"
          >
            Let’s find it together <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
