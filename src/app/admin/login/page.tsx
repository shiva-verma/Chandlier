import { Lock } from "lucide-react";
import { adminLogin } from "@/lib/admin-actions";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const error = sp.error === "1";

  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="font-display text-3xl tracking-[0.1em]">{siteConfig.name}</p>
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.3em] text-gold">
            Atelier access
          </p>
        </div>

        <form
          action={adminLogin}
          className="mt-10 rounded-2xl border border-ink-line bg-ink-soft/40 p-8"
        >
          <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-ivory-dim">
            Admin password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory-dim" />
            <input
              type="password"
              name="password"
              required
              autoFocus
              placeholder="••••••••••"
              className="h-12 w-full rounded-xl border border-ink-line bg-ink pl-11 pr-4 text-sm focus:border-gold/70 focus:outline-none focus:ring-1 focus:ring-gold/40"
            />
          </div>

          {error && (
            <p className="mt-4 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-200">
              Incorrect password. Try again.
            </p>
          )}

          <button
            type="submit"
            className="mt-6 h-12 w-full rounded-full bg-gold text-[0.76rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
          >
            Enter the atelier
          </button>
          <p className="mt-4 text-center text-[0.62rem] uppercase tracking-[0.2em] text-ivory-dim/60">
            Default: <span className="text-gold">chandelier-admin</span>
          </p>
        </form>
      </div>
    </main>
  );
}