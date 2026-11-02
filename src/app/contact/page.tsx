import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/shared/Forms";
import FAQ from "@/components/shared/FAQ";
import SectionHeading from "@/components/shared/SectionHeading";
export const metadata: Metadata = {
  title: "Let’s talk travel",
  description:
    "Tell us about your next great journey through Elsewhere’s validated demonstration contact form. Sample contact details; no external messages are sent.",
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow" data-hero-copy>
          <span />
          IT STARTS WITH A HELLO
        </p>
        <h1 data-hero-line>
          Big plans.
          <br />
          <em>Little questions. Let’s talk.</em>
        </h1>
        <p data-hero-copy>
          Your next adventure doesn’t need to be fully figured out.
          <br />A little curiosity is a very good place to start.
        </p>
      </section>
      <section className="container contact-page-layout">
        <aside className="contact-information">
          <p className="eyebrow">FIND US HERE · SAMPLE INFORMATION</p>
          <h2>
            A human touch,
            <br />
            <em>from the start.</em>
          </h2>
          <div className="contact-detail">
            <Mail size={20} />
            <div>
              <strong>Drop a little hello</strong>
              <span>hello@elsewhere.example</span>
              <small>Reserved example address · Not monitored</small>
            </div>
          </div>
          <div className="contact-detail">
            <Phone size={20} />
            <div>
              <strong>Talk travel</strong>
              <span>+1 (202) 555-0147</span>
              <small>Fictional demonstration number</small>
            </div>
          </div>
          <div className="contact-detail">
            <MapPin size={20} />
            <div>
              <strong>A place to dream</strong>
              <span>24 Explorer Lane, London, UK</span>
              <small>Illustrative address · No physical office</small>
            </div>
          </div>
          <div className="contact-detail">
            <Clock size={20} />
            <div>
              <strong>Imagined office hours</strong>
              <span>Mon – Fri, 9:00 – 18:00</span>
              <small>Sample schedule, London time</small>
            </div>
          </div>
          <div
            className="office-map"
            aria-label="Illustrative map graphic, not a real office location"
          >
            <div className="map-road road-one" />
            <div className="map-road road-two" />
            <div className="map-road road-three" />
            <span>
              <MapPin size={29} />
              <strong>A world of possibilities.</strong>
              <small>Illustrative office location</small>
            </span>
          </div>
        </aside>
        <div className="contact-form-panel">
          <p className="eyebrow">TELL US A LITTLE ABOUT YOUR PLANS</p>
          <h2>
            Where to <em>next?</em>
          </h2>
          <ContactForm
            initialSubject={
              typeof subject === "string" ? subject.slice(0, 250) : ""
            }
          />
        </div>
      </section>
      <section className="section-space container">
        <SectionHeading
          eyebrow="A FEW THINGS YOU MIGHT WONDER"
          title={
            <>
              Before we <em>say hello.</em>
            </>
          }
        />
        <FAQ
          items={[
            {
              question: "Can I actually book travel on this website?",
              answer:
                "This is a frontend demonstration. Search results, prices, ratings, and availability are illustrative. No booking, visa application, payment, or external submission takes place.",
            },
            {
              question: "What happens when I submit the contact form?",
              answer:
                "The form validates your details and shows a simulated success state. The information stays in your browser memory and is not sent to a server, stored, or emailed.",
            },
            {
              question: "Can I explore all four services?",
              answer:
                "Yes. Flight, hotel, visa, and car pages each include a working demo search. You can compare illustrative options and open a prefilled inquiry without making a real booking.",
            },
            {
              question: "Are the displayed prices and reviews real?",
              answer:
                "No. All pricing, star ratings, traveler stories, team profiles, statistics, and business contact details are sample content created for this demonstration.",
            },
          ]}
        />
        <div className="contact-end">
          <p>Still curious? Discover what’s possible.</p>
          <Link className="text-link" href="/destinations">
            Explore destinations <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
