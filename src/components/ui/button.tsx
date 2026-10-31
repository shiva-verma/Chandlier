import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "gold" | "dark";
type Size = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory focus-visible:ring-brass/60 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Important actions: deep mocha with ivory text.
  primary:
    "bg-ink text-ivory hover:bg-mocha-soft shadow-[0_12px_30px_-16px_rgba(48,40,32,0.55)] hover:shadow-[0_16px_40px_-16px_rgba(48,40,32,0.6)]",
  outline: "border border-ink-line text-ink hover:border-brass hover:text-gold-deep",
  ghost: "text-ink/70 hover:text-gold-deep",
  // Accent action: brass detail, accessible mocha label.
  gold: "border border-brass/60 text-ink hover:bg-brass/15 hover:border-brass",
  dark: "bg-ink text-ivory border border-ink hover:bg-mocha-soft",
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
