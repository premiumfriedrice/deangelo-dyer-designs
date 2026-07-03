import Image from "next/image";

const values = [
  {
    title: "Material first",
    description:
      "Every piece begins with the wood itself — its grain, its history, and what it wants to become.",
  },
  {
    title: "Made to last",
    description:
      "No shortcuts. Traditional joinery, quality finishes, and designs that age gracefully.",
  },
  {
    title: "Custom welcome",
    description:
      "Whether it is a small gift or a dining table, custom work starts with a conversation.",
  },
];

const process = [
  { step: "01", title: "Consult", description: "We talk through ideas, size, wood, and budget." },
  { step: "02", title: "Design", description: "A sketch or proposal is refined until it feels right." },
  { step: "03", title: "Build", description: "The piece is made by hand in the workshop." },
  { step: "04", title: "Deliver", description: "Finished, inspected, and delivered with care." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md lg:aspect-[3/4]">
            <Image
              src="https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&w=1200&q=80"
              alt="Portrait of the maker in his workshop"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              About the Maker
            </p>
            <h1 className="font-serif text-5xl font-semibold md:text-6xl">
              Deangelo Dyer
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              Deangelo is a woodworker based in Portland, Oregon. What began as
              a way to build furniture for his own home grew into a practice
              centered on patience, material respect, and the belief that the
              things we use every day should be beautiful.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/70">
              His virtual showroom is a way to share finished work, current
              pieces, and the quiet process behind them. Every item here is
              either ready to ship or made to order.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/70">
              When he is not in the shop, you will find him sourcing lumber,
              sketching new forms, or documenting the process on Instagram.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <h2 className="mb-12 font-serif text-4xl font-semibold md:text-5xl">
            Values
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="border-l-2 border-accent pl-6">
                <h3 className="font-serif text-2xl font-medium">
                  {value.title}
                </h3>
                <p className="mt-3 text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <h2 className="mb-12 font-serif text-4xl font-semibold md:text-5xl">
          The Process
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <div key={item.step} className="relative">
              <span className="font-serif text-6xl font-semibold text-accent/20">
                {item.step}
              </span>
              <h3 className="mt-2 font-serif text-2xl font-medium">
                {item.title}
              </h3>
              <p className="mt-3 text-foreground/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
