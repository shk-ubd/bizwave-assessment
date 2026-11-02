import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  MessageCircle,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Brand } from "./Navbar";
import { Newsletter } from "@/components/shared/Forms";
import { services, destinations } from "@/data/travel";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>
              For the places you’ve always dreamed of.
              <br />
              And the ones you haven’t found yet.
            </p>
            <div className="socials">
              <Link
                href="/contact?subject=Instagram%20social%20profile%20inquiry"
                aria-label="Ask about our sample Instagram profile"
              >
                <Camera size={18} />
              </Link>
              <Link
                href="/contact?subject=Facebook%20social%20profile%20inquiry"
                aria-label="Ask about our sample Facebook profile"
              >
                <MessageCircle size={18} />
              </Link>
              <Link
                href="/contact?subject=Social%20channels"
                aria-label="Contact us about social channels"
              >
                <ArrowUpRight size={19} />
              </Link>
            </div>
            <span className="fine-print">
              Social profiles are illustrative; links open an inquiry.
            </span>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/about">Our story</Link>
            <Link href="/destinations">Destinations</Link>
            <Link href="/#journeys">Curated journeys</Link>
            <Link href="/contact">Get in touch</Link>
          </div>
          <div>
            <h3>Your journey</h3>
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                {service.name}
              </Link>
            ))}
          </div>
          <div>
            <h3>Somewhere special</h3>
            {destinations.slice(0, 4).map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
              >
                {destination.name}
              </Link>
            ))}
          </div>
          <div className="footer-newsletter">
            <h3>A little wanderlust, delivered.</h3>
            <Newsletter compact />
            <p className="footer-contact">
              <Mail size={14} /> hello@elsewhere.example
            </p>
            <p className="footer-contact">
              <Phone size={14} /> +1 (202) 555-0147
            </p>
            <p className="footer-contact">
              <MapPin size={14} /> 24 Explorer Lane, London · Sample office
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Elsewhere Travel. A thoughtfully
            crafted demo.
          </p>
          <div>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
            <span>
              Made for the way you travel <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
