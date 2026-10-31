"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function PriceRangeSlider({ min = 0, max = 100000 }: { min?: number; max?: number }) {
  const router = useRouter();
  const sp = useSearchParams();
  const currentMin = sp.get("min") ? Number(sp.get("min")) : min;
  const currentMax = sp.get("max") ? Number(sp.get("max")) : max;

  const [minVal, setMinVal] = useState(currentMin);
  const [maxVal, setMaxVal] = useState(currentMax);

  useEffect(() => {
    setMinVal(currentMin);
    setMaxVal(currentMax);
  }, [currentMin, currentMax]);

  function apply() {
    const next = new URLSearchParams(sp.toString());
    if (minVal > min) next.set("min", String(minVal));
    else next.delete("min");
    if (maxVal < max) next.set("max", String(maxVal));
    else next.delete("max");
    next.delete("page");
    const qs = next.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  }

  return (
    <div className="rounded-2xl border border-ink-line bg-white p-5">
      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-taupe">Price range</p>
      <div className="mt-4 flex items-center gap-3 text-sm text-ink">
        <input
          type="number"
          value={minVal}
          onChange={(e) => setMinVal(Number(e.target.value))}
          className="w-full rounded-lg border border-ink-line px-3 py-2 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40"
        />
        <span className="text-taupe">—</span>
        <input
          type="number"
          value={maxVal}
          onChange={(e) => setMaxVal(Number(e.target.value))}
          className="w-full rounded-lg border border-ink-line px-3 py-2 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40"
        />
      </div>
      <button
        onClick={apply}
        className="mt-4 w-full rounded-full bg-ink px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-mocha-soft"
      >
        Apply
      </button>
    </div>
  );
}