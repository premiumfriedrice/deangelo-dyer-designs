"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { portfolioItems, categories } from "@/lib/data";
import { PortfolioItem } from "@/lib/types";

function PlaqueDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-widest text-plaque-highlight">
        {label}
      </span>
      <span className="text-sm text-plaque-text">{value}</span>
    </div>
  );
}

function PortfolioCard({ item, onOpen }: { item: PortfolioItem; onOpen: (item: PortfolioItem) => void }) {
  return (
    <article
      className="group relative overflow-hidden rounded-md bg-card shadow-[var(--shadow)]"
      onClick={() => onOpen(item)}
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${item.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(item);
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Metal plaque overlay */}
        <div className="absolute inset-x-4 bottom-4 translate-y-[calc(100%+1rem)] rounded-sm border border-plaque-border p-5 opacity-0 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 plaque-brushed focus-visible:translate-y-0 focus-visible:opacity-100">
          {/* Screw heads */}
          <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-plaque-highlight shadow-inner" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-plaque-highlight shadow-inner" />
          <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-plaque-highlight shadow-inner" />
          <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-plaque-highlight shadow-inner" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            {item.category}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-semibold plaque-engrave">
            {item.title}
          </h3>

          <div className="mt-4 border-t border-plaque-border/60 pt-4">
            <p className="text-[10px] uppercase tracking-widest text-plaque-highlight">
              Materials
            </p>
            <p className="mt-1 text-sm text-plaque-text">
              {item.materials.join(" · ")}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-plaque-border/60 pt-4">
            {item.details.slice(0, 3).map((detail) => (
              <PlaqueDetail key={detail.label} {...detail} />
            ))}
          </div>

          {item.story && (
            <div className="mt-4 border-t border-plaque-border/60 pt-4">
              <p className="line-clamp-2 text-xs italic leading-relaxed text-plaque-text/80">
                “{item.story}”
              </p>
              <span className="mt-2 inline-block text-[10px] uppercase tracking-widest text-accent">
                Click to read more
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Static label for non-hover state */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-sm bg-background/90 px-3 py-1.5 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
          {item.title}
        </p>
      </div>
    </article>
  );
}

function DetailModal({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-md bg-card shadow-[var(--shadow)]">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-8 md:p-10">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-background/90 p-2 backdrop-blur-sm transition-colors hover:bg-cream"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {item.category}
          </p>
          <h2
            id="portfolio-modal-title"
            className="mt-2 font-serif text-4xl font-semibold md:text-5xl"
          >
            {item.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            {item.description}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-md border border-border bg-cream p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Materials
              </h3>
              <ul className="mt-3 space-y-2">
                {item.materials.map((material) => (
                  <li key={material} className="text-foreground/80">
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-border bg-cream p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Details
              </h3>
              <dl className="mt-3 space-y-3">
                {item.details.map((detail) => (
                  <div key={detail.label} className="flex justify-between">
                    <dt className="text-foreground/60">{detail.label}</dt>
                    <dd className="font-medium text-foreground">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {item.story && (
            <div className="mt-8 border-l-2 border-accent pl-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Notes
              </h3>
              <p className="mt-3 text-lg italic leading-relaxed text-foreground/80">
                “{item.story}”
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

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
          A gallery of finished pieces. Hover or focus an item to read its
          museum plaque, then click to see the full story.
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
          <PortfolioCard
            key={item.id}
            item={item}
            onOpen={setSelectedItem}
          />
        ))}
      </div>

      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
