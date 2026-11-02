"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import {
  contactSchema,
  emailSchema,
  type ContactValues,
} from "@/lib/validations";
export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  return (
    <form
      className={`newsletter-form ${compact ? "compact" : ""}`}
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = emailSchema.safeParse(data.get("email"));
        if (!email.success) {
          setError("Please enter a valid email address.");
          setState("error");
          return;
        }
        setState("loading");
        await new Promise((resolve) => setTimeout(resolve, 650));
        setState("success");
        setError("");
      }}
    >
      <div className="newsletter-input">
        <label
          className="sr-only"
          htmlFor={compact ? "footer-email" : "newsletter-email"}
        >
          Email address
        </label>
        <input
          id={compact ? "footer-email" : "newsletter-email"}
          name="email"
          type="email"
          placeholder="Your email address"
          autoComplete="email"
          disabled={state === "loading" || state === "success"}
          aria-invalid={state === "error"}
          aria-describedby={
            compact ? "footer-email-feedback" : "newsletter-feedback"
          }
        />
        <button
          disabled={state === "loading" || state === "success"}
          aria-label="Subscribe to travel inspiration"
        >
          {state === "loading" ? (
            <LoaderCircle className="spin" size={20} />
          ) : state === "success" ? (
            <Check size={20} />
          ) : (
            <>
              <span>{compact ? "Join" : "Count me in"}</span>
              <ArrowUpRight size={19} />
            </>
          )}
        </button>
      </div>
      <p
        id={compact ? "footer-email-feedback" : "newsletter-feedback"}
        className={`form-feedback ${state === "error" ? "error" : ""}`}
        aria-live="polite"
      >
        {state === "success"
          ? "You’re on the sample list! Demo only; no email was saved or sent."
          : error || "A little inspiration. No spam. Demo subscription only."}
      </p>
    </form>
  );
}
export function ContactForm({
  initialSubject = "",
}: {
  initialSubject?: string;
}) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: initialSubject },
  });
  if (sent)
    return (
      <div className="success-panel" role="status">
        <span className="success-icon">
          <Check />
        </span>
        <p className="eyebrow">DEMO INQUIRY COMPLETE</p>
        <h3>Your next chapter starts here.</h3>
        <p>
          Your inquiry has been simulated successfully. No information was sent
          or stored, and no booking has been made.
        </p>
        <button
          className="button button-dark"
          onClick={() => {
            setSent(false);
            reset();
          }}
        >
          Write another inquiry <ArrowUpRight size={17} />
        </button>
      </div>
    );
  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit(async () => {
        await new Promise((resolve) => setTimeout(resolve, 700));
        setSent(true);
      })}
      noValidate
    >
      <div className="form-two">
        <label>
          Full name
          <input
            {...register("name")}
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
          />
          <span id="name-error" className="field-error">
            {errors.name?.message}
          </span>
        </label>
        <label>
          Email address
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          <span id="email-error" className="field-error">
            {errors.email?.message}
          </span>
        </label>
      </div>
      <label>
        What are you dreaming of?
        <input
          {...register("subject")}
          placeholder="A trip, a question, a possibility…"
          aria-invalid={!!errors.subject}
          aria-describedby="subject-error"
        />
        <span id="subject-error" className="field-error">
          {errors.subject?.message}
        </span>
      </label>
      <label>
        Your message
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Tell us a little about your travel plans…"
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
        />
        <span id="message-error" className="field-error">
          {errors.message?.message}
        </span>
      </label>
      <button className="button button-dark" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            Simulating inquiry <LoaderCircle className="spin" size={17} />
          </>
        ) : (
          <>
            Send an inquiry <ArrowUpRight size={17} />
          </>
        )}
      </button>
      <p className="fine-print">
        Demonstration only. Your details are not transmitted, stored, or used to
        make a booking.
      </p>
    </form>
  );
}
