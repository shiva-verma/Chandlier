import Link from "next/link";

export default function TradeRegisterPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <nav className="text-[0.66rem] uppercase tracking-[0.22em] text-taupe">
        <Link href="/trade" className="hover:text-gold-deep">Trade & Projects</Link>
        <span className="mx-2 text-taupe/40">/</span>
        <span className="text-ink">Register</span>
      </nav>

      <header className="mt-8">
        <p className="eyebrow">Trade registration</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Apply for wholesale access</h1>
        <p className="mt-4 max-w-2xl text-taupe">Submit your business details. Our team will review your application and notify you of the status.</p>
      </header>

      <form className="mt-10 grid gap-6 rounded-2xl border border-ink-line bg-white p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Full name</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
          </div>
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Business name</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Business type</label>
            <select className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required>
              <option value="">Select</option>
              <option>Retailer</option>
              <option>Wholesaler</option>
              <option>Distributor</option>
              <option>Interior designer</option>
              <option>Architect</option>
              <option>Contractor</option>
              <option>Builder/developer</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Email address</label>
            <input type="email" className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Mobile number</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
          </div>
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">WhatsApp number</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">GST number (optional)</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" />
          </div>
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Website (optional)</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" />
          </div>
        </div>

        <div>
          <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Business address</label>
          <textarea rows={3} className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">City</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
          </div>
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">State</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
          </div>
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">PIN code</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" required />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Estimated monthly purchasing quantity</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" />
          </div>
          <div>
            <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Instagram/business profile (optional)</label>
            <input className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" />
          </div>
        </div>

        <div>
          <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Interested product categories</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {["Chandeliers", "Pendants", "Wall Lights", "Floor Lamps", "Smart Lighting", "All categories"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm text-ink">
                <input type="checkbox" className="rounded border-ink-line" />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Additional information</label>
          <textarea rows={4} className="mt-2 w-full rounded-lg border border-ink-line px-4 py-2.5 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40" />
        </div>

        <button type="submit" className="w-full rounded-full bg-ink px-8 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft sm:w-auto">
          Submit application
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-taupe">Already have an account? <Link href="/trade/login" className="text-gold-deep hover:underline">Login here</Link></p>
    </div>
  );
}