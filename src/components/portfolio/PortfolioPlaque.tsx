"use client";

import { PortfolioItem, PortfolioDetail } from "@/lib/types";

function PlaqueDetail({ label, value }: PortfolioDetail) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-widest text-plaque-highlight">
        {label}
      </span>
      <span className="text-sm text-plaque-text">{value}</span>
    </div>
  );
}

interface PortfolioPlaqueProps {
  item: PortfolioItem;
}

export function PortfolioPlaque({ item }: PortfolioPlaqueProps) {
  return (
    <div className="relative rounded-sm border border-plaque-border bg-plaque-bg p-5 plaque-brushed shadow-2xl">
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
        </div>
      )}
    </div>
  );
}
