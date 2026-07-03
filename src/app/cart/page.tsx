"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems, clearCart } =
    useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    preferredContact: "email",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate inquiry submission. In production, send to an API or email service.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-32 text-center">
        <ShoppingBag className="h-16 w-16 text-muted" />
        <h1 className="mt-6 font-serif text-4xl font-semibold">
          Your inquiry list is empty
        </h1>
        <p className="mt-3 text-foreground/70">
          Add pieces from the shop to start a conversation.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-walnut px-8 font-medium text-cream transition-colors hover:bg-foreground"
        >
          Browse the showroom <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16">
      <h1 className="font-serif text-5xl font-semibold md:text-6xl">
        Inquiry
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-foreground/70">
        Review your selected pieces and tell us a little about where they will
        live. We will follow up with availability, shipping, and final pricing.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-5">
        {/* Cart items */}
        <div className="lg:col-span-3">
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.product.id} className="flex gap-6 py-8">
                <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md bg-cream">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="font-serif text-xl font-medium hover:text-accent"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-foreground/60">
                      {formatPrice(item.product.price)} each
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
                      <span className="min-w-[2ch] text-center font-medium">
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
                      className="flex items-center gap-2 text-sm text-foreground/50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-end">
            <div className="text-right">
              <p className="text-sm text-foreground/60">
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </p>
              <p className="mt-1 font-serif text-3xl font-semibold">
                {formatPrice(subtotal)}
              </p>
              <p className="mt-2 text-sm text-foreground/50">
                Shipping and tax calculated after inquiry.
              </p>
            </div>
          </div>
        </div>

        {/* Checkout form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-md border border-border bg-card p-8 shadow-[var(--shadow)]"
          >
            <h2 className="font-serif text-2xl font-semibold">
              Your details
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground/70"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-border bg-cream px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground/70"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-border bg-cream px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground/70"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-border bg-cream px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-foreground/70"
                >
                  Shipping address
                </label>
                <input
                  id="address"
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-border bg-cream px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-foreground/70"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-border bg-cream px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-foreground/70"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-border bg-cream px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium text-foreground/70"
                  >
                    ZIP
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    required
                    value={form.zip}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-border bg-cream px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="preferredContact"
                  className="block text-sm font-medium text-foreground/70"
                >
                  Preferred contact
                </label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={form.preferredContact}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-border bg-cream px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="instagram">Instagram DM</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground/70"
                >
                  Notes or questions
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-border bg-cream px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-md bg-walnut font-medium text-cream transition-colors hover:bg-foreground disabled:opacity-70"
            >
              {submitting ? "Sending inquiry..." : "Send inquiry"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 text-center text-xs text-foreground/50">
              No payment will be collected now. We will confirm details before
              anything is finalized.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
