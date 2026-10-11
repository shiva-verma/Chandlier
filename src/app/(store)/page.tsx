import Link from "next/link";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getFeatured } from "@/lib/products";
import { CATEGORIES } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { ProductArt } from "@/components/ui/product-art";
import { NewsletterForm } from "@/components/store/newsletter-form";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getFeatured(8);

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 luxe-vignette" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:py-24 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <p className="eyebrow">The {new Date().getFullYear()} collection</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
              Light,
              <br />
              <span className="italic text-gold">sculpted</span> for the room
              it lives in.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory-dim">
              Statement chandeliers and precision smart lighting — designed,
              finished and tuned in-house, then delivered to your door.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex h-14 items-center gap-3 rounded-full bg-gold px-9 text-[0.78rem] uppercase tracking-[0.22em] text-ink transition-all hover:bg-gold-soft hover:shadow-[0_16px_50px_-12px_rgba(198,161,91,0.9)]"
              >
                Explore the collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center rounded-full border border-ink-line px-9 text-[0.78rem] uppercase tracking-[0.22em] text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                Speak with a stylist
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md animate-fade lg:max-w-lg">
            <div className="aspect-square rounded-full border border-gold/20 bg-[radial-gradient(circle_at_50%_40%,rgba(198,161,91,0.25),rgba(11,11,12,0)_65%)] p-6">
              <ProductArt variant={0} className="drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]" />
            </div>
            <p className="mx-auto mt-4 text-center text-[0.62rem] uppercase tracking-[0.3em] text-ivory-dim">
              Aurum Cascade · hand-cut crystal
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Trust strip */}
      <section className="border-y border-ink-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {[
            { icon: Truck, title: "White-glove delivery", sub: "Nationwide, insured" },
            { icon: ShieldCheck, title: "2-year warranty", sub: "Parts & craft" },
            { icon: RotateCcw, title: "30-day returns", sub: "Dust-free pieces" },
            { icon: Sparkles, title: "Smart ready", sub: "Matter, Alexa, HomeKit" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                <item.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-[0.78rem] uppercase tracking-[0.16em]">{item.title}</p>
                <p className="mt-0.5 text-xs text-ivory-dim">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------- Featured */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Featured pieces</h2>
          </div>
          <Link
            href="/shop"
            className="gold-underline pb-1 text-[0.72rem] uppercase tracking-[0.2em] text-gold"
          >
            View all lights
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* --------------------------------------------------- Categories */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <p className="eyebrow text-center">Rooms & moments</p>
        <h2 className="mt-4 text-center font-display text-4xl sm:text-5xl">Shop by style</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-ink-line"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
                <div className="grid h-full place-items-center p-8 opacity-90 transition-transform duration-700 group-hover:scale-[1.04]">
                  <ProductArt variant={i} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[0.62rem] uppercase tracking-[0.26em] text-gold">
                    {c.blurb}
                  </p>
                  <h3 className="mt-1 font-display text-3xl">{c.name}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-ivory-dim transition-colors group-hover:text-gold">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}

          <div className="relative hidden overflow-hidden rounded-2xl border border-gold/30 bg-[radial-gradient(circle_at_50%_20%,rgba(198,161,91,0.25),rgba(11,11,12,0)_70%)] p-8 lg:flex lg:flex-col lg:justify-end">
            <p className="eyebrow">Made to measure</p>
            <h3 className="mt-4 font-display text-3xl leading-snug">
              A commission for your space.
            </h3>
            <p className="mt-3 text-sm text-ivory-dim">
              Tell us your room, and our atelier will draft a bespoke lighting
              scheme around it.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-gold/60 px-6 text-[0.72rem] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Start a commission
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- Smart lighting band */}
      <section className="relative overflow-hidden border-y border-ink-line">
        <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_80%_10%,rgba(198,161,91,0.18),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-sm">
            <div className="aspect-square rounded-full border border-gold/20 p-6">
              <ProductArt variant={1} />
            </div>
          </div>
          <div>
            <p className="eyebrow">Smart lighting</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Candle-warm at dusk.
              <br />
              <span className="italic text-gold">Daylight when you ask.</span>
            </h2>
            <p className="mt-5 max-w-lg text-ivory-dim">
              Our smart range tunes from 2200 K to 6500 K, dims to a whisper and
              answers to Alexa, Google Home, Apple Home and Matter — no hub
              required.
            </p>
            <Link
              href="/shop?category=smart-lighting"
              className="mt-8 inline-flex h-14 items-center gap-3 rounded-full bg-gold px-9 text-[0.78rem] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-gold-soft"
            >
              Explore smart lighting <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Newsletter */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="eyebrow">The atelier letter</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl sm:text-5xl">
          Private previews, first.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ivory-dim">
          One considered letter a month — new pieces, studio notes and invitations
          you won&apos;t find anywhere else.
        </p>
        <NewsletterForm />
      </section>
    </>
  );
}