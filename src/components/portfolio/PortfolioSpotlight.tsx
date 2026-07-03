"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioItem } from "@/lib/types";
import { PortfolioPlaque } from "./PortfolioPlaque";

interface PortfolioSpotlightProps {
  item: PortfolioItem;
}

export function PortfolioSpotlight({ item }: PortfolioSpotlightProps) {
  return (
    <div className="relative overflow-hidden rounded-md bg-card shadow-[var(--shadow)]">
      <div className="grid lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            className="object-cover"
          />
          {/* Subtle vignette */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/10"
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col justify-center bg-background p-8 md:p-10 lg:p-12">
          <PortfolioPlaque item={item} />

          <Link
            href={`/portfolio/${item.id}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent hover:text-accent-hover"
          >
            View full exhibit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
