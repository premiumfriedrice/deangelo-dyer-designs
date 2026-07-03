"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 h-full w-80 max-w-full bg-card shadow-[var(--shadow)]">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="font-serif text-xl font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-cream"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-6 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-border py-4 font-serif text-2xl font-medium transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border px-6 py-6">
          <a
            href="https://instagram.com/deangelodyerdesigns"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-accent"
          >
            <InstagramIcon className="h-5 w-5" />
            @deangelodyerdesigns
          </a>
        </div>
      </aside>
    </div>
  );
}
