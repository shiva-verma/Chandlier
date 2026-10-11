import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "gold" | "dark";
type Size = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-gold/70 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-ink hover:bg-gold-soft shadow-[0_0_0_0_rgba(198,161,91,0)] hover:shadow-[0_10px_40px_-12px_rgba(198,161,91,0.8)]",
  outline: "border border-ink-line text-ivory hover:border-gold hover:text-gold",
  ghost: "text-ivory/75 hover:text-gold",
  gold: "border border-gold/60 text-gold hover:bg-gold hover:text-ink",
  dark: "bg-ink-soft text-ivory border border-ink-line hover:border-gold/50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.72rem] uppercase tracking-[0.18em]",
  md: "h-11 px-6 text-[0.78rem] uppercase tracking-[0.2em]",
  lg: "h-14 px-9 text-[0.82rem] uppercase tracking-[0.22em]",
  icon: "h-11 w-11",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}
