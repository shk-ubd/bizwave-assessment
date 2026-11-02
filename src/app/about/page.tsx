import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import Photo from "@/components/shared/Photo";
import SectionHeading from "@/components/shared/SectionHeading";
import { values } from "@/data/travel";
export const metadata: Metadata = {
  title: "Our story",
  description:
    "Meet Elsewhere, an illustrative travel brand built around curiosity, thoughtful details, and a more personal approach to exploring the world.",
};
export default function About() {
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow" data-hero-copy>
          <span />A LITTLE ABOUT ELSEWHERE
        </p>
        <h1 data-hero-line>
          We’re here for
          <br />
          <em>the feeling of going.</em>
        </h1>
        <p data-hero-copy>
          That first glimpse of somewhere new. That moment the everyday falls
          away.
          <br />
          That’s what we believe travel should feel like.
        </p>
      </section>
      <section className="container about-wide-photo">
        <Photo
          src="/images/hero.jpg"
          alt="Mediterranean coastal village full of color and possibility"
          priority
          sizes="100vw"
        />
        <span>Life looks a little different from here.</span>
      </section>
      <section className="section-space container about-manifesto">
        <p className="eyebrow">OUR POINT OF VIEW</p>
        <div>
          <h2>
            The world is extraordinary.
            <br />
            <em>Your journey should be, too.</em>
          </h2>
          <p>
            Elsewhere is a concept travel brand for people who care as much
            about how a journey feels as where it takes them. We bring flights,
            stays, visa guidance, and car rental inspiration into one considered
            experience.
          </p>
          <p>
            Our mission is simple: make the idea of going feel a little easier,
            and the experience feel a little more personal. Our vision is a
            world explored with curiosity, care, and respect for the people and
            places we meet.
          </p>
          <p className="demo-label">
            This is a portfolio demonstration. Elsewhere is not an operating
            agency. All profiles, statistics, reviews, and offers are
            illustrative.
          </p>
        </div>
      </section>
      <section className="section-space tinted-section">
        <div className="container">
          <SectionHeading
            eyebrow="THE DETAILS MAKE THE DIFFERENCE"
            title={
              <>
                Thoughtful by nature.
                <br />
                <em>Personal by design.</em>
              </>
            }
          />
          <div className="values-grid">
            {values.map((value) => (
              <article key={value.title} data-reveal>
                <value.icon size={29} strokeWidth={1.4} />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space container">
        <SectionHeading
          eyebrow="PEOPLE WITH A SENSE OF POSSIBILITY"
          title={
            <>
              The humans behind
              <br />
              <em>the happy detours.</em>
            </>
          }
          description="Sample team profiles, created to illustrate the Elsewhere brand."
        />
        <div className="team-grid">
          {[
            {
              name: "Maya Bennett",
              role: "Journey designer",
              initials: "MB",
              text: "Collector of coastal walks and neighborhood cafés.",
            },
            {
              name: "Adam Rahman",
              role: "Travel experience lead",
              initials: "AR",
              text: "Always looking for the scenic route home.",
            },
            {
              name: "Sophie Laurent",
              role: "Destination specialist",
              initials: "SL",
              text: "Believes the best itinerary leaves room for surprise.",
            },
          ].map((person, index) => (
            <article key={person.name} data-reveal>
              <div className={`team-avatar team-${index}`}>
                <Compass size={70} strokeWidth={0.7} />
                <span>{person.initials}</span>
              </div>
              <p className="eyebrow">{person.role} · Sample profile</p>
              <h3>{person.name}</h3>
              <p>{person.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="service-bottom-cta">
        <div className="container">
          <div>
            <p className="eyebrow">GOOD THINGS START WITH CURIOSITY</p>
            <h2>
              Come find <em>your elsewhere.</em>
            </h2>
          </div>
          <Link href="/#services" className="button">
            Explore our services <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
