"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/utils";
import { ProductArt } from "@/components/ui/product-art";

export default function CartPage() {
  const { lines, setQty, remove, subtotal, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20 text-center text-ivory-dim">
        Loading your cart…
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mx-auto h-32 w-32 opacity-70">
          <ProductArt variant={0} />
        </div>
        <h1 className="mt-6 font-display text-4xl">Your cart is quiet</h1>
        <p className="mt-3 text-sm text-ivory-dim">
          Add a piece of light to begin — or ask the atelier what your room
          needs.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gold px-8 text-[0.76rem] uppercase tracking-[0.2em] text-ink hover:bg-gold-soft"
        >
          Browse the collection <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="eyebrow">Your selection</p>
      <h1 className="mt-3 font-display text-5xl">Cart</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-ink-line border-y border-ink-line">
          {lines.map((line) => (
            <li key={line.productId} className="flex gap-5 py-6">
              <Link
                href={`/product/${line.slug}`}
                className="h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-ink-line bg-ink-soft"
              >
                <ProductArt variant={line.art} />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.24em] text-gold/70">
                      Éclat Maison
                    </p>
                    <h2 className="mt-1 font-display text-2xl">
                      <Link href={`/product/${line.slug}`} className="hover:text-gold">
                        {line.name}
                      </Link>
                    </h2>
                    <p className="mt-1 text-sm text-gold">{formatPrice(line.price)}</p>
                  </div>
                  <button
                    onClick={() => remove(line.productId)}
                    aria-label={`Remove ${line.name}`}
                    className="text-ivory-dim transition-colors hover:text-gold"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center gap-4 pt-4">
                  <div className="flex items-center rounded-full border border-ink-line">
                    <button
                      onClick={() => setQty(line.productId, line.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="grid h-9 w-9 place-items-center hover:text-gold"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{line.quantity}</span>
                    <button
                      onClick={() => setQty(line.productId, line.quantity + 1)}
                      aria-label="Increase quantity"
                      className="grid h-9 w-9 place-items-center hover:text-gold"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="ml-auto text-sm text-ivory-dim">
                    {formatPrice(line.price * line.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-ink-line bg-ink-soft/40 p-7 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ivory-dim">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ivory-dim">Shipping</dt>
              <dd>Calculated at checkout</dd>
            </div>
            <div className="flex justify-between border-t border-ink-line pt-4 text-base">
              <dt>Total</dt>
              <dd className="font-display text-2xl text-gold">{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-7 grid h-13 w-full place-items-center rounded-full bg-gold py-4 text-[0.78rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
          >
            Proceed to checkout
          </Link>
          <Link
            href="/shop"
            className="mt-4 grid w-full place-items-center text-[0.7rem] uppercase tracking-[0.2em] text-ivory-dim hover:text-gold"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}