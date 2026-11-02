import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Globe2,
  MoveUpRight,
  Star,
} from "lucide-react";
import Photo from "@/components/shared/Photo";
import SectionHeading from "@/components/shared/SectionHeading";
import TravelSearch from "@/components/search/TravelSearch";
import DestinationGrid from "@/components/home/DestinationGrid";
import Testimonials from "@/components/home/Testimonials";
import { ContactForm, Newsletter } from "@/components/shared/Forms";
import { packages, services, values } from "@/data/travel";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-image" data-hero-image>
          <Photo
            src="/images/hero.jpg"
            alt="Sunlit pastel villages overlooking the Mediterranean on Italy’s Cinque Terre coast"
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="hero-eyebrow" data-hero-copy>
            <span /> A WORLD OF POSSIBILITIES. ONE THOUGHTFUL JOURNEY.
          </p>
          <h1>
            <span data-hero-line>Go beyond</span>
            <span data-hero-line>
              the <em>ordinary.</em>
            </span>
          </h1>
          <p className="hero-description" data-hero-copy>
            Find your somewhere. We’ll take care of the journey.
            <br />
            Extraordinary places, thoughtfully brought together.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/destinations" data-hero-cta>
              Explore destinations <ArrowUpRight size={18} />
            </Link>
            <Link className="hero-secondary" href="#services" data-hero-cta>
              Discover our services <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-trust" data-hero-copy>
            <div className="traveler-avatars">
              <span>AK</span>
              <span>SM</span>
              <span>JL</span>
            </div>
            <div>
              <span className="trust-stars">
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
              </span>
              <p>
                Inspired by travelers. Designed for you.
                <span>Illustrative traveler community</span>
              </p>
            </div>
          </div>
        </div>
        <div className="hero-location">
          <span className="location-cross">+</span>
          <div>
            44°07′ N 9°42′ E<strong>Cinque Terre, Italy</strong>
          </div>
          <span className="location-line" />
        </div>
        <a
          href="#search"
          className="hero-scroll"
          aria-label="Scroll to travel search"
        >
          <ArrowDown size={18} />
          <span>YOUR NEXT CHAPTER</span>
        </a>
      </section>
      <div className="container home-search">
        <TravelSearch />
      </div>
      <div className="container">
        <section
          className="stats-strip"
          aria-label="Illustrative agency statistics"
        >
          <div className="stats-intro">
            <Compass size={27} strokeWidth={1.3} />
            <p>
              Big possibilities.
              <br />
              <strong>Personal touches.</strong>
              <span>Illustrative agency figures</span>
            </p>
          </div>
          {[
            { n: 12000, s: "+", label: "Happy travelers" },
            { n: 60, s: "+", label: "Countries to discover" },
            { n: 18000, s: "+", label: "Journeys imagined" },
            { n: 12, s: "", label: "Years of inspiration" },
          ].map((stat) => (
            <div className="stat" key={stat.label}>
              <strong data-counter={stat.n} data-suffix={stat.s}>
                {stat.n.toLocaleString()}
                {stat.s}
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>
      </div>
      <section className="section-space destinations-section" id="destinations">
        <div className="container">
          <SectionHeading
            eyebrow="SOMEWHERE THAT STAYS WITH YOU"
            title={
              <>
                Where will your
                <br />
                <em>curiosity take you?</em>
              </>
            }
            description="Iconic cities. Quiet corners. Places that feel like a different world."
            action={
              <Link className="text-link" href="/destinations">
                All destinations <ArrowUpRight size={18} />
              </Link>
            }
          />
          <DestinationGrid />
          <p className="section-note">
            A little inspiration, with illustrative starting prices per person
            in USD. Final itineraries and prices may vary.
          </p>
        </div>
      </section>
      <section className="section-space services-section" id="services">
        <div className="container">
          <SectionHeading
            eyebrow="THE JOURNEY, BEAUTIFULLY SIMPLIFIED"
            title={
              <>
                You dream it.
                <br />
                <em>We bring it together.</em>
              </>
            }
            description="From the first takeoff to the last scenic detour, every detail has a place."
          />
          <div className="services-grid">
            {services.map((service, index) => (
              <Link
                className="service-card"
                href={`/services/${service.id}`}
                key={service.id}
                data-reveal
              >
                <div className="service-card-top">
                  <service.icon size={28} strokeWidth={1.3} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Check size={13} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <span className="service-link">
                  {service.cta}
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space story-section">
        <div className="container story-layout">
          <div className="story-photo" data-reveal>
            <Photo
              src="/images/stay.jpg"
              alt="Peaceful palm-lined resort pool, surrounded by lush tropical gardens"
            />
            <div className="photo-note">
              <Compass size={25} />
              <span>
                A little less ordinary.
                <br />
                <strong>A lot more you.</strong>
              </span>
            </div>
            <span className="vertical-caption">
              THE BEST JOURNEYS FEEL PERSONAL
            </span>
          </div>
          <div className="story-copy">
            <p className="eyebrow" data-reveal>
              <span />
              MORE THAN A DESTINATION
            </p>
            <h2 data-reveal>
              Travel well.
              <br />
              <em>Feel everything.</em>
            </h2>
            <p className="story-intro" data-reveal>
              We believe a great journey isn’t measured in miles. It’s measured
              in moments.
            </p>
            <p className="muted" data-reveal>
              A sunrise you didn’t plan for. A street you got happily lost in. A
              place that felt like it was waiting just for you. That’s the kind
              of travel we’re here to imagine.
            </p>
            <div className="value-list">
              {values.slice(0, 3).map((value) => (
                <div key={value.title} data-reveal>
                  <value.icon size={23} strokeWidth={1.4} />
                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="text-link" data-reveal>
              Get to know Elsewhere <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space packages-section" id="journeys">
        <div className="container">
          <SectionHeading
            eyebrow="LESS PLANNING. MORE LIVING."
            title={
              <>
                Extraordinary escapes,
                <br />
                <em>already imagined.</em>
              </>
            }
            description="A few of our favorite ways to get away. Make one your own."
            action={
              <Link
                className="text-link"
                href="/contact?subject=Create%20a%20tailored%20journey"
              >
                Tailor my journey <ArrowUpRight size={18} />
              </Link>
            }
          />
          <div className="package-grid">
            {packages.map((item) => (
              <article className="package-card" key={item.name} data-reveal>
                <Link
                  href={`/contact?subject=${encodeURIComponent(item.name + " package inquiry")}`}
                  className="package-photo"
                  aria-label={`Explore ${item.name}`}
                >
                  <Photo
                    src={item.image}
                    alt={`${item.destination} holiday inspiration`}
                  />
                  <span className="package-destination">
                    <Globe2 size={13} />
                    {item.destination}
                  </span>
                  <span className="rating">
                    <Star size={12} fill="currentColor" />
                    {item.rating} · Sample
                  </span>
                </Link>
                <div className="package-body">
                  <p className="eyebrow">{item.duration}</p>
                  <h3>{item.name}</h3>
                  <p>{item.includes}</p>
                  <div className="package-bottom">
                    <div>
                      <span>Illustrative, from</span>
                      <strong>
                        ${item.price.toLocaleString()}
                        <small> / person</small>
                      </strong>
                    </div>
                    <Link
                      className="round-button"
                      href={`/contact?subject=${encodeURIComponent(item.name + " package inquiry")}`}
                      aria-label={`Inquire about ${item.name}`}
                    >
                      <MoveUpRight size={19} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <section className="section-space tinted-section">
        <div className="container contact-layout">
          <div>
            <p className="eyebrow" data-reveal>
              <span />
              YOUR NEXT CHAPTER STARTS HERE
            </p>
            <h2 data-reveal>
              A little curiosity.
              <br />
              <em>A world of possibilities.</em>
            </h2>
            <p className="section-description">
              Tell us what you’re dreaming of. A faraway favorite, an open-road
              adventure, or simply a change of scenery.
            </p>
            <div className="home-contact-details">
              <p>hello@elsewhere.example</p>
              <p>+1 (202) 555-0147</p>
              <p>24 Explorer Lane, London, UK</p>
              <span className="demo-label">
                Sample contact information · No physical office or monitored
                inbox
              </span>
            </div>
            <Link href="/contact" className="text-link">
              More ways to say hello <ArrowUpRight size={17} />
            </Link>
          </div>
          <ContactForm initialSubject="My next journey" />
        </div>
      </section>
      <section className="newsletter-section">
        <div className="container newsletter-layout">
          <div>
            <p className="eyebrow">
              <span />
              KEEP YOUR CURIOSITY CLOSE
            </p>
            <h2>
              Your next great story
              <br />
              <em>could start in your inbox.</em>
            </h2>
          </div>
          <div>
            <p>
              A little travel inspiration. A few places worth dreaming about.
              <br />
              An occasional nudge to go somewhere new.
            </p>
            <Newsletter />
          </div>
        </div>
      </section>
      <section className="closing-note container">
        <span>THE WORLD IS WAITING.</span>
        <Link href="/contact">
          Let’s find your <em>elsewhere.</em>
          <ArrowUpRight />
        </Link>
      </section>
    </>
  );
}
