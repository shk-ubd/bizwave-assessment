"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Compass, Menu, X } from "lucide-react";
import { services } from "@/data/travel";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Elsewhere home">
      <Compass size={31} strokeWidth={1.4} />
      <span>
        elsewhere<span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
export default function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const serviceButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 35);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!nav.current?.contains(event.target as Node)) setDropdown(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const closeAll = () => {
    setOpen(false);
    setDropdown(false);
  };
  return (
    <header
      className={`site-header ${path === "/" && !scrolled && !open ? "over-hero" : "solid"}`}
    >
      <nav
        ref={nav}
        className="nav-shell"
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            if (open) {
              setOpen(false);
              menuButton.current?.focus();
            } else {
              setDropdown(false);
              serviceButton.current?.focus();
            }
          }
          if (open && event.key === "Tab") {
            const items = nav.current?.querySelectorAll<HTMLElement>(
              "a[href],button:not([disabled])",
            );
            if (items?.length) {
              const first = items[0];
              const last = items[items.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
              }
            }
          }
        }}
      >
        <Brand />
        <div id="main-menu" className={`nav-links ${open ? "is-open" : ""}`}>
          <Link
            href="/"
            aria-current={path === "/" ? "page" : undefined}
            onClick={closeAll}
          >
            Home
          </Link>
          <Link
            href="/about"
            aria-current={path === "/about" ? "page" : undefined}
            onClick={closeAll}
          >
            About us
          </Link>
          <div
            className="dropdown"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setDropdown(false);
            }}
          >
            <button
              ref={serviceButton}
              aria-expanded={dropdown}
              aria-controls="services-menu"
              onClick={() => setDropdown(!dropdown)}
            >
              Services{" "}
              <ChevronDown size={13} className={dropdown ? "rotate" : ""} />
            </button>
            {dropdown && (
              <div id="services-menu" className="dropdown-panel">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    onClick={closeAll}
                  >
                    <service.icon size={18} />
                    <span>{service.name}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/destinations"
            aria-current={path.startsWith("/destinations") ? "page" : undefined}
            onClick={closeAll}
          >
            Destinations
          </Link>
          <Link
            href="/contact"
            aria-current={path === "/contact" ? "page" : undefined}
            onClick={closeAll}
          >
            Contact
          </Link>
          <Link
            className="button nav-cta"
            href="/contact?subject=Plan%20my%20trip"
            onClick={closeAll}
          >
            Book a trip <ArrowUpRight size={16} />
          </Link>
        </div>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
}
