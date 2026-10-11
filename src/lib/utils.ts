import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Prices are stored in minor units (paise). */
export function formatPrice(minor: number) {
  const value = minor / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export function newId(prefix = "p") {
  return `${prefix}_${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

export function orderReference() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `CH-${new Date().getFullYear()}-${n}`;
}
