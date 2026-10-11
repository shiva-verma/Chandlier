import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink, mailtoLink } from "@/lib/site-config";
import { CATEGORIES } from "@/lib/types";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink-line bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-3xl tracking-[0.1em]">{siteConfig.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-dim">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={whatsappLink("Hello Éclat Maison, I would like to enquire.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a
                href={mailtoLink("Enquiry")}
                className="inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
            </div>
          </div>

          <nav>
            <p className="eyebrow">Collections</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory-dim">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    className="transition-colors hover:text-gold"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="eyebrow">Maison</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory-dim">
              <li>
                <Link href="/about" className="transition-colors hover:text-gold">
                  Our Atelier
                </Link>
              </li>
              <li>
                <Link href="/shop" className="transition-colors hover:text-gold">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-gold">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="transition-colors hover:text-gold">
                  Admin
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Visit</p>
            <ul className="mt-5 space-y-4 text-sm text-ivory-dim">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={mailtoLink()} className="transition-colors hover:text-gold">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.whatsapp.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-line pt-8 text-[0.68rem] uppercase tracking-[0.2em] text-ivory-dim/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Handcrafted light · Mumbai</p>
        </div>
      </div>
    </footer>
  );
}
