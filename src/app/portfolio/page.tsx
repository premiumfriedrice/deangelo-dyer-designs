"use client";

import { useState, useMemo } from "react";
import { portfolioItems, categories } from "@/lib/data";
import { PortfolioSpotlight } from "@/components/portfolio/PortfolioSpotlight";
import { PortfolioFloorPlan } from "@/components/portfolio/PortfolioFloorPlan";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const [selected, setSelected] = useState(() => filtered[0] ?? null);

  // Reset selected item when filter changes so the spotlight stays in the current room.
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const nextFiltered =
      category === "All"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === category);
    setSelected(nextFiltered[0] ?? null);
  };

  const allCategories = ["All", ...categories];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Virtual Showroom
        </p>
        <h1 className="font-serif text-5xl font-semibold md:text-6xl">
          Selected work
        </h1>
        <p className="mt-5 text-lg text-foreground/70">
          Browse the gallery map below. Select a piece to bring it onto the
          spotlight stage, or open its full exhibit page.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-walnut text-cream"
                : "border border-border bg-card hover:bg-cream"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mb-12 transition-opacity duration-500 ease-out">
          <PortfolioSpotlight item={selected} />
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          Gallery map
        </h2>
        <p className="text-sm text-foreground/50">
          {filtered.length} piece{filtered.length === 1 ? "" : "s"} in this room
        </p>
      </div>

      <PortfolioFloorPlan
        items={filtered}
        activeId={selected?.id ?? ""}
        onSelect={setSelected}
      />
    </div>
  );
}
