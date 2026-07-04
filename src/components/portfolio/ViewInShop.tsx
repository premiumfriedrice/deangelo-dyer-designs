import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ViewInShopProps {
  item: PortfolioItem;
}

export function ViewInShop({ item }: ViewInShopProps) {
  if (!item.forSale || !item.price) {
    return null;
  }

  return (
    <Link
      href={`/shop/${item.slug}`}
      className="mt-8 inline-flex items-center gap-2 rounded-md bg-walnut px-8 py-4 text-sm font-medium text-cream transition-colors hover:bg-foreground"
    >
      View this piece in the shop — {formatPrice(item.price)}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
