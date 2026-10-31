import Link from "next/link";
import { FileText } from "lucide-react";

export default function TradeQuotationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <header>
        <p className="eyebrow">Quotations</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Your quotations</h1>
        <p className="mt-4 text-taupe">View and track your quotation requests</p>
      </header>

      <div className="mt-10 rounded-2xl border border-ink-line bg-white p-12 text-center">
        <FileText className="mx-auto h-8 w-8 text-taupe" />
        <p className="mt-4 font-display text-2xl text-ink">No quotations yet</p>
        <p className="mt-2 text-sm text-taupe">Submit a bulk enquiry to receive quotations</p>
        <Link href="/contact" className="mt-6 inline-flex rounded-full bg-ink px-6 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-mocha-soft">
          Request quotation
        </Link>
      </div>
    </div>
  );
}