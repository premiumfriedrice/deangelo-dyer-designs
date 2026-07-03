# Virtual Showroom + Detail Pages Implementation Plan

> **REQUIRED SUB-SKILL:** Use the executing-plans skill or subagent-driven-development to implement this plan task-by-task.

**Goal:** Refactor `/portfolio` from a hover-plaque gallery into a virtual showroom with a spotlight stage, gallery-map floor plan tied to filters, and dedicated `/portfolio/[id]` detail pages for each piece.

**Architecture:** The portfolio index becomes a client-side showroom shell: a large spotlight stage for the currently selected piece, a filterable floor-plan thumbnail strip/grid below, and smooth CSS transitions between selections. Each thumbnail links to its own static detail page. Shared plaque UI and navigation helpers are extracted into `src/components/portfolio/`. The existing modal is removed in favor of full detail pages.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, lucide-react.

---

## Task 1: Extract reusable `PortfolioPlaque` component

**Files:**
- Create: `src/components/portfolio/PortfolioPlaque.tsx`

**Step 1: Create component**

Move the existing plaque UI from `src/app/portfolio/page.tsx` into a reusable component that accepts a `PortfolioItem`.

```tsx
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
```

**Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit`
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/portfolio/PortfolioPlaque.tsx
git commit -m "feat(portfolio): extract reusable PortfolioPlaque component"
```

---

## Task 2: Create `PortfolioSpotlight` component

**Files:**
- Create: `src/components/portfolio/PortfolioSpotlight.tsx`

**Step 1: Create component**

Build a large spotlight stage that displays the selected piece with its plaque mounted beside or over it like a museum exhibit label.

```tsx
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
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/10" aria-hidden="true" />
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
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/portfolio/PortfolioSpotlight.tsx
git commit -m "feat(portfolio): add PortfolioSpotlight stage component"
```

---

## Task 3: Create `PortfolioFloorPlan` component

**Files:**
- Create: `src/components/portfolio/PortfolioFloorPlan.tsx`

**Step 1: Create component**

A compact thumbnail grid that acts as the gallery map. Selecting a thumbnail updates the spotlight. Each thumbnail links to the detail page.

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { PortfolioItem } from "@/lib/types";

interface PortfolioFloorPlanProps {
  items: PortfolioItem[];
  activeId: string;
  onSelect: (item: PortfolioItem) => void;
}

export function PortfolioFloorPlan({ items, activeId, onSelect }: PortfolioFloorPlanProps) {
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
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/portfolio/PortfolioFloorPlan.tsx
git commit -m "feat(portfolio): add PortfolioFloorPlan thumbnail map"
```

---

## Task 4: Refactor `/portfolio` page into showroom shell

**Files:**
- Modify: `src/app/portfolio/page.tsx`

**Step 1: Rewrite page**

Replace the gallery grid with the spotlight + floor-plan layout. Keep category filters. Remove the modal and `PortfolioCard`. Use the new components.

```tsx
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
```

**Step 2: Run lint and TypeScript**

Run:
```bash
npm run lint
npx tsc --noEmit
```
Expected: no errors

**Step 3: Commit**

```bash
git add src/app/portfolio/page.tsx
git commit -m "feat(portfolio): refactor index into virtual showroom spotlight + floor plan"
```

---

## Task 5: Create `/portfolio/[id]` detail page

**Files:**
- Create: `src/app/portfolio/[id]/page.tsx`

**Step 1: Create page**

Build a full detail page with a large image, plaque-style info panel, materials/details/story, and next/prev navigation.

```tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { portfolioItems } from "@/lib/data";
import { PortfolioPlaque } from "@/components/portfolio/PortfolioPlaque";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = portfolioItems.find((p) => p.id === id);
  return {
    title: item ? `${item.title} | Virtual Showroom` : "Exhibit | Virtual Showroom",
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = portfolioItems.find((p) => p.id === id);

  if (!item) {
    notFound();
  }

  const currentIndex = portfolioItems.findIndex((p) => p.id === id);
  const prevItem = portfolioItems[currentIndex - 1] ?? null;
  const nextItem = portfolioItems[currentIndex + 1] ?? null;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <Link
        href="/portfolio"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" /> Back to showroom
      </Link>

      <div className="overflow-hidden rounded-md bg-card shadow-[var(--shadow)]">
        <div className="grid lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[640px]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center bg-background p-8 md:p-10 lg:p-12">
            <PortfolioPlaque item={item} />

            {item.description && (
              <p className="mt-8 text-lg leading-relaxed text-foreground/70">
                {item.description}
              </p>
            )}

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

      <nav className="mt-10 grid gap-4 sm:grid-cols-2">
        {prevItem ? (
          <Link
            href={`/portfolio/${prevItem.id}`}
            className="group flex items-center gap-4 rounded-md border border-border bg-card p-4 transition-colors hover:bg-cream"
          >
            <ArrowLeft className="h-5 w-5 text-muted transition-colors group-hover:text-accent" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted">Previous</p>
              <p className="font-serif text-lg font-medium">{prevItem.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextItem ? (
          <Link
            href={`/portfolio/${nextItem.id}`}
            className="group flex items-center justify-end gap-4 rounded-md border border-border bg-card p-4 text-right transition-colors hover:bg-cream"
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted">Next</p>
              <p className="font-serif text-lg font-medium">{nextItem.title}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted transition-colors group-hover:text-accent" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
```

**Step 2: Verify TypeScript and lint**

Run:
```bash
npx tsc --noEmit
npm run lint
```
Expected: no errors

**Step 3: Commit**

```bash
git add src/app/portfolio/[id]/page.tsx
git commit -m "feat(portfolio): add individual exhibit detail pages at /portfolio/[id]"
```

---

## Task 6: Clean up unused modal code and verify build

**Files:**
- Modify: `src/app/portfolio/page.tsx` (already done)
- Verify: no remaining `DetailModal` or `PortfolioCard` references

**Step 1: Search for leftover modal code**

Run: `grep -R "DetailModal\|PortfolioCard\|selectedItem\|setSelectedItem" src/`
Expected: no matches

**Step 2: Run full verification**

Run:
```bash
npx tsc --noEmit
npm run lint
npm run build
```
Expected: all pass

**Step 3: Commit**

```bash
git add -A
git commit -m "chore(portfolio): remove old modal in favor of detail pages"
```

---

## Task 7: Update handoff / plan status

**Files:**
- Modify: `docs/handoff/2026-07-02-portfolio-museum-plaques.md`

**Step 1: Append completion notes**

Add a section at the bottom:

```markdown
## Update: Virtual Showroom + Detail Pages

- Replaced hover-only gallery with a spotlight stage + gallery-map floor plan.
- Category filters now act as "rooms" that reset the spotlight to the first matching piece.
- Each thumbnail links to a dedicated `/portfolio/[id]` exhibit page.
- Reusable components: `PortfolioPlaque`, `PortfolioSpotlight`, `PortfolioFloorPlan`.
- Detail pages include prev/next navigation and SEO metadata.
```

**Step 2: Commit**

```bash
git add docs/handoff/2026-07-02-portfolio-museum-plaques.md
git commit -m "docs: update handoff with showroom + detail page scope"
```

---

## Testing Checklist

- [ ] `/portfolio` loads with a spotlight stage and gallery map.
- [ ] Category filters update both spotlight and floor plan.
- [ ] Clicking a floor-plan thumbnail updates the spotlight.
- [ ] "View full exhibit" link navigates to `/portfolio/[id]`.
- [ ] Detail page shows large image, plaque, description, story, materials, details.
- [ ] Prev/next navigation works and loops correctly within the full portfolio order.
- [ ] Invalid `/portfolio/[id]` returns 404.
- [ ] Mobile layout is usable (stacked spotlight, 2-column floor plan).
- [ ] `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass.
