import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { portfolioItems } from "@/lib/data";
import { PortfolioPlaque } from "@/components/portfolio/PortfolioPlaque";
import { ViewInShop } from "@/components/portfolio/ViewInShop";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = portfolioItems.find((p) => p.id === id);
  return {
    title: item
      ? `${item.title} | Virtual Showroom`
      : "Exhibit | Virtual Showroom",
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

            <ViewInShop item={item} />

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
              <p className="text-[10px] uppercase tracking-widest text-muted">
                Previous
              </p>
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
              <p className="text-[10px] uppercase tracking-widest text-muted">
                Next
              </p>
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
