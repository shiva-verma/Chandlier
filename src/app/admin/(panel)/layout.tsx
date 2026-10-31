import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "@/lib/auth-actions";

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
      <header className="border-b border-ink-line bg-white/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-display text-xl tracking-[0.08em] text-ink">
              Tejora
              <span className="text-taupe"> · Admin</span>
            </Link>
            <nav className="hidden items-center gap-6 text-[0.7rem] uppercase tracking-[0.2em] text-taupe sm:flex">
              <Link href="/admin" className="transition-colors hover:text-gold-deep">
                Products
              </Link>
              <Link
                href="/admin/products/new"
                className="transition-colors hover:text-gold-deep"
              >
                Add product
              </Link>
              <Link href="/admin/orders" className="transition-colors hover:text-gold-deep">
                Orders
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="/"
              target="_blank"
              className="hidden text-[0.68rem] uppercase tracking-[0.2em] text-taupe transition-colors hover:text-gold-deep sm:inline"
            >
              View store ↗
            </a>
            <form action={logout}>
              <button
                type="submit"
                className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe transition-colors hover:text-gold-deep"
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
