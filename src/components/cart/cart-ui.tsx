"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./cart-provider";
import { formatPrice, cn } from "@/lib/utils";
import { ProductArt } from "@/components/ui/product-art";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function CartButton({ variant = "dark" }: { variant?: "dark" | "ghost" }) {
  const { count, open, hydrated } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open cart${count ? `, ${count} items` : ""}`}
      className={cn(
        "relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-[0.7rem] uppercase tracking-[0.2em] text-ink transition-colors",
        variant === "dark"
          ? "border border-ink-line hover:border-brass hover:text-gold-deep"
          : "hover:text-gold-deep",
      )}
    >
      <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
      <span className="hidden sm:inline">Cart</span>
      {hydrated && count > 0 && (
        <span className="ml-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[0.62rem] font-semibold text-brass">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const { lines, isOpen, close, remove, setQty, subtotal, count } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-[80] transition-opacity duration-300",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <button
        aria-label="Close cart"
        onClick={close}
        className="absolute inset-0 bg-mocha/70 backdrop-blur-sm"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-ink-line bg-ivory text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-ink-line px-6 py-5">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2 className="font-display text-2xl">Cart {count > 0 && `(${count})`}</h2>
          </div>
          <button
            onClick={close}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-ink-line text-ink hover:border-brass hover:text-gold-deep"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="h-28 w-28 opacity-70">
              <ProductArt variant={1} />
            </div>
            <p className="text-sm text-taupe">
              Your cart is quiet. Add a piece of light to begin.
            </p>
            <Link
              href="/shop"
              onClick={close}
              className="rounded-full border border-brass/60 px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass/15 hover:border-brass"
            >
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-ink-line">
                {lines.map((line) => (
                  <li key={line.productId} className="flex gap-4 py-5">
                    <Link
                      href={`/product/${line.slug}`}
                      onClick={close}
                      className="h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-ink-line bg-white"
                    >
                      <ProductArt variant={line.art} />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={`/product/${line.slug}`}
                          onClick={close}
                          className="font-display text-lg leading-tight hover:text-gold-deep"
                        >
                          {line.name}
                        </Link>
                        <button
                          onClick={() => remove(line.productId)}
                          aria-label={`Remove ${line.name}`}
                          className="text-taupe transition-colors hover:text-gold-deep"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-ink">{formatPrice(line.price)}</p>
                      <div className="mt-auto flex items-center gap-3 pt-3">
                        <div className="flex items-center rounded-full border border-ink-line">
                          <button
                            onClick={() => setQty(line.productId, line.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="grid h-8 w-8 place-items-center hover:text-gold-deep"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm">{line.quantity}</span>
                          <button
                            onClick={() => setQty(line.productId, line.quantity + 1)}
                            aria-label="Increase quantity"
                            className="grid h-8 w-8 place-items-center hover:text-gold-deep"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="ml-auto text-sm text-taupe">
                          {formatPrice(line.price * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-ink-line px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-taupe">Subtotal</span>
                <span className="font-display text-2xl text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-taupe">
                Shipping & taxes calculated at checkout.
              </p>
              <div className="mt-5 grid gap-3">
                <Link
                  href="/checkout"
                  onClick={close}
                  className="grid h-12 place-items-center rounded-full bg-ink text-[0.78rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={close}
                  className="grid h-12 place-items-center rounded-full border border-ink-line text-[0.78rem] uppercase tracking-[0.2em] text-ink transition-colors hover:border-brass hover:text-gold-deep"
                >
                  View full cart
                </Link>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
