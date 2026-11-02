import type { Metadata } from "next";
import { notFound } from "next/navigation";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ legal: "privacy" }, { legal: "terms" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ legal: string }>;
}): Promise<Metadata> {
  const { legal } = await params;
  return { title: legal === "privacy" ? "Privacy policy" : "Terms of use" };
}
export default async function Legal({
  params,
}: {
  params: Promise<{ legal: string }>;
}) {
  const { legal } = await params;
  if (!["privacy", "terms"].includes(legal)) notFound();
  const privacy = legal === "privacy";
  return (
    <article className="container legal-page">
      <p className="eyebrow">CLEAR BY DESIGN · DEMONSTRATION POLICY</p>
      <h1>{privacy ? "Your privacy." : "A few clear terms."}</h1>
      <p className="legal-lead">
        Elsewhere is a demonstration travel website, not an operating travel
        agency.
      </p>
      {(privacy
        ? [
            {
              title: "Information entered in forms",
              text: "Contact forms, search forms, and newsletter inputs use information only in browser memory to demonstrate interactions. No form data is sent, stored, subscribed, or emailed. Information disappears when the page is reloaded or the session ends.",
            },
            {
              title: "Cookies and analytics",
              text: "The application does not add analytics, advertising trackers, or persistent application cookies. Your hosting provider may collect ordinary technical request logs, such as IP addresses, for operating the website.",
            },
            {
              title: "Images, fonts, and hosting",
              text: "Travel photos are served from local project assets through Next.js image optimization. Fonts are self-hosted by Next.js. Your browser necessarily communicates with the website’s hosting provider to load the site.",
            },
            {
              title: "Sample contact details",
              text: "All displayed business details are illustrative. The example-domain email and fictional phone number do not connect to a travel operator.",
            },
          ]
        : [
            {
              title: "Demonstration only",
              text: "Every itinerary, property, vehicle, price, review, statistic, and business profile is illustrative. Airline names identify sample itineraries and do not imply any partnership, endorsement, or availability.",
            },
            {
              title: "No reservations or payments",
              text: "Submitting a form does not create a booking, visa application, service contract, or payment. No financial information is requested. Success messages confirm only that a demonstration interaction completed.",
            },
            {
              title: "Travel and visa information",
              text: "Destination suggestions and document checklists are general inspiration. They are not current travel, legal, immigration, or safety advice. Verify requirements and conditions with relevant official authorities and actual service providers.",
            },
            {
              title: "Illustrative pricing",
              text: "All sample prices are in USD. Flight fares are per person one way, hotels per room per night, cars per day, and packages per person. They are not live quotes and may exclude taxes, extras, flights, and other fees.",
            },
          ]
      ).map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}
    </article>
  );
}
