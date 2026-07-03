"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { useCart } from "@/context/CartContext";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { totalItems, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-serif text-2xl font-semibold tracking-tight">
              Deangelo Dyer
            </span>
            <span className="hidden text-xs font-medium uppercase tracking-widest text-muted sm:inline">
              Designs
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest text-foreground/80 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/deangelodyerdesigns"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full p-2.5 text-foreground/70 transition-colors hover:bg-cream hover:text-accent md:inline-flex"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>

            <button
              onClick={openCart}
              className="relative rounded-full p-2.5 text-foreground/70 transition-colors hover:bg-cream hover:text-accent"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-cream">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2.5 text-foreground/70 transition-colors hover:bg-cream hover:text-accent md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer />
    </>
  );
}
