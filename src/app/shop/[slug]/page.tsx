"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { portfolioItems } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function ShopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const item = portfolioItems.find((p) => p.slug === slug && p.forSale);
  const { addItem } = useCart();

  if (!item) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-cream lg:aspect-square">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {item.category}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            {item.title}
          </h1>
          <p className="mt-6 font-serif text-3xl font-semibold text-foreground">
            {item.price ? formatPrice(item.price) : "Inquire"}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-foreground/70">
            {item.description}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Materials
              </h3>
              <ul className="mt-2 space-y-1 text-foreground/80">
                {item.materials.map((material) => (
                  <li key={material} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-accent" />
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Details
              </h3>
              <dl className="mt-2 space-y-1 text-foreground/80">
                {item.details.map((detail) => (
                  <div key={detail.label} className="flex justify-between">
                    <dt className="text-foreground/60">{detail.label}</dt>
                    <dd className="font-medium">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => addItem(item)}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-walnut px-8 font-medium text-cream transition-colors hover:bg-foreground"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to inquiry cart
            </button>
          </div>

          <p className="mt-4 text-sm text-foreground/50">
            Shipping and final pricing will be confirmed after inquiry.
          </p>
        </div>
      </div>
    </div>
  );
}
