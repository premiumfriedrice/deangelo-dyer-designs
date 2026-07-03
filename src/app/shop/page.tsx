import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function ShopPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Shop
        </p>
        <h1 className="font-serif text-5xl font-semibold md:text-6xl">
          The collection
        </h1>
        <p className="mt-5 text-lg text-foreground/70">
          Each item is made to order or available in limited quantities. Add
          pieces to your inquiry cart to start a conversation.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col bg-card rounded-md overflow-hidden border border-border transition-shadow hover:shadow-[var(--shadow)]"
          >
            <Link href={`/shop/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-cream">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {product.category}
                </span>
                <span className="font-serif text-lg font-semibold text-accent">
                  {formatPrice(product.price)}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-medium">
                <Link href={`/shop/${product.slug}`}>{product.name}</Link>
              </h2>
              <p className="mt-3 line-clamp-2 flex-1 text-foreground/70">
                {product.description}
              </p>
              <Link
                href={`/shop/${product.slug}`}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-md border border-foreground/20 text-sm font-medium transition-colors hover:bg-cream"
              >
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
