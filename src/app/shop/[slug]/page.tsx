"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { products } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();

  if (!product) {
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
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {product.category}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-6 font-serif text-3xl font-semibold text-foreground">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-foreground/70">
            {product.description}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {product.materials && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                  Materials
                </h3>
                <ul className="mt-2 space-y-1 text-foreground/80">
                  {product.materials.map((material) => (
                    <li key={material} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-accent" />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.dimensions && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                  Dimensions
                </h3>
                <p className="mt-2 text-foreground/80">{product.dimensions}</p>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => addItem(product)}
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
