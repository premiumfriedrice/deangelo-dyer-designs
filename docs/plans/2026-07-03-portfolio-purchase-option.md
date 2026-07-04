# Portfolio Purchase Option Implementation Plan

> **REQUIRED SUB-SKILL:** Use the executing-plans skill or subagent-driven-development to implement this plan task-by-task.

**Goal:** Make portfolio items purchasable by unifying `Product` and `PortfolioItem`, replacing shop inventory with a filtered subset of the portfolio, and adding an "Add to cart" option on portfolio detail pages for for-sale pieces.

**Architecture:** `PortfolioItem` becomes the single source of truth. The shop page filters `portfolioItems` by `forSale: true`. The cart context, shop detail page, and home featured section all consume `PortfolioItem`. Existing standalone `Product` type and `products` array are removed.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, lucide-react.

---

## Task 1: Extend `PortfolioItem` type and remove `Product`

**Files:**
- Modify: `src/lib/types.ts`

**Step 1: Update types**

Remove the `Product` interface and extend `PortfolioItem`:

```ts
export interface PortfolioDetail {
  label: string;
  value: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  materials: string[];
  story?: string;
  details: PortfolioDetail[];
  forSale: boolean;
  price?: number;
  featured?: boolean;
}

export interface CartItem {
  product: PortfolioItem;
  quantity: number;
}
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: errors in files still referencing `Product` (expected at this stage)

**Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "refactor(types): unify Product into PortfolioItem and add forSale/price/featured"
```

---

## Task 2: Replace data with new portfolio items

**Files:**
- Modify: `src/lib/data.ts`

**Step 1: Replace portfolio items**

Replace the existing `portfolioItems` array with the new pieces. Keep the existing 6 pieces plus the 8 new ones, or replace entirely. Per user request, switch to the examples given; retain existing pieces only if they fit. For this plan, replace with the new examples plus keep a curated mix. Here is the target data:

Categories: Cutting Boards, Kitchen, Shelves, Bath, Tables, Home Decor, Lighting, Seating, Boxes.

New items:

- Cutting board (salvaged face grain wood) — Cutting Boards — not for sale
- End grain pecan butcher block — Cutting Boards — not for sale
- Olive wood vase / utensil holder — Kitchen — not for sale
- Black walnut shelf — Shelves — for sale, random price
- Carved black edge live walnut shelf — Shelves — for sale, random price
- Live edge floating walnut shelf — Shelves — for sale, random price
- Mesquite torch shelf — Shelves — for sale, random price
- Pecan bathroom counter with backsplash — Bath — not for sale

Also keep existing 6 pieces (Live Edge Console, Turned Walnut Bowl, Pendant Light Pair, Coffee Table, Desk Organizer, Rocking Chair) as portfolio-only, with `forSale: false`.

Remove the `products` array entirely. Update `categories` to derive from `portfolioItems` only.

```ts
export const categories = Array.from(
  new Set(portfolioItems.map((p) => p.category))
);
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: errors in consumers (shop pages, cart, home)

**Step 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat(data): add new portfolio items and remove standalone products array"
```

---

## Task 3: Update `CartContext` to use `PortfolioItem`

**Files:**
- Modify: `src/context/CartContext.tsx`

**Step 1: Update imports and types**

Replace `Product` import with `PortfolioItem`. Update `addItem` signature.

```tsx
import { PortfolioItem, CartItem } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: PortfolioItem, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}
```

Update all internal `Product` references to `PortfolioItem`. Use `product.id` instead of `product.slug` for cart keys.

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: errors only in shop/home pages now

**Step 3: Commit**

```bash
git add src/context/CartContext.tsx
git commit -m "refactor(cart): switch CartContext from Product to PortfolioItem"
```

---

## Task 4: Update shop page to filter for-sale portfolio items

**Files:**
- Modify: `src/app/shop/page.tsx`

**Step 1: Replace data source**

```tsx
import { portfolioItems } from "@/lib/data";

const shopItems = portfolioItems.filter((item) => item.forSale);
```

Render `shopItems` instead of `products`. Use `item.id` and `item.title` etc. Link to `/shop/${item.slug}`.

**Step 2: Verify TypeScript and lint**

Run:
```bash
npx tsc --noEmit
npm run lint
```
Expected: no errors

**Step 3: Commit**

```bash
git add src/app/shop/page.tsx
git commit -m "feat(shop): display portfolio items marked for sale"
```

---

## Task 5: Update shop detail route

**Files:**
- Modify: `src/app/shop/[slug]/page.tsx`

**Step 1: Replace data source and types**

```tsx
import { portfolioItems } from "@/lib/data";
import { PortfolioItem } from "@/lib/types";

export default function ShopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const item = portfolioItems.find((p) => p.slug === slug && p.forSale);
  // ...
}
```

Update all `product` references to `item`. Use `item.title`, `item.price`, etc. Keep add-to-cart button.

**Step 2: Verify TypeScript and lint**

Run:
```bash
npx tsc --noEmit
npm run lint
```
Expected: no errors

**Step 3: Commit**

```bash
git add src/app/shop/[slug]/page.tsx
git commit -m "feat(shop): use portfolio items in detail page"
```

---

## Task 6: Update home page featured section

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Replace products with portfolio items**

```tsx
import { portfolioItems } from "@/lib/data";

const featured = portfolioItems
  .filter((p) => p.forSale && p.featured)
  .slice(0, 3);
```

Update render to use `item.id`, `item.title`, `item.price`, `item.slug`, etc.

Mark the four shelves as `featured: true` in data so the home page has content, or mark a subset.

**Step 2: Verify TypeScript and lint**

Run:
```bash
npx tsc --noEmit
npm run lint
```
Expected: no errors

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): feature for-sale portfolio items"
```

---

## Task 7: Add purchase CTA to portfolio detail page

**Files:**
- Modify: `src/app/portfolio/[id]/page.tsx`

**Step 1: Add cart integration**

Make the page a client component (or wrap a client CTA component) so it can call `addItem`. Simpler: convert the page to `"use client"` and import `useCart`.

```tsx
"use client";

import { use } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
// ...

export default function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addItem } = useCart();
  const item = portfolioItems.find((p) => p.id === id);
  // ...
}
```

Add an "Add to inquiry cart" button when `item.forSale && item.price`:

```tsx
{item.forSale && item.price && (
  <button
    onClick={() => addItem(item)}
    className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-walnut px-8 font-medium text-cream transition-colors hover:bg-foreground"
  >
    <ShoppingBag className="h-5 w-5" />
    Add to inquiry cart — {formatPrice(item.price)}
  </button>
)}
```

Import `formatPrice` from `@/lib/utils`.

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
git commit -m "feat(portfolio): add purchase CTA to exhibit pages"
```

---

## Task 8: Verify full build and clean up references

**Files:**
- Search: all `Product` / `products` references

**Step 1: Search for leftover references**

Run:
```bash
grep -R "Product\|from '@/lib/data'.*products\|import.*products" src/
```
Expected: no references to `Product` type or `products` array except in comments

**Step 2: Run full verification**

```bash
npx tsc --noEmit
npm run lint
npm run build
```
Expected: all pass

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: verify build after unifying Product into PortfolioItem"
```

---

## Task 9: Update handoff doc

**Files:**
- Modify: `docs/handoff/2026-07-02-portfolio-museum-plaques.md`

**Step 1: Append notes**

Add:

```markdown
## Update: Portfolio Purchase Option

- Added `forSale`, `price`, `featured`, and `slug` fields to `PortfolioItem`.
- Shop is now a filtered view of portfolio items where `forSale: true`.
- Removed standalone `Product` type and `products` array.
- Added "Add to inquiry cart" CTA on `/portfolio/[id]` for for-sale pieces.
- Added new portfolio examples: cutting boards, butcher block, utensil vase, shelves, bathroom counter.
```

**Step 2: Commit**

```bash
git add docs/handoff/2026-07-02-portfolio-museum-plaques.md
git commit -m "docs: update handoff with purchase option scope"
```

---

## Testing Checklist

- [ ] `PortfolioItem` type includes `slug`, `forSale`, `price`, `featured`.
- [ ] `Product` type and `products` array no longer exist.
- [ ] `/shop` displays only `forSale: true` portfolio items.
- [ ] `/shop/[slug]` loads a for-sale portfolio item and shows price + add-to-cart.
- [ ] `/portfolio/[id]` shows "Add to inquiry cart" only when `forSale` and `price` are set.
- [ ] Home page featured section shows featured for-sale items.
- [ ] Cart drawer shows added portfolio items correctly.
- [ ] Cart totals use `item.price`.
- [ ] `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass.
