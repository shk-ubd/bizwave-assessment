import test from "node:test";
import assert from "node:assert/strict";
import {
  searchSchema,
  contactSchema,
  emailSchema,
  validDate,
  localDate,
} from "../src/lib/validations.ts";
const values = {
  origin: "Karachi",
  destination: "Dubai",
  start: "2027-05-20",
  end: "2027-05-27",
  travelers: "2",
  rooms: "1",
  category: "Economy",
};
const today = "2027-05-01";
test("all four service modes accept a valid future itinerary", () => {
  for (const mode of ["flights", "hotels", "visa", "cars"] as const)
    assert.equal(searchSchema(mode, today).safeParse(values).success, true);
});
test("rejects past, malformed, and impossible calendar dates", () => {
  for (const start of [
    "2027-04-30",
    "tomorrow",
    "2027-02-30",
    "2027-13-10",
    "",
  ])
    assert.equal(
      searchSchema("flights", today).safeParse({ ...values, start }).success,
      false,
      start,
    );
  assert.equal(validDate("2028-02-29"), true);
  assert.equal(validDate("2027-02-29"), false);
});
test("enforces return and checkout dates after the start", () => {
  for (const mode of ["flights", "hotels", "cars"] as const)
    for (const end of ["2027-05-20", "2027-05-19", "", "2027-06-31"])
      assert.equal(
        searchSchema(mode, today).safeParse({ ...values, end }).success,
        false,
        `${mode}: ${end}`,
      );
});
test("visa does not require a return date but requires nationality", () => {
  assert.equal(
    searchSchema("visa", today).safeParse({ ...values, end: "" }).success,
    true,
  );
  assert.equal(
    searchSchema("visa", today).safeParse({ ...values, origin: " " }).success,
    false,
  );
});
test("flights reject identical departure and arrival after normalization", () => {
  const result = searchSchema("flights", today).safeParse({
    ...values,
    origin: " DUBAI ",
    destination: "dubai",
  });
  assert.equal(result.success, false);
  if (!result.success)
    assert.ok(
      result.error.issues.some((issue) => issue.path[0] === "destination"),
    );
});
test("hotels allow no origin and reject rooms exceeding guests", () => {
  assert.equal(
    searchSchema("hotels", today).safeParse({ ...values, origin: "" }).success,
    true,
  );
  assert.equal(
    searchSchema("hotels", today).safeParse({
      ...values,
      travelers: "1",
      rooms: "2",
    }).success,
    false,
  );
});
test("rejects missing destinations and invalid passenger counts", () => {
  for (const travelers of ["0", "10", "-1", "1.5", "NaN", ""])
    assert.equal(
      searchSchema("flights", today).safeParse({ ...values, travelers })
        .success,
      false,
    );
  assert.equal(
    searchSchema("cars", today).safeParse({ ...values, destination: " " })
      .success,
    false,
  );
});
test("contact and newsletter reject invalid submissions", () => {
  const contact = {
    name: "Demo Traveler",
    email: "traveler@example.com",
    subject: "Maldives escape",
    message: "I would love to explore a week in the Maldives.",
  };
  assert.equal(contactSchema.safeParse(contact).success, true);
  assert.equal(
    contactSchema.safeParse({ ...contact, email: "bad-email" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...contact, message: "short" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...contact, name: " " }).success,
    false,
  );
  assert.equal(emailSchema.safeParse("demo@example.com").success, true);
  assert.equal(emailSchema.safeParse("wrong@address").success, false);
});
test("local date formatting avoids UTC date shifts", () => {
  assert.equal(localDate(new Date(2027, 4, 1, 23, 59)), "2027-05-01");
});
