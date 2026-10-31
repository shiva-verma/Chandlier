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
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
        <input
          defaultValue={q}
          name="q"
          aria-label="Search products"
          placeholder="Search the collection…"
          className="h-11 w-full rounded-full border border-ink-line bg-white pl-11 pr-5 text-sm text-ink placeholder:text-taupe/70 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40"
        />
      </form>

      <div className="flex items-center gap-2">
        <ArrowDownUp className="h-4 w-4 text-taupe" />
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => {
              const next = new URLSearchParams(sp.toString());
              if (e.target.value) next.set("sort", e.target.value);
              else next.delete("sort");
              push(next);
            }}
            className="h-11 appearance-none rounded-full border border-ink-line bg-white pl-4 pr-9 text-[0.76rem] uppercase tracking-[0.18em] text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40"
          >
            <option value="">Featured</option>
            <option value="price-asc">Price · low to high</option>
            <option value="price-desc">Price · high to low</option>
            <option value="rating">Top rated</option>
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
