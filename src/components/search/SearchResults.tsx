"use client";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Plane,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { flights, hotels, cars, type ServiceKey } from "@/data/travel";
import type { SearchValues } from "@/lib/validations";
import Photo from "@/components/shared/Photo";
type Props = {
  active: ServiceKey;
  query: SearchValues;
  filter: string;
  setFilter: (value: string) => void;
  openDetail: (name: string) => void;
};
export default function SearchResults({
  active,
  query,
  filter,
  setFilter,
  openDetail,
}: Props) {
  const visibleCars = cars.filter(
    (car) =>
      (query?.category === "Any" ||
        !query ||
        car.category === query.category) &&
      (filter === "All" || car.category === filter),
  );

  return (
    <div className="results-panel">
      <div className="results-heading">
        <div>
          <p className="eyebrow">YOUR NEXT POSSIBILITY</p>
          <h3>
            {active === "visa" ? "Visa guidance" : "Sample " + active} for{" "}
            {query.destination}
          </h3>
          <p>
            Illustrative options only. Prices, routes, availability, and ratings
            are sample data.
          </p>
        </div>
        {active === "cars" && (
          <label className="result-filter">
            <SlidersHorizontal size={16} />
            <span className="sr-only">Filter car category</span>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              {["All", "Economy", "Luxury", "SUV"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      {active === "flights" && (
        <>
          <p className="result-summary">
            {query.origin} → {query.destination} · {query.start} to {query.end}{" "}
            · {query.travelers} traveler(s) · {query.category}. Prices below are
            per person, one way; return itinerary is not quoted.
          </p>
          {flights.map((flight) => (
            <article className="flight-result" key={flight.id}>
              <div className="airline-icon">
                <Plane size={24} />
              </div>
              <div>
                <h4>{flight.name}</h4>
                <span>{flight.code} · Sample airline itinerary</span>
              </div>
              <div>
                <strong>{flight.time}</strong>
                <span>
                  {flight.duration} · {flight.detail}
                </span>
              </div>
              <div className="result-price">
                <strong>${flight.price}</strong>
                <span>per person, one way</span>
              </div>
              <button
                className="button button-dark small"
                onClick={() =>
                  openDetail(
                    `${flight.name} · ${query.origin} to ${query.destination} · ${query.category} · ${query.travelers} traveler(s) · ${query.start} to ${query.end}`,
                  )
                }
              >
                View itinerary <ArrowUpRight size={15} />
              </button>
            </article>
          ))}
        </>
      )}
      {active === "hotels" && (
        <>
          <p className="result-summary">
            {query.start} to {query.end} · {query.travelers} guest(s) ·{" "}
            {query.rooms} room(s). Sample properties are illustrative and are
            not matched to a real destination.
          </p>
          <div className="listing-grid">
            {hotels.map((hotel) => (
              <article key={hotel.id} className="listing-card">
                <div className="listing-photo">
                  <Photo
                    src={hotel.image}
                    alt={`Illustrative ${hotel.name} accommodation`}
                  />
                  <span className="rating">
                    <Star size={12} fill="currentColor" />
                    {hotel.rating} · Sample
                  </span>
                </div>
                <div className="listing-body">
                  <p className="eyebrow">{hotel.location}</p>
                  <h4>{hotel.name}</h4>
                  <p>{hotel.detail}</p>
                  <div>
                    <span>
                      <strong>${hotel.price}</strong> / room / night
                    </span>
                    <button
                      className="round-button"
                      onClick={() =>
                        openDetail(
                          `${hotel.name} · ${query.destination} · ${query.rooms} room(s) · ${query.travelers} guest(s) · ${query.start} to ${query.end}`,
                        )
                      }
                      aria-label={`View ${hotel.name} details`}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
      {active === "cars" && (
        <>
          <p className="result-summary">
            {query.origin} → {query.destination} · {query.start} to {query.end}{" "}
            · {query.category} vehicle. Rental prices are per day; taxes and
            extras are not included.
          </p>
          <div className="listing-grid">
            {visibleCars.map((car) => (
              <article className="listing-card" key={car.id}>
                <div className="listing-photo">
                  <Photo
                    src={car.image}
                    alt={`Illustrative ${car.category.toLowerCase()} rental vehicle`}
                  />
                </div>
                <div className="listing-body">
                  <p className="eyebrow">{car.category}</p>
                  <h4>{car.name}</h4>
                  <p>{car.detail}</p>
                  <div>
                    <span>
                      <strong>${car.price}</strong> / day
                    </span>
                    <button
                      className="round-button"
                      onClick={() =>
                        openDetail(
                          `${car.name} · ${query.origin} to ${query.destination} · ${query.start} to ${query.end}`,
                        )
                      }
                      aria-label={`View ${car.name} details`}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!visibleCars.length && (
            <div className="empty-panel">
              <h4>No sample cars match that filter.</h4>
              <button className="text-link" onClick={() => setFilter("All")}>
                Reset filter <ArrowRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
      {active === "visa" && (
        <div className="visa-result">
          <span className="success-icon">
            <Check />
          </span>
          <div>
            <h4>
              {query.category} visa inquiry · {query.destination}
            </h4>
            <p>
              Nationality: {query.origin} · Intended travel: {query.start}.
              Explore a sample checklist and ask about your plans. Eligibility,
              official requirements, and processing times are not determined by
              this demo.
            </p>
            <Link
              className="text-link"
              href={`/contact?subject=${encodeURIComponent(`${query.category} visa · ${query.origin} to ${query.destination} · ${query.start}`)}`}
            >
              Start a demo inquiry <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
