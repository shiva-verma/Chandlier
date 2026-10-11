import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "gold" | "muted" | "outline" | "dark";

const tones: Record<Tone, string> = {
  gold: "bg-gold/15 text-gold border border-gold/30",
  muted: "bg-ivory/5 text-ivory-dim border border-ink-line",
  outline: "border border-ink-line text-ivory",
  dark: "bg-ink text-gold border border-gold/40",
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
