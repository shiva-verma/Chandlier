import Link from "next/link";
import { User, FileText, Package, Heart, Settings, HelpCircle } from "lucide-react";

export default function TradeDashboardPage() {
  const cards = [
    { icon: User, title: "Business Profile", desc: "View and update your business details", href: "#" },
    { icon: Package, title: "Trade Catalogue", desc: "Browse products with trade access", href: "/trade/catalogue" },
    { icon: FileText, title: "Quotations", desc: "View submitted and received quotations", href: "/trade/quotations" },
    { icon: Heart, title: "Saved Products", desc: "Your saved items", href: "/wishlist" },
    { icon: Settings, title: "Account Settings", desc: "Manage your account", href: "#" },
    { icon: HelpCircle, title: "Support", desc: "Get help from our trade team", href: "/contact" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Trade Dashboard</p>
          <h1 className="mt-3 font-display text-4xl text-ink">Welcome</h1>
          <p className="mt-2 text-taupe">Manage your trade account and enquiries</p>
        </div>
        <span className="rounded-full border border-brass/40 bg-brass/10 px-4 py-1.5 text-xs text-ink">Status: Pending Verification</span>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.title} href={card.href} className="group rounded-2xl border border-ink-line bg-white p-6 transition-colors hover:border-brass/60">
            <card.icon className="h-5 w-5 text-gold-deep" strokeWidth={1.5} />
            <h2 className="mt-4 font-display text-2xl text-ink">{card.title}</h2>
            <p className="mt-2 text-sm text-taupe">{card.desc}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-ink-line bg-white p-6">
        <h2 className="font-display text-2xl text-ink">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/shop" className="rounded-full bg-ink px-6 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-mocha-soft">Browse catalogue</Link>
          <Link href="/contact" className="rounded-full border border-ink-line px-6 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-ink transition-colors hover:border-brass hover:text-gold-deep">Request quotation</Link>
        </div>
      </section>
    </div>
  );
}