import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "gold" | "muted" | "outline" | "dark";

const tones: Record<Tone, string> = {
  // Brass-selected state, mocha label for accessible contrast on ivory.
  gold: "bg-brass/15 text-mocha border border-brass/40",
  muted: "bg-ivory text-taupe border border-ink-line",
  outline: "border border-ink-line text-ink",
  // Dark chip for white cards: brass text on mocha passes contrast.
  dark: "bg-ink text-brass border border-brass/40",
};

export function Badge({
  tone = "gold",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
