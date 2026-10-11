import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { adminLogout } from "@/lib/admin-actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen">
      <header className="border-b border-ink-line bg-ink-soft/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-display text-xl tracking-[0.08em]">
              Éclat
              <span className="text-gold"> · Admin</span>
            </Link>
            <nav className="hidden items-center gap-6 text-[0.7rem] uppercase tracking-[0.2em] text-ivory-dim sm:flex">
              <Link href="/admin" className="transition-colors hover:text-gold">
                Products
              </Link>
              <Link
                href="/admin/products/new"
                className="transition-colors hover:text-gold"
              >
                Add product
              </Link>
              <Link href="/admin/orders" className="transition-colors hover:text-gold">
                Orders
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="/"
              target="_blank"
              className="hidden text-[0.68rem] uppercase tracking-[0.2em] text-ivory-dim transition-colors hover:text-gold sm:inline"
            >
              View store ↗
            </a>
            <form action={adminLogout}>
              <button
                type="submit"
                className="text-[0.68rem] uppercase tracking-[0.2em] text-ivory-dim transition-colors hover:text-gold"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}