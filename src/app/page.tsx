import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&w=1920&q=80"
            alt="Handcrafted woodwork in a sunlit workshop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 py-32">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Virtual Showroom
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[1.1] text-foreground md:text-7xl lg:text-8xl">
              Handcrafted
              <br />
              items, made
              <br />
              to endure.
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground/70">
              A curated collection of wooden goods by [Business Name]. Explore the
              portfolio, request a piece, or start a custom conversation.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-walnut px-8 font-medium text-cream transition-colors hover:bg-foreground"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex h-14 items-center justify-center rounded-md border border-foreground/20 bg-background/80 px-8 font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-cream"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Featured
            </p>
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">
              In the showroom
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-accent sm:inline-flex"
          >
            Shop all items <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-cream">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/60">
                    {product.category}
                  </p>
                </div>
                <span className="font-medium text-accent">
                  {formatPrice(product.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-accent"
          >
            Shop all items <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&w=1200&q=80"
              alt="Woodworker at the bench"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 md:p-16 lg:p-24">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              About the Maker
            </p>
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">
              Patience, grain, and intention.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              Every piece starts with a conversation — with the wood, with the
              space it will live in, and with the hands that will use it.
              [Business Name] builds handcrafted items that honor the material and
              the moment.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-widest hover:text-accent"
            >
              Read the story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 text-center">
        <InstagramIcon className="mx-auto h-8 w-8 text-accent" />
        <h2 className="mt-4 font-serif text-3xl font-semibold md:text-4xl">
          Follow the work in progress
        </h2>
        <p className="mx-auto mt-4 max-w-md text-foreground/70">
          Behind-the-scenes shots, works in progress, and finished pieces on
          Instagram.
        </p>
        <a
          href="https://instagram.com/deangelodyerdesigns"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md border border-foreground/20 px-6 font-medium transition-colors hover:bg-cream"
        >
          @deangelodyerdesigns
        </a>
      </section>
    </div>
  );
}
