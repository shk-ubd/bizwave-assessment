import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  FileCheck,
  Files,
  Headphones,
  Luggage,
  Plane,
  Compass,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  services,
  visaCountries,
  visaFaqs,
  type ServiceKey,
} from "@/data/travel";
import Photo from "@/components/shared/Photo";
import TravelSearch from "@/components/search/TravelSearch";
import SectionHeading from "@/components/shared/SectionHeading";
import FAQ from "@/components/shared/FAQ";
import { ContactForm } from "@/components/shared/Forms";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((service) => ({ service: service.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: key } = await params;
  const service = services.find((item) => item.id === key);
  return {
    title: service?.name || "Services",
    description: service?.description,
  };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: key } = await params;
  const service = services.find((item) => item.id === key);
  if (!service) notFound();
  return (
    <>
      <section className={`service-hero service-hero-${key}`}>
        <div className="container service-hero-layout">
          <div>
            <div className="breadcrumbs">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>{service.name}</span>
            </div>
            <p className="eyebrow" data-hero-copy>
              <service.icon size={16} />
              {service.name.toUpperCase()}
            </p>
            <h1 data-hero-line>{service.title}</h1>
            <p className="service-intro" data-hero-copy>
              {service.description}
            </p>
            <div className="service-assurances" data-hero-cta>
              {service.bullets.map((bullet) => (
                <span key={bullet}>
                  <Check size={14} />
                  {bullet}
                </span>
              ))}
            </div>
            <span className="demo-label">
              Interactive demonstration · No live booking or application
              processing
            </span>
          </div>
          <div className="service-hero-photo" data-hero-image>
            <Photo
              src={service.image}
              alt={`${service.name} travel inspiration`}
              priority
            />
            <span className="image-stamp">
              A LITTLE FURTHER.
              <br />
              <em>A little freer.</em>
            </span>
          </div>
        </div>
      </section>
      <section className="container service-search-section">
        <div className="inline-heading">
          <h2>
            {key === "visa"
              ? "Where are you headed?"
              : key === "cars"
                ? "Your road, your rules."
                : key === "hotels"
                  ? "Check in to somewhere special."
                  : "Find your next takeoff."}
          </h2>
          <p>Explore illustrative options. All prices in USD.</p>
        </div>
        <TravelSearch initialService={key as ServiceKey} fixed />
      </section>
      {key === "visa" ? (
        <>
          <section className="section-space">
            <div className="container">
              <SectionHeading
                eyebrow="A LITTLE CLARITY GOES A LONG WAY"
                title={
                  <>
                    A world of reasons
                    <br />
                    <em>to go.</em>
                  </>
                }
                description="Explore sample inquiry categories. Official eligibility is always determined by the destination authority."
              />
              <div className="visa-category-grid">
                {[
                  {
                    name: "Tourist",
                    text: "For new horizons, old favorites, and time away.",
                  },
                  {
                    name: "Business",
                    text: "For meetings, professional visits, and new possibilities.",
                  },
                  {
                    name: "Study",
                    text: "For a new chapter of learning and discovery.",
                  },
                  {
                    name: "Family visit",
                    text: "For the people who make a place feel like home.",
                  },
                ].map((item, index) => (
                  <Link
                    href={`/contact?subject=${encodeURIComponent(item.name + " visa inquiry")}`}
                    className="category-card"
                    key={item.name}
                    data-reveal
                  >
                    <span>0{index + 1}</span>
                    <Files size={26} />
                    <h3>{item.name}</h3>
                    <p>{item.text}</p>
                    <ArrowUpRight size={20} />
                  </Link>
                ))}
              </div>
              <div className="country-pills">
                {visaCountries.map((country) => (
                  <Link
                    href={`/contact?subject=${encodeURIComponent("Visa guidance for " + country)}`}
                    key={country}
                  >
                    {country}
                    <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <section className="section-space tinted-section">
            <div className="container process-layout">
              <div>
                <p className="eyebrow">PREPARED FOR WHAT’S NEXT</p>
                <h2>
                  One step closer.
                  <br />
                  <em>One detail at a time.</em>
                </h2>
                <p className="section-description">
                  A sample preparation journey. No applications are submitted
                  through this site.
                </p>
                <ol className="process-list">
                  {[
                    "Tell us where you want to go",
                    "Review the official requirements",
                    "Prepare your supporting documents",
                    "Apply through the official channel",
                  ].map((step, index) => (
                    <li key={step}>
                      <span>0{index + 1}</span>
                      <h3>{step}</h3>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="document-panel">
                <FileCheck size={30} />
                <h3>A starting-point checklist</h3>
                <p>
                  Illustrative only. Check the relevant government or consulate
                  for current, nationality-specific requirements.
                </p>
                <ul>
                  {[
                    "Valid passport & identity information",
                    "Recent passport-style photographs",
                    "Travel itinerary & accommodation",
                    "Financial and employment evidence",
                    "Category-specific supporting documents",
                  ].map((item) => (
                    <li key={item}>
                      <Check size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="section-space container">
            <SectionHeading
              eyebrow="GOOD QUESTIONS, CLEAR ANSWERS"
              title={
                <>
                  Before you <em>begin.</em>
                </>
              }
            />
            <FAQ items={visaFaqs} />
          </section>
          <section className="section-space tinted-section">
            <div className="container contact-layout">
              <div>
                <p className="eyebrow">LET’S TALK ABOUT YOUR PLANS</p>
                <h2>
                  The first step
                  <br />
                  <em>is a conversation.</em>
                </h2>
                <p className="section-description">
                  Use this demo inquiry to explore how a visa assistance
                  conversation might begin.
                </p>
              </div>
              <ContactForm initialSubject="Visa services inquiry" />
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="section-space">
            <div className="container">
              <SectionHeading
                eyebrow={
                  key === "flights"
                    ? "A SMOOTHER WAY TO GO"
                    : key === "hotels"
                      ? "MORE THAN A ROOM"
                      : "FREEDOM COMES STANDARD"
                }
                title={
                  key === "flights" ? (
                    <>
                      Every great story
                      <br />
                      <em>starts with a departure.</em>
                    </>
                  ) : key === "hotels" ? (
                    <>
                      Find a place
                      <br />
                      <em>that feels like you.</em>
                    </>
                  ) : (
                    <>
                      Leave room
                      <br />
                      <em>for the unexpected.</em>
                    </>
                  )
                }
              />
              <div className={`service-feature-layout feature-${key}`}>
                <div className="service-feature-photo">
                  <Photo
                    src={
                      key === "flights"
                        ? "/images/hero.jpg"
                        : key === "hotels"
                          ? "/images/stay.jpg"
                          : "/images/suv.jpg"
                    }
                    alt={
                      key === "flights"
                        ? "Colorful Mediterranean seaside escape"
                        : key === "hotels"
                          ? "Tropical resort and tranquil pool"
                          : "Road-ready SUV in a scenic setting"
                    }
                  />
                </div>
                <div className="service-features">
                  {(key === "flights"
                    ? [
                        {
                          icon: Plane,
                          title: "More ways to get there",
                          text: "Compare illustrative airline itineraries, departure times, stopovers, and fare examples.",
                        },
                        {
                          icon: Luggage,
                          title: "A cabin for your kind of journey",
                          text: "Choose economy, premium economy, business, or first class for your inquiry.",
                        },
                        {
                          icon: Headphones,
                          title: "Help with the details",
                          text: "Take your selected itinerary into a personalized demo inquiry, without committing to a purchase.",
                        },
                      ]
                    : key === "hotels"
                      ? [
                          {
                            icon: Sparkles,
                            title: "A stay with a story",
                            text: "Explore representative boutique residences, classic hotels, and oceanfront retreats.",
                          },
                          {
                            icon: ShieldCheck,
                            title: "Room for everyone",
                            text: "Choose guest and room counts, compare sample amenities, and view details before inquiring.",
                          },
                          {
                            icon: Headphones,
                            title: "The details that matter",
                            text: "All property names, ratings, and rates are illustrative. No rooms are reserved on this demo.",
                          },
                        ]
                      : [
                          {
                            icon: Compass,
                            title: "Your pace. Your path.",
                            text: "Pick your locations and dates, then explore illustrative economy, luxury, and SUV options.",
                          },
                          {
                            icon: ShieldCheck,
                            title: "The right fit for the road",
                            text: "Compare sample seating, luggage capacity, transmission, and daily rental prices.",
                          },
                          {
                            icon: Headphones,
                            title: "A thoughtful starting point",
                            text: "Rental terms, driver eligibility, insurance, deposits, and availability must be confirmed with a real provider.",
                          },
                        ]
                  ).map((item) => (
                    <div key={item.title} data-reveal>
                      <item.icon size={26} strokeWidth={1.3} />
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="service-bottom-cta">
            <div className="container">
              <div>
                <p className="eyebrow">SOMETHING A LITTLE MORE PERSONAL?</p>
                <h2>
                  Let’s make it <em>your journey.</em>
                </h2>
              </div>
              <Link
                className="button"
                href={`/contact?subject=${encodeURIComponent(service.name + " personalized inquiry")}`}
              >
                Talk travel with us <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
