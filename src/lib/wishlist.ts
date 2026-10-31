"use client";

const WISHLIST_KEY = "tejora_wishlist";

export function getWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function addToWishlist(productId: string) {
  const wishlist = getWishlist();
  if (wishlist.includes(productId)) return wishlist;
  const next = [...wishlist, productId];
  if (typeof window !== "undefined") {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("wishlist-updated"));
  }
  return next;
}

export function removeFromWishlist(productId: string) {
  const wishlist = getWishlist();
  const next = wishlist.filter((id) => id !== productId);
  if (typeof window !== "undefined") {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("wishlist-updated"));
  }
  return next;
}

export function toggleWishlist(productId: string) {
  const wishlist = getWishlist();
  if (wishlist.includes(productId)) {
    return removeFromWishlist(productId);
  }
  return addToWishlist(productId);
}

export function isInWishlist(productId: string) {
  return getWishlist().includes(productId);
}