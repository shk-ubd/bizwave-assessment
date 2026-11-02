import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Photo from "@/components/shared/Photo";
import { destinations } from "@/data/travel";
export default function DestinationGrid({ all = false }: { all?: boolean }) {
  return (
    <div className={`destination-grid ${all ? "all-destinations" : ""}`}>
      {destinations.slice(0, all ? 6 : 4).map((destination, index) => (
        <Link
          href={`/destinations/${destination.slug}`}
          className={`destination-card destination-${index}`}
          key={destination.slug}
          data-reveal
        >
          <Photo
            src={destination.image}
            alt={`${destination.name}, ${destination.country}`}
            sizes={
              all
                ? "(max-width: 650px) 100vw, 50vw"
                : "(max-width: 650px) 100vw, (max-width: 1023px) 50vw, 40vw"
            }
          />
          <span className="destination-tag">{destination.tag}</span>
          <div className="destination-caption">
            <div>
              <span className="destination-country">{destination.country}</span>
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
            </div>
            <span className="round-button">
              <ArrowUpRight size={21} />
            </span>
          </div>
          <span className="destination-price">
            From ${destination.price.toLocaleString()}{" "}
            <span>/ person · sample</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
