"use server";

import { getProductById } from "./products";
import { createOrder } from "./orders";
import { siteConfig } from "./site-config";

export type PlaceOrderResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };

export async function placeOrder(
  _prev: PlaceOrderResult | null,
  formData: FormData,
): Promise<PlaceOrderResult> {
  await new Promise((r) => setTimeout(r, 250)); // small pause for a calmer UX

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const pincode = String(formData.get("pincode") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const paymentMethod = formData.get("payment") === "card" ? "card" : "cod";

  if (!name || !email || !phone || !address || !city || !state || !pincode) {
    return { ok: false, error: "Please complete all required fields." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  let items: Array<{ productId: string; quantity: number }> = [];
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return { ok: false, error: "Your cart could not be read. Please try again." };
  }
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: "Your cart is empty." };
  }

  // Prices are always recomputed from the catalog on the server.
  const lines: Array<{ name: string; price: number; quantity: number }> = [];
  for (const item of items) {
    const product = await getProductById(String(item.productId));
    if (!product) {
      return {
        ok: false,
        error: "One of the items in your cart is no longer available. Please refresh.",
      };
    }
    const qty = Math.max(1, Math.min(99, Number(item.quantity) || 1));
    if (product.stock < 1) {
      return { ok: false, error: `${product.name} is currently sold out.` };
    }
    lines.push({ name: product.name, price: product.price, quantity: qty });
  }

  const subtotal = lines.reduce((n, l) => n + l.price * l.quantity, 0);
  const shipping =
    subtotal >= siteConfig.freeShippingThreshold || subtotal === 0
      ? 0
      : siteConfig.shippingFlat;

  const order = await createOrder({
    customer: { name, email, phone, address, city, state, pincode, notes },
    paymentMethod,
    lines,
    subtotal,
    shipping,
    total: subtotal + shipping,
  });

  return { ok: true, reference: order.reference };
}