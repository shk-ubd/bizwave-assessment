"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/travel";
import Photo from "@/components/shared/Photo";
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];
  return (
    <section className="testimonials section-space">
      <div className="container testimonial-layout" data-reveal>
        <div>
          <p className="eyebrow">
            <span />
            THE STORIES WE TRAVEL FOR
          </p>
          <h2>
            Good journeys.
            <br />
            <em>Even better memories.</em>
          </h2>
          <p className="section-description">
            A glimpse of what a thoughtful travel experience can feel like.
          </p>
          <p className="demo-label">
            Illustrative stories · Sample profiles & testimonials
          </p>
          <div className="carousel-controls">
            <button
              className="round-button"
              aria-label="Previous sample testimonial"
              onClick={() => setIndex((index + 2) % 3)}
            >
              <ArrowLeft size={19} />
            </button>
            <button
              className="round-button"
              aria-label="Next sample testimonial"
              onClick={() => setIndex((index + 1) % 3)}
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
        <div
          className="testimonial-card"
          aria-roledescription="carousel"
          aria-label="Sample traveler stories"
        >
          <Quote className="quote-icon" size={36} strokeWidth={1} />
          <div key={index} className="testimonial-content" aria-live="polite">
            <div className="stars" aria-label="Sample rating: 5 out of 5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <blockquote>“{item.quote}”</blockquote>
            <div className="testimonial-person">
              <div className="avatar">
                <Photo
                  src={item.image}
                  alt={`Illustrative portrait for ${item.name}`}
                  sizes="48px"
                />
              </div>
              <div>
                <strong>{item.name}</strong>
                <span>{item.country} · Sample traveler</span>
              </div>
            </div>
            <p className="testimonial-trip">{item.trip}</p>
          </div>
          <div className="carousel-dots">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.name}
                aria-label={`Show sample story ${i + 1}`}
                aria-pressed={index === i}
                className={index === i ? "active" : ""}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
