"use client";
import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export default function AnimationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-hero-image]", { scale: 1.08, duration: 1.8 })
          .from(
            "[data-hero-line]",
            { y: 45, opacity: 0, stagger: 0.12, duration: 1 },
            0.15,
          )
          .from("[data-hero-copy]", { y: 20, opacity: 0, duration: 0.8 }, 0.5)
          .from(
            "[data-hero-cta]",
            { y: 15, opacity: 0, stagger: 0.1, duration: 0.7 },
            0.65,
          )
          .from("[data-search]", { y: 25, opacity: 0, duration: 0.8 }, 0.75);
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 28,
            opacity: 0,
            duration: 0.85,
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((element) => {
          const counter = { value: 0 };
          gsap.to(counter, {
            value: Number(element.dataset.counter),
            duration: 1.7,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 95%", once: true },
            onUpdate: () => {
              element.textContent =
                Math.round(counter.value).toLocaleString() +
                (element.dataset.suffix ?? "");
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [path], revertOnUpdate: true },
  );
  return <div ref={root}>{children}</div>;
}
