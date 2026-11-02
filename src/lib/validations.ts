import { z } from "zod";
export const serviceKeys = ["flights", "hotels", "visa", "cars"] as const;
export type SearchValues = {
  origin: string;
  destination: string;
  start: string;
  end: string;
  travelers: string;
  rooms: string;
  category: string;
};
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function futureDate(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return localDate(date);
}
export function validDate(value: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}
export const searchSchema = (
  service: (typeof serviceKeys)[number],
  today = localDate(),
) =>
  z
    .object({
      origin:
        service === "hotels"
          ? z.string()
          : z
              .string()
              .trim()
              .min(
                2,
                service === "visa"
                  ? "Enter your nationality."
                  : "Enter a departure or pickup location.",
              ),
      destination: z.string().trim().min(2, "Enter a destination."),
      start: z
        .string()
        .refine(validDate, "Choose a valid date.")
        .refine((value) => value >= today, "Choose today or a future date."),
      end: z.string(),
      travelers: z.string().regex(/^[1-9]$/, "Choose 1–9 travelers."),
      rooms: z.string().regex(/^[1-5]$/, "Choose 1–5 rooms."),
      category: z.string().min(1, "Choose a category."),
    })
    .superRefine((value, ctx) => {
      if (
        service !== "visa" &&
        (!validDate(value.end) || value.end <= value.start)
      )
        ctx.addIssue({
          code: "custom",
          path: ["end"],
          message: "Return or check-out must be after your start date.",
        });
      if (
        service === "flights" &&
        value.origin.trim().toLowerCase() ===
          value.destination.trim().toLowerCase()
      )
        ctx.addIssue({
          code: "custom",
          path: ["destination"],
          message: "Choose a different arrival city.",
        });
      if (service === "hotels" && Number(value.rooms) > Number(value.travelers))
        ctx.addIssue({
          code: "custom",
          path: ["rooms"],
          message: "Rooms cannot exceed the number of guests.",
        });
    });
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Enter a valid email address."),
  subject: z.string().trim().min(3, "Please add a subject."),
  message: z
    .string()
    .trim()
    .min(15, "Please write at least 15 characters.")
    .max(3000, "Please keep your message under 3,000 characters."),
});
export type ContactValues = z.infer<typeof contactSchema>;
export const emailSchema = z.email("Please enter a valid email address.");
