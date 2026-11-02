"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, LoaderCircle, MapPin, Search } from "lucide-react";
import { services, type ServiceKey } from "@/data/travel";
import {
  futureDate,
  localDate,
  searchSchema,
  type SearchValues,
} from "@/lib/validations";
import SearchResults from "./SearchResults";
import DetailModal from "./DetailModal";
const subscribeToDate = () => () => {};
const serverDate = () => "";
export default function TravelSearch({
  initialService = "flights",
  fixed = false,
  destination = "",
}: {
  initialService?: ServiceKey;
  fixed?: boolean;
  destination?: string;
}) {
  const [active, setActive] = useState<ServiceKey>(initialService);
  const [status, setStatus] = useState<
    "idle" | "loading" | "results" | "empty"
  >("idle");
  const [query, setQuery] = useState<SearchValues | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const resultRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const uid = useId();
  const today = useSyncExternalStore(subscribeToDate, localDate, serverDate);
  const requestVersion = useRef(0);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SearchValues>({
    resolver: zodResolver(searchSchema(active)),
    defaultValues: {
      origin: "",
      destination,
      start: "",
      end: "",
      travelers: "1",
      rooms: "1",
      category:
        initialService === "visa"
          ? "Tourist"
          : initialService === "cars"
            ? "Any"
            : "Economy",
    },
  });
  useEffect(() => {
    setValue("start", futureDate(14));
    setValue("end", futureDate(21));
    return () => {
      requestVersion.current += 1;
    };
  }, [setValue]);
  const start = watch("start");
  function switchTab(key: ServiceKey) {
    requestVersion.current += 1;
    setActive(key);
    setStatus("idle");
    setQuery(null);
    setFilter("All");
    reset({
      origin: "",
      destination,
      start: futureDate(14),
      end: futureDate(21),
      travelers: "1",
      rooms: "1",
      category: key === "visa" ? "Tourist" : key === "cars" ? "Any" : "Economy",
    });
  }
  const field = (
    name: FieldPath<SearchValues>,
    label: string,
    placeholder: string,
    type = "text",
  ) => (
    <label className={`search-field field-${name}`} htmlFor={`${uid}-${name}`}>
      <span>{label}</span>
      <input
        id={`${uid}-${name}`}
        {...register(name)}
        type={type}
        min={
          type === "date"
            ? name === "end"
              ? start || today
              : today
            : undefined
        }
        placeholder={placeholder}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${uid}-${name}-error` : undefined}
      />
      <span className="field-error" id={`${uid}-${name}-error`}>
        {errors[name]?.message}
      </span>
    </label>
  );
  const select = (
    name: FieldPath<SearchValues>,
    label: string,
    options: string[],
  ) => (
    <label className={`search-field field-${name}`} htmlFor={`${uid}-${name}`}>
      <span>{label}</span>
      <select
        id={`${uid}-${name}`}
        {...register(name)}
        aria-invalid={!!errors[name]}
        aria-describedby={`${uid}-${name}-error`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="field-error" id={`${uid}-${name}-error`}>
        {errors[name]?.message}
      </span>
    </label>
  );
  const openDetail = (name: string) => {
    openerRef.current = document.activeElement as HTMLElement;
    setSelected(name);
  };
  const closeDetail = () => {
    setSelected(null);
    openerRef.current?.focus();
  };
  return (
    <div className="search-wrap" id="search">
      <div
        className={`travel-search ${fixed ? "fixed-search" : ""}`}
        data-search
      >
        {!fixed && (
          <div
            className="search-tabs"
            role="tablist"
            aria-label="Travel services"
          >
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                id={`${uid}-tab-${service.id}`}
                aria-controls={`${uid}-panel`}
                aria-selected={active === service.id}
                tabIndex={active === service.id ? 0 : -1}
                className={active === service.id ? "active" : ""}
                onClick={() => switchTab(service.id)}
                onKeyDown={(event) => {
                  if (
                    ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                      event.key,
                    )
                  ) {
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 3
                          : (index +
                              (event.key === "ArrowRight" ? 1 : -1) +
                              4) %
                            4;
                    switchTab(services[next].id);
                    document
                      .getElementById(`${uid}-tab-${services[next].id}`)
                      ?.focus();
                  }
                }}
              >
                <service.icon size={17} />
                {service.short}
              </button>
            ))}
            <span className="search-caption">A good journey starts here.</span>
          </div>
        )}
        <div
          id={`${uid}-panel`}
          role={fixed ? undefined : "tabpanel"}
          aria-labelledby={fixed ? undefined : `${uid}-tab-${active}`}
        >
          <form
            className={`search-form search-${active}`}
            noValidate
            onSubmit={handleSubmit(async (values) => {
              const version = ++requestVersion.current;
              setQuery(values);
              setStatus("loading");
              setFilter("All");
              await new Promise((resolve) => setTimeout(resolve, 800));
              if (version !== requestVersion.current) return;
              setStatus(
                /antarctica|atlantis|nowhere|no results/i.test(
                  values.destination,
                )
                  ? "empty"
                  : "results",
              );
              requestAnimationFrame(() =>
                resultRef.current?.focus({ preventScroll: true }),
              );
            })}
          >
            {active === "flights" && (
              <>
                {field("origin", "FROM", "Departure city")}
                {field("destination", "TO", "Where to?")}
                {field("start", "DEPARTURE", "Select date", "date")}
                {field("end", "RETURN", "Select date", "date")}
                {select("travelers", "TRAVELERS", [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                ])}
                {select("category", "CABIN CLASS", [
                  "Economy",
                  "Premium economy",
                  "Business",
                  "First",
                ])}
              </>
            )}
            {active === "hotels" && (
              <>
                {field("destination", "DESTINATION", "City or region")}
                {field("start", "CHECK-IN", "Select date", "date")}
                {field("end", "CHECK-OUT", "Select date", "date")}
                {select("travelers", "GUESTS", [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                ])}
                {select("rooms", "ROOMS", ["1", "2", "3", "4", "5"])}
              </>
            )}
            {active === "visa" && (
              <>
                {field("origin", "NATIONALITY", "Your nationality")}
                {field("destination", "DESTINATION", "Country to visit")}
                {select("category", "VISA CATEGORY", [
                  "Tourist",
                  "Business",
                  "Study",
                  "Family visit",
                ])}
                {field("start", "TRAVEL DATE", "Select date", "date")}
              </>
            )}
            {active === "cars" && (
              <>
                {field("origin", "PICKUP", "City or airport")}
                {field("destination", "DROP-OFF", "City or airport")}
                {field("start", "PICKUP DATE", "Select date", "date")}
                {field("end", "RETURN DATE", "Select date", "date")}
                {select("category", "VEHICLE", [
                  "Any",
                  "Economy",
                  "Luxury",
                  "SUV",
                ])}
              </>
            )}
            <button
              className="button search-button"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <LoaderCircle size={19} className="spin" />
              ) : (
                <Search size={18} />
              )}
              <span>
                {status === "loading"
                  ? "Searching"
                  : active === "visa"
                    ? "Check options"
                    : "Let’s go"}
              </span>
            </button>
          </form>
        </div>
        <div className="search-footnote">
          <span>
            <Check size={13} /> Thoughtfully chosen. Effortlessly planned.
          </span>
          <span>Demo search · Illustrative prices in USD</span>
        </div>
      </div>
      <div
        ref={resultRef}
        tabIndex={-1}
        className="search-results"
        aria-live="polite"
        aria-busy={status === "loading"}
      >
        {status === "loading" && (
          <div className="loading-panel">
            <LoaderCircle className="spin" />
            <span>Finding a little inspiration for your journey…</span>
          </div>
        )}
        {status === "empty" && (
          <div className="empty-panel">
            <MapPin size={30} />
            <h3>A little off our sample map.</h3>
            <p>
              No demo options for this destination. Try Dubai, Paris, Istanbul,
              London, Maldives, or Tokyo.
            </p>
            <button
              className="text-link"
              onClick={() => {
                setStatus("idle");
                document.getElementById(`${uid}-destination`)?.focus();
              }}
            >
              Try another destination <ArrowRight size={16} />
            </button>
          </div>
        )}
        {status === "results" && query && (
          <SearchResults
            active={active}
            query={query}
            filter={filter}
            setFilter={setFilter}
            openDetail={openDetail}
          />
        )}
      </div>
      {selected && (
        <DetailModal selected={selected} closeDetail={closeDetail} uid={uid} />
      )}
    </div>
  );
}
