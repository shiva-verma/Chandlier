"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "./auth";
import { CATEGORY_LABELS, type CategorySlug } from "./types";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductInput,
} from "./products";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function num(formData: FormData, key: string) {
  const v = Number(formData.get(key));
  return Number.isFinite(v) ? v : 0;
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function buildProductInput(formData: FormData): ProductInput {
  const category = str(formData, "category") as CategorySlug;
  return {
    name: str(formData, "name") || "Untitled piece",
    tagline: str(formData, "tagline"),
    description: str(formData, "description"),
    price: Math.round(num(formData, "price") * 100),
    compareAtPrice: num(formData, "compareAtPrice")
      ? Math.round(num(formData, "compareAtPrice") * 100)
      : undefined,
    category: CATEGORY_LABELS[category] ? category : "chandeliers",
    collection: str(formData, "collection") || "Aurum",
    finish: str(formData, "finish") || "Antique Brass",
    material: str(formData, "material"),
    dimensions: str(formData, "dimensions"),
    wattage: str(formData, "wattage"),
    lumens: str(formData, "lumens"),
    colorTemp: str(formData, "colorTemp"),
    bulbType: str(formData, "bulbType"),
    smart: bool(formData, "smart"),
    stock: Math.max(0, Math.round(num(formData, "stock"))),
    rating: Math.min(5, Math.max(0, num(formData, "rating"))),
    reviewCount: Math.max(0, Math.round(num(formData, "reviewCount"))),
    badge: str(formData, "badge") || undefined,
    featured: bool(formData, "featured"),
    image: str(formData, "image") || undefined,
    imagePublicId: str(formData, "imagePublicId") || undefined,
    images: (() => {
      const raw = str(formData, "images");
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter((v): v is string => typeof v === "string" && v.trim().length > 0);
        }
        return [];
      } catch {
        return [];
      }
    })(),
    imagePublicIds: (() => {
      const raw = str(formData, "imagePublicIds");
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter((v): v is string => typeof v === "string" && v.trim().length > 0);
        }
        return [];
      } catch {
        return [];
      }
    })(),
    art: Math.min(5, Math.max(0, Math.round(num(formData, "art")))),
  };
}

export async function adminCreateProduct(formData: FormData) {
  await requireAdmin();
  const product = await createProduct(buildProductInput(formData));
  redirect(`/admin/products/${product.id}/edit?created=1`);
}

export async function adminUpdateProduct(id: string, formData: FormData) {
  await requireAdmin();
  const product = await updateProduct(id, buildProductInput(formData));
  redirect(product ? `/admin/products/${product.id}/edit?saved=1` : "/admin");
}

export async function adminDeleteProduct(formData: FormData) {
  await requireAdmin();
  await deleteProduct(String(formData.get("id") ?? ""));
  redirect("/admin");
}