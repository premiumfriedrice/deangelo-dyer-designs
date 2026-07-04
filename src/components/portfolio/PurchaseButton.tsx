"use client";

import { ShoppingBag } from "lucide-react";
import { PortfolioItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface PurchaseButtonProps {
  item: PortfolioItem;
}

export function PurchaseButton({ item }: PurchaseButtonProps) {
  const { addItem } = useCart();

  if (!item.forSale || !item.price) {
    return null;
  }

  return (
    <button
      onClick={() => addItem(item)}
      className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-walnut px-8 font-medium text-cream transition-colors hover:bg-foreground"
    >
      <ShoppingBag className="h-5 w-5" />
      Add to inquiry cart — {formatPrice(item.price)}
    </button>
  );
}
