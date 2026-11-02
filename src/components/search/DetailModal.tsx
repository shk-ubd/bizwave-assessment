"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
export default function DetailModal({
  selected,
  closeDetail,
  uid,
}: {
  selected: string;
  closeDetail: () => void;
  uid: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDetail();
      }}
    >
      <section
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-detail-title`}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeDetail();
          if (event.key === "Tab") {
            const focusable =
              event.currentTarget.querySelectorAll<HTMLElement>(
                "button,a[href]",
              );
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }
        }}
      >
        <button
          ref={closeRef}
          className="modal-close round-button"
          aria-label="Close details"
          onClick={closeDetail}
        >
          <X size={20} />
        </button>
        <p className="eyebrow">A CLOSER LOOK</p>
        <h3 id={`${uid}-detail-title`}>{selected}</h3>
        <p>
          Explore this illustrative option with a personalized inquiry. All
          imagery and specifications are representative; availability and final
          prices are not confirmed.
        </p>
        <ul>
          <li>Flexible options to discuss</li>
          <li>Sample pricing in US dollars</li>
          <li>No payment or reservation is made</li>
        </ul>
        <Link
          className="button button-dark"
          href={`/contact?subject=${encodeURIComponent(selected)}`}
          onClick={closeDetail}
        >
          Make a demo inquiry <ArrowUpRight size={17} />
        </Link>
      </section>
    </div>
  );
}
