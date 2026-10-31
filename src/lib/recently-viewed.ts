"use client";

const RECENT_KEY = "tejora_recently_viewed";

export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(productId: string) {
  if (typeof window === "undefined") return;
  const recent = getRecentlyViewed().filter((id) => id !== productId);
  const next = [productId, ...recent].slice(0, 10);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("recently-viewed-updated"));
}