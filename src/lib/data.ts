import { PortfolioItem } from "./types";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "g7",
    slug: "salvaged-face-grain-cutting-board",
    title: "Salvaged Face Grain Cutting Board",
    category: "Cutting Boards",
    image:
      "https://images.unsplash.com/photo-1603199832058-d750f712b8a4?auto=format&fit=crop&w=800&q=80",
    description:
      "A generous cutting board built from salvaged face-grain lumber, finished with food-safe oil.",
    year: "2024",
    materials: ["Mixed hardwoods", "Food-safe mineral oil", "Beeswax"],
    story:
      "Built from offcuts left over from larger furniture projects. The varied grain makes each board one of a kind.",
    details: [
      { label: "Dimensions", value: '18" x 12" x 1"' },
      { label: "Year", value: "2024" },
      { label: "Use", value: "Prep / serving" },
    ],
    forSale: false,
  },
  {
    id: "g8",
    slug: "end-grain-pecan-butcher-block",
    title: "End Grain Pecan Butcher Block",
    category: "Cutting Boards",
    image:
      "https://images.unsplash.com/photo-1584646886686-1e6a3b6e2a6a?auto=format&fit=crop&w=800&q=80",
    description:
      "A heavy end-grain butcher block in pecan, kind to knives and built to last decades.",
    year: "2024",
    materials: ["Pecan", "Food-safe mineral oil", "Rubber feet"],
    story:
      "End-grain construction hides knife marks and self-heals over time. Finished with multiple coats of mineral oil.",
    details: [
      { label: "Dimensions", value: '16" x 12" x 2"' },
      { label: "Year", value: "2024" },
      { label: "Construction", value: "End grain" },
    ],
    forSale: false,
  },
  {
    id: "g9",
    slug: "olive-wood-utensil-vase",
    title: "Olive Wood Utensil Vase",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1584694505824-73315ec1af3f?auto=format&fit=crop&w=800&q=80",
    description:
      "A tall olive wood vase shaped to hold cooking utensils by the stove.",
    year: "2024",
    materials: ["Olive wood", "Beeswax finish"],
    story:
      "Turned from a single piece of olive wood with the natural bark edge left intact at the rim.",
    details: [
      { label: "Dimensions", value: '5" dia. x 9" h' },
      { label: "Year", value: "2024" },
      { label: "Use", value: "Utensil holder" },
    ],
    forSale: false,
  },
  {
    id: "g10",
    slug: "black-walnut-shelf",
    title: "Black Walnut Shelf",
    category: "Shelves",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    description:
      "A solid black walnut shelf with clean edges and hidden mounting hardware.",
    year: "2024",
    materials: ["Black walnut", "Steel brackets", "Osmo oil"],
    story:
      "Designed to disappear into the wall while letting the walnut grain take center stage.",
    details: [
      { label: "Dimensions", value: '30" x 8" x 1.5"' },
      { label: "Year", value: "2024" },
      { label: "Mount", value: "Hidden floating" },
    ],
    forSale: true,
    price: 185,
    featured: true,
  },
  {
    id: "g11",
    slug: "carved-live-edge-walnut-shelf",
    title: "Carved Black Edge Live Walnut Shelf",
    category: "Shelves",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    description:
      "A live-edge walnut shelf with a hand-carved undercut edge and darkened details.",
    year: "2024",
    materials: ["Black walnut", "Rubio Monocoat", "Steel pins"],
    story:
      "The underside is carved away to create a lighter silhouette while keeping the full live edge on top.",
    details: [
      { label: "Dimensions", value: '36" x 10" x 2"' },
      { label: "Year", value: "2024" },
      { label: "Edge", value: "Live / carved" },
    ],
    forSale: true,
    price: 240,
    featured: true,
  },
  {
    id: "g12",
    slug: "live-edge-floating-walnut-shelf",
    title: "Live Edge Floating Walnut Shelf",
    category: "Shelves",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80",
    description:
      "A floating walnut shelf that appears to hover on the wall with no visible hardware.",
    year: "2023",
    materials: ["Black walnut", "Steel cleat", "Osmo Polyx"],
    story:
      "The wall cleat is recessed into the shelf body so the slab floats cleanly away from the wall.",
    details: [
      { label: "Dimensions", value: '28" x 9" x 1.75"' },
      { label: "Year", value: "2023" },
      { label: "Mount", value: "Floating cleat" },
    ],
    forSale: true,
    price: 210,
    featured: true,
  },
  {
    id: "g13",
    slug: "mesquite-torch-shelf",
    title: "Mesquite Torch Shelf",
    category: "Shelves",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    description:
      "A mesquite shelf with a lightly torched surface that brings out the grain and adds depth.",
    year: "2023",
    materials: ["Mesquite", "Shou sugi ban torch finish", "Osmo oil"],
    story:
      "The face is gently charred with a torch, then brushed and sealed to create a dark, textured surface.",
    details: [
      { label: "Dimensions", value: '32" x 8" x 1.5"' },
      { label: "Year", value: "2023" },
      { label: "Finish", value: "Torch / brushed" },
    ],
    forSale: true,
    price: 195,
    featured: true,
  },
  {
    id: "g14",
    slug: "pecan-bathroom-counter",
    title: "Pecan Bathroom Counter with Backsplash",
    category: "Bath",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80",
    description:
      "A continuous pecan bathroom counter with an integrated backsplash and undermount sink cutout.",
    year: "2023",
    materials: ["Pecan", "Rubio Monocoat", "Waterproof adhesive"],
    story:
      "Built as a single slab to avoid seams at the sink. The backsplash is shaped from the same board.",
    details: [
      { label: "Dimensions", value: '48" x 22" x 1.5"' },
      { label: "Year", value: "2023" },
      { label: "Install", value: "Custom fit" },
    ],
    forSale: false,
  },
];

export const categories = Array.from(
  new Set(portfolioItems.map((p) => p.category))
);
