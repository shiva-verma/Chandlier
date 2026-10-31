import { getOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <>
      <p className="eyebrow">Operations</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Orders</h1>
      <p className="mt-2 text-sm text-taupe">
        {orders.length} order{orders.length === 1 ? "" : "s"} recorded
        {orders.length > 0 && ` · latest first`}
      </p>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-ink-line py-20 text-center text-taupe">
          No orders yet. They&apos;ll appear here as customers check out.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => (
            <details
              key={o.id}
              className="group rounded-2xl border border-ink-line bg-white/60 transition-colors open:border-brass/40"
            >
              <summary className="flex cursor-pointer flex-wrap items-center gap-x-6 gap-y-2 px-6 py-5 text-sm marker:hidden">
                <span className="font-display text-xl text-ink">{o.reference}</span>
                <span className="text-taupe">
                  {new Date(o.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="text-ink">{o.customer.name}</span>
                <span className="text-taupe">{o.customer.city}</span>
                <span
                  className={
                    o.status === "paid"
                      ? "font-medium text-ink"
                      : o.status === "cancelled"
                        ? "font-medium text-red-600"
                        : "text-taupe"
                  }
                >
                  {o.status}
                </span>
                <span className="ml-auto font-display text-lg text-ink">
                  {formatPrice(o.total)}
                </span>
              </summary>

              <div className="grid gap-6 border-t border-ink-line px-6 py-6 md:grid-cols-2">
                <div>
                  <p className="eyebrow">Items</p>
                  <ul className="mt-3 space-y-2 text-sm text-taupe">
                    {o.lines.map((l) => (
                      <li key={l.name} className="flex justify-between gap-3">
                        <span>
                          {l.name} × {l.quantity}
                        </span>
                        <span>{formatPrice(l.price * l.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-5 space-y-1.5 border-t border-ink-line pt-4 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-taupe">Subtotal</dt>
                      <dd>{formatPrice(o.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-taupe">Shipping</dt>
                      <dd>{o.shipping === 0 ? "Free" : formatPrice(o.shipping)}</dd>
                    </div>
                    <div className="flex justify-between font-display text-lg">
                      <dt>Total</dt>
                      <dd className="text-ink">{formatPrice(o.total)}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <p className="eyebrow">Customer</p>
                  <p className="mt-3 text-sm leading-relaxed text-taupe">
                    {o.customer.name}
                    <br />
                    {o.customer.email}
                    <br />
                    {o.customer.phone}
                    <br />
                    {o.customer.address}
                    <br />
                    {o.customer.city}, {o.customer.state} {o.customer.pincode}
                  </p>
                  {o.customer.notes && (
                    <p className="mt-4 text-sm text-taupe">
                      <span className="font-medium text-ink">Notes:</span> {o.customer.notes}
                    </p>
                  )}
                  <p className="mt-4 text-[0.66rem] uppercase tracking-[0.22em] text-taupe">
                    Payment ·{" "}
                    {o.paymentMethod === "cod" ? "Cash on delivery" : "Card (paid)"}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </>
  );
}
