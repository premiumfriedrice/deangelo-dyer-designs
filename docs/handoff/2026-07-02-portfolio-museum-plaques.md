# Portfolio Museum Plaques — Handoff

## Branch and Worktree

- **Branch:** `feature/portfolio-museum-plaques`
- **Worktree:** `/Users/lloydalba/code/DeangeloDyerDesigns/.worktrees/feature/portfolio-museum-plaques`

## Linear Issue

- **TODO:** Create a Linear issue for this feature and reference it in commits / merge description.
- **Scope:** Redesign the portfolio gallery so each piece feels like a museum exhibit with a metal plaque containing materials, notes/story, and additional details.

## Current State

- Next.js 16 + TypeScript + Tailwind CSS v4 scaffold is in place.
- Business name placeholders already applied on `main`.
- Portfolio page at `src/app/portfolio/page.tsx` renders a filterable grid of `PortfolioItem` cards.
- `PortfolioItem` type lives in `src/lib/types.ts` and currently has: `id`, `title`, `category`, `image`, `description`, `year`.
- Sample data lives in `src/lib/data.ts` (`portfolioItems` array).
- Baseline verified: `tsc --noEmit`, `npm run lint`, and `npm run build` all pass.

## What to Build

1. **Data model updates**
   - Extend `PortfolioItem` in `src/lib/types.ts` to include:
     - `materials: string[]` — woods, finishes, hardware
     - `story?: string` — optional maker notes / backstory
     - `details?: { label: string; value: string }[]` — dimensions, year, client, location, etc.
   - Populate `src/lib/data.ts` with realistic placeholder values for each portfolio item.

2. **Portfolio UX redesign**
   - Keep the filterable gallery grid as the entry point.
   - On hover / focus, reveal a museum-style metal plaque overlay on each card.
   - Plaque should visually evoke brushed metal: dark metallic background, engraved/etched typography, subtle border, maybe a small screw-head detail in corners.
   - Plaque content:
     - Title (large, engraved)
     - Materials list
     - Optional story / notes paragraph
     - Additional details grid (dimensions, year, category, etc.)
   - Consider a click-to-expand detail view (modal or dedicated page) for longer stories.
   - Preserve responsive behavior and accessibility.

3. **Design constraints**
   - Maintain the existing refined editorial craftsman aesthetic.
   - Use CSS variables in `src/app/globals.css` for plaque colors (e.g., `--plaque-bg`, `--plaque-text`, `--plaque-border`).
   - Keep animations CSS-driven where possible.

## How to Test

```bash
cd /Users/lloydalba/code/DeangeloDyerDesigns/.worktrees/feature/portfolio-museum-plaques
npm run dev        # localhost:3002
npm run lint
npx tsc --noEmit
npm run build
```

Verify:
- `/portfolio` loads and filters work.
- Each portfolio card shows a plaque on hover with materials, story, and details.
- Mobile layout is usable.
- No TypeScript or lint errors.

## Architecture Constraints

- Keep shared components in `src/components/`.
- Keep types in `src/lib/types.ts` and data in `src/lib/data.ts`.
- Do not introduce payment logic here; this is a portfolio-only feature branch.

## Update: Virtual Showroom + Detail Pages

- Replaced hover-only gallery with a spotlight stage + gallery-map floor plan.
- Category filters now act as "rooms" that reset the spotlight to the first matching piece.
- Each thumbnail links to a dedicated `/portfolio/[id]` exhibit page.
- Reusable components: `PortfolioPlaque`, `PortfolioSpotlight`, `PortfolioFloorPlan`.
- Detail pages include prev/next navigation and SEO metadata.
- Implementation plan saved to `docs/plans/2026-07-02-virtual-showroom-detail-pages.md`.

## Update: Portfolio Purchase Option

- Added `forSale`, `price`, `featured`, and `slug` fields to `PortfolioItem`.
- Shop is now a filtered view of portfolio items where `forSale: true`.
- Removed standalone `Product` type and `products` array.
- Added "Add to inquiry cart" CTA on `/portfolio/[id]` for for-sale pieces.
- Added new portfolio examples: cutting boards, butcher block, utensil vase, shelves, bathroom counter.
- Four shelves are for sale: Black Walnut Shelf, Carved Live Edge Walnut Shelf, Live Edge Floating Walnut Shelf, Mesquite Torch Shelf.
- Implementation plan saved to `docs/plans/2026-07-03-portfolio-purchase-option.md`.
