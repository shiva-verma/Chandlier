export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Price in minor units (paise) to avoid floating point drift. */
  price: number;
  compareAtPrice?: number;
  category: CategorySlug;
  collection: string;
  finish: string;
  material: string;
  dimensions: string;
  wattage: string;
  lumens: string;
  colorTemp: string;
  bulbType: string;
  smart: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  featured: boolean;
  /** Optional external image URL. Falls back to generated artwork when empty. */
  image?: string;
  /** Variant index (0-5) used by the generated chandelier artwork. */
  art: number;
  createdAt: string;
};

export type CategorySlug =
  | "chandeliers"
  | "pendants"
  | "wall-lights"
  | "floor-lamps"
  | "smart-lighting";

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  { slug: "chandeliers", name: "Chandeliers", blurb: "Statement centrepieces" },
  { slug: "pendants", name: "Pendants", blurb: "Sculptural drop lighting" },
  { slug: "wall-lights", name: "Wall Lights", blurb: "Sconces & brackets" },
  { slug: "floor-lamps", name: "Floor Lamps", blurb: "Ambient standing light" },
  { slug: "smart-lighting", name: "Smart Lighting", blurb: "App & voice control" },
];

export const COLLECTIONS = [
  "Aurum",
  "Obsidian",
  "Crystalline",
  "Art Deco",
  "Minimalist",
  "Heritage",
];

export const FINISHES = ["Antique Brass", "Polished Chrome", "Matte Black", "Bronze"];

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  chandeliers: "Chandeliers",
  pendants: "Pendants",
  "wall-lights": "Wall Lights",
  "floor-lamps": "Floor Lamps",
  "smart-lighting": "Smart Lighting",
};

export function isCategory(value: string): value is CategorySlug {
  return CATEGORIES.some((c) => c.slug === value);
}

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  art: number;
  image?: string;
};

export type OrderLine = {
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  reference: string;
  createdAt: string;
  status: "pending" | "paid" | "cancelled";
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    notes?: string;
  };
  paymentMethod: "cod" | "card";
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
};
