"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowDownUp } from "lucide-react";

export function ShopControls() {
  const router = useRouter();
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  const sort = sp.get("sort") ?? "";

  function push(next: URLSearchParams) {
    const qs = next.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const next = new URLSearchParams(sp.toString());
          if (q) next.set("q", q);
          else next.delete("q");
          next.delete("page");
          push(next);
        }}
        className="relative sm:w-72"
      >
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory-dim" />
        <input
          defaultValue={q}
          name="q"
          aria-label="Search products"
          placeholder="Search the collection…"
          className="h-11 w-full rounded-full border border-ink-line bg-ink-soft/60 pl-11 pr-5 text-sm placeholder:text-ivory-dim/50 focus:border-gold/70 focus:outline-none"
        />
      </form>

      <label className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-ivory-dim">
        <ArrowDownUp className="h-3.5 w-3.5" />
        <select
          value={sort}
          onChange={(e) => {
            const next = new URLSearchParams(sp.toString());
            if (e.target.value) next.set("sort", e.target.value);
            else next.delete("sort");
            push(next);
          }}
          className="h-11 rounded-full border border-ink-line bg-ink-soft/60 px-4 text-sm text-ivory focus:border-gold/70 focus:outline-none"
        >
          <option value="">Featured</option>
          <option value="price-asc">Price · low to high</option>
          <option value="price-desc">Price · high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </label>
    </div>
  );
}