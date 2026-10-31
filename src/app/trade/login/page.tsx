import Link from "next/link";

export default function TradeLoginPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <header className="text-center">
        <p className="eyebrow">Trade & Projects</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Trade login</h1>
        <p className="mt-3 text-taupe">Sign in to access your trade dashboard</p>
      </header>

      <form className="mt-8 grid gap-4 rounded-2xl border border-ink-line bg-white p-6">
        <div>
          <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Email</label>
          <input type="email" className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
        </div>
        <div>
          <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Password</label>
          <input type="password" className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
        </div>
        <button type="submit" className="w-full rounded-full bg-ink px-8 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft">
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-taupe">Not a trade partner? <Link href="/trade/register" className="text-gold-deep hover:underline">Apply now</Link></p>
    </div>
  );
}