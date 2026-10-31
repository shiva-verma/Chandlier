"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Input, Textarea, Select, Label } from "@/components/ui/field";
import { placeOrder } from "@/lib/actions";
import { siteConfig } from "@/lib/site-config";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { lines, subtotal, clear, hydrated } = useCart();
  const router = useRouter();
  const [state, formAction, pending] = useActionState(placeOrder, null);

  useEffect(() => {
    if (state?.ok) {
      clear();
      router.push(`/checkout/success?order=${state.reference}`);
    }
  }, [state, clear, router]);

  const shipping =
    subtotal >= siteConfig.freeShippingThreshold || subtotal === 0
      ? 0
      : siteConfig.shippingFlat;

  const items = JSON.stringify(
    lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
  );

  if (hydrated && lines.length === 0 && !state?.ok) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-ink">Nothing to check out yet</h1>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-8 text-[0.76rem] uppercase tracking-[0.2em] text-ivory hover:bg-mocha-soft"
        >
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="eyebrow">Secure checkout</p>
      <h1 className="mt-3 font-display text-5xl text-ink">Almost yours</h1>

      <form action={formAction} className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <input type="hidden" name="items" value={items} />

        <div className="space-y-10">
          <section>
            <h2 className="flex items-center gap-3 font-display text-2xl text-ink">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-brass/50 text-xs text-ink">
                1
              </span>
              Contact
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name *</Label>
                <Input id="name" name="name" required autoComplete="name" placeholder="Aarav Mehta" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-3 font-display text-2xl text-ink">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-brass/50 text-xs text-ink">
                2
              </span>
              Delivery
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="address">Street address *</Label>
                <Input id="address" name="address" required autoComplete="street-address" placeholder="House no, street, locality" />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" name="city" required autoComplete="address-level2" placeholder="Mumbai" />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input id="state" name="state" required autoComplete="address-level1" placeholder="Maharashtra" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="pincode">PIN code *</Label>
                <Input id="pincode" name="pincode" required autoComplete="postal-code" placeholder="400001" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="notes">Delivery notes</Label>
                <Textarea id="notes" name="notes" placeholder="Gate code, preferred time windows…" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-3 font-display text-2xl text-ink">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-brass/50 text-xs text-ink">
                3
              </span>
              Payment
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-ink-line p-5 transition-colors has-[:checked]:border-brass has-[:checked]:bg-brass/10">
                <input type="radio" name="payment" value="cod" defaultChecked className="sr-only" />
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-taupe transition-colors group-has-[:checked]:border-brass">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent transition-colors group-has-[:checked]:bg-brass"></span>
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">Cash on delivery</span>
                  <span className="text-xs text-taupe">Pay when the piece arrives</span>
                </span>
              </label>
              <label className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-ink-line p-5 transition-colors has-[:checked]:border-brass has-[:checked]:bg-brass/10">
                <input type="radio" name="payment" value="card" className="sr-only" />
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-taupe transition-colors group-has-[:checked]:border-brass">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent transition-colors group-has-[:checked]:bg-brass"></span>
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">Pay by card</span>
                  <span className="text-xs text-taupe">Simulated in test mode</span>
                </span>
              </label>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-ink-line bg-white/70 p-7 card-shadow lg:sticky lg:top-28">
          <h2 className="font-display text-2xl text-ink">Order summary</h2>
          {!hydrated ? (
            <p className="mt-4 text-sm text-taupe">Loading cart…</p>
          ) : (
            <ul className="mt-5 space-y-4">
              {lines.map((l) => (
                <li key={l.productId} className="flex justify-between gap-3 text-sm">
                  <span className="text-taupe">
                    {l.name} <span className="text-taupe">× {l.quantity}</span>
                  </span>
                  <span className="shrink-0">{formatPrice(l.price * l.quantity)}</span>
                </li>
              ))}
            </ul>
          )}
          <dl className="mt-6 space-y-3 border-t border-ink-line pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-taupe">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-taupe">Shipping</dt>
              <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-taupe">
                Free shipping on orders over {formatPrice(siteConfig.freeShippingThreshold)}.
              </p>
            )}
            <div className="flex items-center justify-between border-t border-ink-line pt-4">
              <dt className="text-base">Total</dt>
              <dd className="font-display text-2xl text-ink">
                {formatPrice(subtotal + shipping)}
              </dd>
            </div>
          </dl>

          {state && !state.ok && (
            <p className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending || !hydrated || lines.length === 0}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-[0.78rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft disabled:opacity-50"
          >
            {pending ? "Placing order…" : "Place order"}
            {!pending && <Lock className="h-4 w-4" />}
          </button>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-taupe">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-deep" />
            Encrypted & secure · never shared
          </p>
        </aside>
      </form>
    </div>
  );
}
