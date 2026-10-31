import Link from "next/link";
import { CheckCircle2, MessageCircle, PackageCheck } from "lucide-react";
import { getOrderByReference } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";
import { whatsappLink } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const reference = Array.isArray(sp.order) ? sp.order[0] : sp.order;
  const order = reference ? await getOrderByReference(reference) : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-brass/40 bg-brass/10">
          {order ? (
            <CheckCircle2 className="h-9 w-9 text-gold-deep" strokeWidth={1.5} />
          ) : (
            <PackageCheck className="h-9 w-9 text-gold-deep" strokeWidth={1.5} />
          )}
        </span>
        <p className="eyebrow mt-6">{order ? "Order confirmed" : "Thank you"}</p>
        <h1 className="mt-3 font-display text-5xl text-ink">
          {order ? "Consider it placed." : "Received — we'll be in touch."}
        </h1>
        {order && (
          <p className="mt-4 text-taupe">
            Reference{" "}
            <span className="rounded-full border border-brass/40 px-3 py-1 text-sm text-ink">
              {order.reference}
            </span>{" "}
            · a confirmation is on its way to {order.customer.email}
          </p>
        )}
      </div>

      {order && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <section className="rounded-2xl border border-ink-line bg-white/60 p-6">
            <h2 className="eyebrow">Delivery</h2>
            <p className="mt-4 text-sm leading-relaxed">
              {order.customer.name}
              <br />
              {order.customer.address}
              <br />
              {order.customer.city}, {order.customer.state} {order.customer.pincode}
            </p>
          </section>
          <section className="rounded-2xl border border-ink-line bg-white/60 p-6">
            <h2 className="eyebrow">Order</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {order.lines.map((l) => (
                <li key={l.name} className="flex justify-between gap-3">
                  <span className="text-taupe">
                    {l.name} <span className="text-taupe">× {l.quantity}</span>
                  </span>
                  <span className="shrink-0">{formatPrice(l.price * l.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-ink-line pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-taupe">Subtotal</dt>
                <dd>{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-taupe">Shipping</dt>
                <dd>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-ink-line pt-3 text-base">
                <dt>Total</dt>
                <dd className="font-display text-xl text-ink">
                  {formatPrice(order.total)}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-taupe">
              {order.paymentMethod === "cod"
                ? "Payment · cash on delivery"
                : "Payment · card (paid)"}
            </p>
          </section>
        </div>
      )}

      <div className="mt-12 flex flex-col items-center gap-4">
        {order && (
          <a
            href={whatsappLink(
              `Hello Tejora, I just placed order ${order.reference} and would like to confirm the delivery details.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-brass/60 px-7 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass/15 hover:border-brass"
          >
            <MessageCircle className="h-4 w-4 text-gold-deep" /> Confirm on WhatsApp
          </a>
        )}
        <Link
          href="/shop"
          className="gold-underline text-[0.72rem] uppercase tracking-[0.2em] text-taupe transition-colors hover:text-gold-deep"
        >
          Continue exploring
        </Link>
      </div>
    </div>
  );
}
