import * as React from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-ink-line bg-ink-soft/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/50 transition-colors focus:border-gold/70 focus:outline-none focus:ring-1 focus:ring-gold/40";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(field, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(field, "min-h-28 resize-y", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(field, "appearance-none pr-10", className)} {...props}>
      {children}
    </select>
  );
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-[0.68rem] uppercase tracking-[0.22em] text-ivory-dim",
        className,
      )}
      {...props}
    />
  );
}
