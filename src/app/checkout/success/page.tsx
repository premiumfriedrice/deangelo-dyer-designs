import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <div className="rounded-full bg-accent/10 p-4">
        <CheckCircle className="h-12 w-12 text-accent" />
      </div>
      <h1 className="mt-8 font-serif text-4xl font-semibold md:text-5xl">
        Inquiry received
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-foreground/70">
        Thank you for your interest. We have received your inquiry and will
        follow up soon with availability, shipping details, and final pricing.
      </p>
      <p className="mt-2 text-foreground/70">
        If you have any questions in the meantime, reach out at{" "}
        <a
          href="mailto:hello@deangelodyerdesigns.com"
          className="text-accent hover:text-accent-hover underline underline-offset-4"
        >
          hello@deangelodyerdesigns.com
        </a>
        .
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/shop"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-walnut px-8 font-medium text-cream transition-colors hover:bg-foreground"
        >
          Continue browsing <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex h-12 items-center justify-center rounded-md border border-foreground/20 px-8 font-medium transition-colors hover:bg-cream"
        >
          View portfolio
        </Link>
      </div>
    </div>
  );
}
