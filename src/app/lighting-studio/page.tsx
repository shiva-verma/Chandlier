import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function LightingStudioPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav className="text-[0.66rem] uppercase tracking-[0.22em] text-taupe">
        <Link href="/" className="hover:text-gold-deep">Home</Link>
        <span className="mx-2 text-taupe/40">/</span>
        <span className="text-ink">Lighting Studio</span>
      </nav>

      <header className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Lighting Studio</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-ink sm:text-6xl">Find your perfect light</h1>
          <p className="mt-4 max-w-lg text-lg text-taupe">Answer a few questions about your space and we'll recommend the ideal lighting solutions for your room.</p>
          <div className="mt-8">
            <button className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft">
              Start questionnaire <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-ink-line">
          <img src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80" alt="Lighting design studio" className="h-full min-h-[320px] w-full object-cover" />
        </div>
      </header>

      <section className="mt-20">
        <div className="text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Personalized recommendations</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "01", title: "Tell us about your room", desc: "Room type, dimensions, and ceiling height" },
            { step: "02", title: "Share your style", desc: "Design preferences and finish choices" },
            { step: "03", title: "Set your budget", desc: "Define your price range" },
            { step: "04", title: "Get recommendations", desc: "Receive curated product suggestions" },
          ].map((item) => (
            <article key={item.step} className="rounded-2xl border border-ink-line bg-white p-6">
              <span className="font-display text-3xl text-gold-deep">{item.step}</span>
              <h3 className="mt-3 font-display text-xl text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-taupe">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}