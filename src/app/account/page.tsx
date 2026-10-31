import Link from "next/link";
import { redirect } from "next/navigation";
import { Package, ShieldCheck } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getOrdersByEmail } from "@/lib/orders";
import { logout } from "@/lib/auth-actions";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await requireUser();
  if (!user?.email) redirect("/login");

  const orders = await getOrdersByEmail(user.email);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Your account</p>
          <h1 className="mt-2 font-display text-4xl text-ink">
            {user.name || "Welcome"}
          </h1>
          <p className="mt-2 text-sm text-taupe">{user.email}</p>
        </div>

        <div className="flex items-center gap-3">
          {user.role === "admin" && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-ink-line px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-taupe transition-colors hover:border-brass hover:text-gold-deep"
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Admin dashboard
            </Link>
          )}
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-mocha-soft"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 font-display text-2xl text-ink">
          <Package className="h-4 w-4 text-brass" /> Order history
        </h2>

        {orders.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-ink-line bg-white/60 p-8 text-sm text-taupe">
            You haven&apos;t placed an order yet.{" "}
            <Link href="/shop" className="gold-underline text-ink">
              Explore the collection
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-line bg-white/60 p-5"
              >
                <div>
                  <p className="font-display text-lg text-ink">{order.reference}</p>
                  <p className="mt-1 text-xs text-taupe">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {order.lines.length}{" "}
                    {order.lines.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-ink">{formatPrice(order.total)}</p>
                  <p className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-taupe">
                    {order.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
