import Link from "next/link";
import { ArrowRight, CheckCircle2, Users, FileText, HeadphonesIcon, Package } from "lucide-react";

export default function TradePage() {
  const benefits = [
    { icon: Package, title: "Exclusive dealer pricing", desc: "Access to competitive wholesale rates for qualified partners." },
    { icon: FileText, title: "Bulk order quotations", desc: "Submit combined requests and receive detailed quotations." },
    { icon: Users, title: "Project-based quotations", desc: "Dedicated support for large-scale projects and developments." },
    { icon: HeadphonesIcon, title: "Dedicated business support", desc: "Direct line to our trade team for assistance." },
  ];

  const partners = ["Retailers", "Distributors", "Interior Designers", "Architects", "Contractors", "Builders & Developers", "Hospitality Businesses", "Commercial Project Owners"];

  const steps = [
    { step: "01", title: "Register your business", desc: "Submit your trade application with business details." },
    { step: "02", title: "Get verified", desc: "Our team reviews and verifies your application." },
    { step: "03", title: "Access trade catalogue", desc: "Once approved, access wholesale pricing and trade features." },
    { step: "04", title: "Submit enquiries", desc: "Request quotes for products or bulk orders." },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav className="text-[0.66rem] uppercase tracking-[0.22em] text-taupe">
        <Link href="/" className="hover:text-gold-deep">Home</Link>
        <span className="mx-2 text-taupe/40">/</span>
        <span className="text-ink">Trade & Projects</span>
      </nav>

      <header className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Trade & Projects</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-ink sm:text-6xl">Lighting solutions for businesses</h1>
          <p className="mt-4 max-w-lg text-lg text-taupe">Become a Tejora trade partner and access wholesale pricing, project quotations, and dedicated business support.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/trade/register" className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft">
              Apply for wholesale access <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/trade/login" className="inline-flex items-center gap-2 rounded-full border border-ink-line px-8 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:border-brass hover:text-gold-deep">
              Trade login
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-ink-line">
          <img src="https://images.unsplash.com/photo-1505692794403-34d4982f88aa?auto=format&fit=crop&w=1600&q=80" alt="Luxury lighting project" className="h-full min-h-[320px] w-full object-cover" />
        </div>
      </header>

      <section className="mt-20">
        <div className="text-center">
          <p className="eyebrow">Benefits</p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Why partner with Tejora</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <article key={b.title} className="rounded-2xl border border-ink-line bg-white p-6">
              <b.icon className="h-5 w-5 text-gold-deep" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-2xl text-ink">{b.title}</h3>
              <p className="mt-2 text-sm text-taupe">{b.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Who can become a partner</p>
          <h2 className="mt-3 font-display text-4xl text-ink">Built for trade professionals</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {partners.map((p) => (
              <div key={p} className="flex items-center gap-3 rounded-xl border border-ink-line bg-white px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-gold-deep" />
                <span className="text-sm text-ink">{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 font-display text-4xl text-ink">Simple application process</h2>
          <div className="mt-6 grid gap-4">
            {steps.map((s) => (
              <article key={s.step} className="flex gap-4 rounded-2xl border border-ink-line bg-white p-5">
                <span className="font-display text-3xl text-gold-deep">{s.step}</span>
                <div>
                  <h3 className="font-display text-xl text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-taupe">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 rounded-3xl border border-ink-line bg-white p-8 text-center sm:p-12">
        <p className="eyebrow">Start your partnership</p>
        <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Ready to grow with Tejora?</h2>
        <p className="mt-4 mx-auto max-w-xl text-taupe">Apply today and our trade team will review your application.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/trade/register" className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft">
            Apply now <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-ink-line px-8 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:border-brass hover:text-gold-deep">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}