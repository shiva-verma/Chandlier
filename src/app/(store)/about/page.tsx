import Link from "next/link";
import { ProductArt } from "@/components/ui/product-art";

const VALUES = [
  {
    title: "Drawn, not sourced",
    body: "Every silhouette is designed in-house and refined against a real room before it earns a catalogue number.",
  },
  {
    title: "Finished by hand",
    body: "Brass is patinated, glass is blown and edges are dressed by hands that have done it for decades.",
  },
  {
    title: "Light you can tune",
    body: "From candle-warm crystal to app-driven smart scenes, the glow is part of the design, never an afterthought.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 luxe-vignette" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The studio</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.08] text-ink sm:text-6xl">
              Tejora is built on one idea —{" "}
              <span className="italic text-gold-deep">light as design.</span>
            </h1>
            <p className="mt-6 max-w-lg leading-relaxed text-taupe">
              Tejora began in a one-room Mumbai workshop with a brass ring
              and an unsolvable problem: why should beautiful rooms end in
              ordinary light? A decade later we design, finish and test every
              fixture under our own roof before it ships anywhere in the country.
            </p>
          </div>
          <div className="animate-fade rounded-2xl border border-brass/20 bg-[radial-gradient(circle_at_50%_35%,rgba(178,148,99,0.18),rgba(244,239,230,0)_70%)] p-10">
            <ProductArt variant={2} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl border border-ink-line p-8 transition-colors hover:border-brass/50"
            >
              <p className="font-display text-4xl text-gold-deep">0{i + 1}</p>
              <h2 className="mt-4 font-display text-2xl text-ink">{v.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-taupe">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 text-center">
        <h2 className="font-display text-4xl text-ink">Come see the workshop.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-taupe">
          Book a viewing on WhatsApp and watch a fixture being finished before
          your eyes.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex h-13 items-center rounded-full bg-ink px-9 py-4 text-[0.76rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft"
        >
          Plan a visit
        </Link>
      </section>
    </>
  );
}
