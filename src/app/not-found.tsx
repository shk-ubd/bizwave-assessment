import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
export default function NotFound() {
  return (
    <section className="not-found container">
      <Compass size={52} strokeWidth={1} />
      <p className="eyebrow">A SMALL DETOUR · 404</p>
      <h1>
        A little <em>off the map.</em>
      </h1>
      <p>
        We couldn’t find this page. Your next great journey is still out there.
      </p>
      <Link className="button button-dark" href="/">
        Back to Elsewhere <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
