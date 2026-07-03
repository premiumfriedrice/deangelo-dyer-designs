import { Product, PortfolioItem } from "./types";

export const products: Product[] = [
  {
    id: "p1",
    slug: "walnut-serving-board",
    name: "Walnut Serving Board",
    price: 145,
    description:
      "A hand-rubbed walnut serving board with live edge detail and brass feet. Perfect for entertaining or display.",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1603199832058-d750f712b8a4?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1603199832058-d750f712b8a4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615486363973-f1d2d6457588?auto=format&fit=crop&w=1200&q=80",
    ],
    materials: ["Black walnut", "Food-safe oil", "Brass"],
    dimensions: '18" x 10" x 1"',
    inStock: true,
    featured: true,
  },
  {
    id: "p2",
    slug: "oak-dining-table",
    name: "White Oak Dining Table",
    price: 2400,
    description:
      "A solid white oak dining table built for gathering. Trestle base with hand-shaped joinery and a matte oil finish.",
    category: "Tables",
    image:
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=1200&q=80",
    ],
    materials: ["White oak", "Osmo Polyx oil", "Steel pins"],
    dimensions: '72" x 36" x 30"',
    inStock: true,
    featured: true,
  },
  {
    id: "p3",
    slug: "cherry-keepsake-box",
    name: "Cherry Keepsake Box",
    price: 185,
    description:
      "A small cherry box with a fitted lid and soft suede lining. Ideal for jewelry, letters, or keepsakes.",
    category: "Boxes",
    image:
      "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&w=1200&q=80",
    ],
    materials: ["Cherry", "Suede lining", "Beeswax finish"],
    dimensions: '8" x 5" x 3"',
    inStock: true,
    featured: true,
  },
  {
    id: "p4",
    slug: "maple-wall-shelf",
    name: "Curly Maple Wall Shelf",
    price: 220,
    description:
      "A floating shelf in figured maple with hidden mounting hardware. A quiet accent for any room.",
    category: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    materials: ["Curly maple", "Walnut dowels"],
    dimensions: '24" x 8" x 1.5"',
    inStock: true,
  },
  {
    id: "p5",
    slug: "walnut-bench",
    name: "Walnut Entry Bench",
    price: 875,
    description:
      "A low walnut bench with a sculpted seat and tapered legs. Built for an entryway or foot of the bed.",
    category: "Seating",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    materials: ["Black walnut", "Osmo finish"],
    dimensions: '48" x 14" x 18"',
    inStock: true,
  },
  {
    id: "p6",
    slug: "oak-cutting-board",
    name: "End-Grain Cutting Board",
    price: 95,
    description:
      "A durable end-grain cutting board that is gentle on knives and beautiful enough to leave on the counter.",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1584646886686-1e6a3b6e2a6a?auto=format&fit=crop&w=800&q=80",
    materials: ["White oak", "Maple", "Mineral oil"],
    dimensions: '14" x 11" x 1.5"',
    inStock: true,
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "g1",
    title: "Live Edge Console",
    category: "Tables",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    description: "A single-slab walnut console with hairpin legs.",
    year: "2024",
    materials: ["Black walnut", "Blackened steel", "Rubio Monocoat"],
    story:
      "Sourced from a fallen urban walnut tree. The live edge was preserved to keep the tree’s original silhouette intact.",
    details: [
      { label: "Dimensions", value: '60" x 14" x 30"' },
      { label: "Year", value: "2024" },
      { label: "Commission", value: "Private residence" },
    ],
  },
  {
    id: "g2",
    title: "Turned Walnut Bowl",
    category: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80",
    description: "Hand-turned bowl with a burnished rim.",
    year: "2024",
    materials: ["Black walnut", "Beeswax finish"],
    story:
      "Turned from a single offcut too small for furniture. The rim was lightly charred before finishing to deepen the grain contrast.",
    details: [
      { label: "Dimensions", value: '11" x 11" x 4"' },
      { label: "Year", value: "2024" },
      { label: "Edition", value: "One of a kind" },
    ],
  },
  {
    id: "g3",
    title: "Pendant Light Pair",
    category: "Lighting",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    description: "Spalted maple shades with brass hardware.",
    year: "2023",
    materials: ["Spalted maple", "Brass", "Linen cord"],
    story:
      "Created for a reading nook. The spalted grain patterns are unique to each shade, so no two lights are alike.",
    details: [
      { label: "Dimensions", value: '8" dia. x 7" h' },
      { label: "Year", value: "2023" },
      { label: "Quantity", value: "Pair" },
    ],
  },
  {
    id: "g4",
    title: "Coffee Table",
    category: "Tables",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80",
    description: "White oak coffee table with a bookmatched top.",
    year: "2023",
    materials: ["White oak", "Osmo Polyx", "Tapered legs"],
    story:
      "The top is bookmatched from sequential boards so the grain flows continuously across the width.",
    details: [
      { label: "Dimensions", value: '48" x 24" x 16"' },
      { label: "Year", value: "2023" },
      { label: "Finish", value: "Matte oil" },
    ],
  },
  {
    id: "g5",
    title: "Desk Organizer",
    category: "Boxes",
    image:
      "https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&w=800&q=80",
    description: "Cherry and brass desk caddy.",
    year: "2024",
    materials: ["Cherry", "Brass pins", "Shellac"],
    story:
      "A compact piece designed to hold pens, letters, and small tools without taking over the desk.",
    details: [
      { label: "Dimensions", value: '10" x 5" x 4"' },
      { label: "Year", value: "2024" },
      { label: "Use", value: "Desk storage" },
    ],
  },
  {
    id: "g6",
    title: "Rocking Chair",
    category: "Seating",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80",
    description: "A sculptural rocking chair in ash and leather.",
    year: "2022",
    materials: ["Ash", "Vegetable-tanned leather", "Osmo oil"],
    story:
      "The runner profile was shaped by hand over several days to achieve a smooth, balanced rock.",
    details: [
      { label: "Dimensions", value: '22" x 32" x 38"' },
      { label: "Year", value: "2022" },
      { label: "Seat", value: "Leather sling" },
    ],
  },
];

export const categories = Array.from(
  new Set([...products.map((p) => p.category), ...portfolioItems.map((p) => p.category)])
);
