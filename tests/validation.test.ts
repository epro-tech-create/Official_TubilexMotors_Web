import { test } from "node:test";
import assert from "node:assert/strict";
import { enquirySchema, vehicleSchema } from "../src/lib/validation";
test("enquiries validate email, message length and spam honeypot", () => {
  const valid = {
    name: "Test Customer",
    email: "customer@example.com",
    message: "I would like to arrange a viewing.",
  };
  assert.equal(enquirySchema.safeParse(valid).success, true);
  assert.equal(
    enquirySchema.safeParse({ ...valid, email: "invalid" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, message: "short" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, website: "https://spam.example" })
      .success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, vehicleId: -1 }).success,
    false,
  );
});
test("vehicle input normalizes empty optional specs without fabricating zero values", () => {
  const valid = {
    name: "Toyota Corolla",
    slug: "toyota-corolla",
    category: "Sedan",
    description: "A vehicle for everyday journeys.",
    image: "/media/corolla.webp",
    price: "",
    year: "",
    mileage: "",
    fuel: "Not specified",
    transmission: "Not specified",
    status: "available",
    featured: true,
  };
  const result = vehicleSchema.parse(valid);
  assert.equal(result.price, null);
  assert.equal(result.year, null);
  assert.equal(result.mileage, null);
  assert.equal(
    vehicleSchema.parse({
      ...valid,
      price: "35000000",
      year: "2020",
      mileage: "0",
    }).price,
    35000000,
  );
  assert.equal(
    vehicleSchema.safeParse({ ...valid, image: "javascript:alert(1)" }).success,
    false,
  );
  assert.equal(
    vehicleSchema.safeParse({ ...valid, slug: "../invalid" }).success,
    false,
  );
  assert.equal(vehicleSchema.safeParse({ ...valid, price: -1 }).success, false);
  assert.equal(
    vehicleSchema.safeParse({ ...valid, year: 1899 }).success,
    false,
  );
});
