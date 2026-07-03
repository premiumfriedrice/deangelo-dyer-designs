"use client";

import Image from "next/image";
import Link from "next/link";
import { PortfolioItem } from "@/lib/types";

interface PortfolioFloorPlanProps {
  items: PortfolioItem[];
  activeId: string;
  onSelect: (item: PortfolioItem) => void;
}

export function PortfolioFloorPlan({
  items,
  activeId,
  onSelect,
}: PortfolioFloorPlanProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <Link
            key={item.id}
            href={`/portfolio/${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(item);
            }}
            className={`group relative overflow-hidden rounded-sm border bg-card transition-all ${
              isActive
                ? "border-accent ring-1 ring-accent"
                : "border-border hover:border-accent/50"
            }`}
            aria-label={`Select ${item.title}`}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="border-t border-border bg-cream p-2.5">
              <p className="truncate text-[10px] font-semibold uppercase tracking-widest text-foreground/60">
                {item.category}
              </p>
              <p className="truncate text-xs font-medium text-foreground">
                {item.title}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
