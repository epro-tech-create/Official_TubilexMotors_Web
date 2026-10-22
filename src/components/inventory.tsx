"use client";
import { useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./vehicle-card";
export function Inventory({
  vehicles,
  compact = false,
}: {
  vehicles: Vehicle[];
  compact?: boolean;
}) {
  const [category, setCategory] = useState("All vehicles");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  let filtered = vehicles.filter(
    (v) =>
      (category === "All vehicles" || v.category === category) &&
      `${v.name} ${v.category}`.toLowerCase().includes(search.toLowerCase()),
  );
  if (sort === "name")
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "price")
    filtered = [...filtered].sort(
      (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
    );
  const visible = compact ? filtered.slice(0, 3) : filtered;
  return (
    <>
      <div className="inventory-toolbar">
        <div className="filter-tabs" aria-label="Vehicle categories">
          {["All vehicles", "SUV", "Sedan", "Luxury", "Pickup"].map((c) => (
            <button
              key={c}
              aria-pressed={c === category}
              className={c === category ? "selected" : ""}
              onClick={() => setCategory(c)}
            >
              {c === "SUV"
                ? "SUVs"
                : c === "Sedan"
                  ? "Sedans"
                  : c === "Pickup"
                    ? "Pickups"
                    : c}
            </button>
          ))}
        </div>
        {compact ? (
          <Link className="text-link" href="/vehicles">
            View all vehicles <ArrowUpRight size={17} />
          </Link>
        ) : (
          <label className="sort-select">
            <SlidersHorizontal size={16} />
            <select
              aria-label="Sort vehicles"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured first</option>
              <option value="name">Name: A–Z</option>
              <option value="price">Price: low to high</option>
            </select>
          </label>
        )}
      </div>
      {!compact && (
        <div className="inventory-search">
          <label>
            <Search size={19} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by make, model or category…"
              aria-label="Search vehicles"
            />
            {search && (
              <button aria-label="Clear search" onClick={() => setSearch("")}>
                <X size={16} />
              </button>
            )}
          </label>
          <span>
            {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
      <div className="vehicle-grid">
        {visible.map((vehicle) => (
          <VehicleCard vehicle={vehicle} key={vehicle.id} />
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          <Search size={28} />
          <h3>A different kind of drive?</h3>
          <p>
            No vehicles match this selection. Reset the filters, or let us help
            source the car you have in mind.
          </p>
          <button
            className="button button-dark"
            onClick={() => {
              setCategory("All vehicles");
              setSearch("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
