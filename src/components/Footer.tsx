import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

const shopLinks = [
  { href: "/shop", label: "All Items" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About the Maker" },
];

const supportLinks = [
  { href: "#", label: "Custom Orders" },
  { href: "#", label: "Shipping & Delivery" },
  { href: "#", label: "Care Guide" },
  { href: "#", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-walnut text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold">
              [Business Name]
            </h3>
            <p className="text-cream/70">
              A virtual showroom for handcrafted items, made with patience and
              intention.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
              Showroom
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@deangelodyerdesigns.com"
                  className="flex items-center gap-3 text-cream/70 transition-colors hover:text-cream"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  hello@deangelodyerdesigns.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-cream/70 transition-colors hover:text-cream"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  (555) 123-4567
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-cream/70">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  123 Workshop Lane, Studio B
                  <br />
                  Portland, OR 97201
                </span>
              </li>
              <li>
                <a
                  href="https://instagram.com/deangelodyerdesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream/70 transition-colors hover:text-cream"
                >
                  <InstagramIcon className="h-5 w-5 text-accent" />
                  @deangelodyerdesigns
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-sm text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} [Business Name]. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-cream">
              Privacy
            </Link>
            <Link href="#" className="hover:text-cream">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
