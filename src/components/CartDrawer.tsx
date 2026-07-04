"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
    isOpen,
    closeCart,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={closeCart}
        aria-label="Close cart"
      />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-card shadow-[var(--shadow)]">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif text-2xl font-semibold">
            Your Inquiry ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 transition-colors hover:bg-cream"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-muted" />
            <p className="text-lg text-foreground/70">
              Your inquiry list is empty.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="text-accent hover:text-accent-hover font-medium underline underline-offset-4"
            >
              Browse the showroom
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.product.id} className="py-6">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-cream">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-medium">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-foreground/60">
                          {item.product.price ? formatPrice(item.product.price) : "Inquire"}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-md border border-border bg-cream">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-2 hover:text-accent"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[1.5ch] text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-2 hover:text-accent"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-sm text-foreground/50 underline underline-offset-2 hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border bg-cream px-6 py-6">
              <div className="mb-6 flex items-center justify-between text-lg">
                <span className="text-foreground/70">Subtotal</span>
                <span className="font-serif text-xl font-semibold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mb-6 text-sm text-foreground/60">
                Shipping and final pricing will be confirmed after inquiry.
              </p>
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex h-12 w-full items-center justify-center rounded-md bg-walnut font-medium text-cream transition-colors hover:bg-foreground"
              >
                Review Inquiry
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
