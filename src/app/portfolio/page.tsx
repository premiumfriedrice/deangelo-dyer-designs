"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolioItems } from "@/lib/data";
import { categories } from "@/lib/data";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const allCategories = ["All", ...categories];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Portfolio
        </p>
        <h1 className="font-serif text-5xl font-semibold md:text-6xl">
          Selected work
        </h1>
        <p className="mt-5 text-lg text-foreground/70">
          A gallery of finished pieces — from small goods to larger furniture.
          Each project is an exploration of material, form, and use.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-md bg-card"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                {item.category}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-medium text-cream">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-cream/80">
                {item.description}
              </p>
              <p className="mt-3 text-xs text-cream/60">{item.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
