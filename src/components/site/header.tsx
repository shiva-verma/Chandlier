"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { CartButton } from "@/components/cart/cart-ui";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Room", href: "/shop-by-room" },
  { label: "Style", href: "/shop-by-style" },
  { label: "Lighting Studio", href: "/lighting-studio" },
  { label: "Trade & Projects", href: "/trade" },
  { label: "Studio", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink-line bg-ivory/90 backdrop-blur-md"
            : "border-b border-transparent bg-ivory/60 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-ink lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link href="/" className="flex flex-col leading-none">
            <span className="flex items-center gap-2 font-display text-2xl tracking-[0.12em] text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
              {siteConfig.name}
            </span>
            <span className="mt-0.5 text-[0.55rem] uppercase tracking-[0.4em] text-taupe">
              {siteConfig.tagline}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="gold-underline pb-1 text-[0.72rem] uppercase tracking-[0.2em] text-ink/75 transition-colors hover:text-gold-deep"
              >
                {item.label}
              </Link>
            ))}
          </nav>

                    <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden text-[0.72rem] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-gold-deep sm:inline"
            >
              Shop all
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-ink transition-colors hover:border-brass hover:text-gold-deep"
            >
              <Heart className="h-4 w-4" />
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-ink transition-colors hover:border-brass hover:text-gold-deep"
            >
              <User className="h-4 w-4" />
            </Link>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <div
        className={cn(
          "fixed inset-0 z-[90] lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-mocha/70 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={cn(
            "absolute left-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-r border-ink-line bg-ivory px-7 py-6 text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-ink">{siteConfig.name}</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-ink-line text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-10 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink-line/60 py-4 font-display text-2xl text-ink transition-colors hover:text-gold-deep"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-auto grid h-12 place-items-center rounded-full bg-ink text-[0.75rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft"
          >
            Enquire on WhatsApp
          </Link>
        </nav>
      </div>
    </>
  );
}
