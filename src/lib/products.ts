import { promises as fs } from "node:fs";
import path from "node:path";
import type { Product } from "./types";
import { isCategory } from "./types";
import { newId, slugify } from "./utils";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(PRODUCTS_FILE);
  } catch {
    await fs.writeFile(PRODUCTS_FILE, "[]", "utf8");
  }
}

async function readAll(): Promise<Product[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(PRODUCTS_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? (data as Product[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(products: Product[]) {
  await ensureFile();
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf8");
}

function sortProducts(products: Product[]) {
  return [...products].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export async function getProducts() {
  return sortProducts(await readAll());
}

export async function getFeatured(limit = 8) {
  const all = await getProducts();
  return all.slice(0, limit);
}

export async function getProductBySlug(slug: string) {
  const all = await readAll();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string) {
  const all = await readAll();
  return all.find((p) => p.id === id) ?? null;
}

export async function getRelated(product: Product, limit = 4) {
  const all = await readAll();
  return all
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aScore = (a.category === product.category ? 2 : 0) + (a.smart ? 0 : 0);
      const bScore = (b.category === product.category ? 2 : 0) + (b.smart ? 0 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
}

export type ProductInput = Omit<Product, "id" | "slug" | "createdAt"> & {
  slug?: string;
};

export async function createProduct(input: ProductInput) {
  const all = await readAll();
  const baseSlug = slugify(input.slug || input.name) || newId("product");
  let slug = baseSlug;
  let n = 1;
  while (all.some((p) => p.slug === slug)) slug = `${baseSlug}-${n++}`;

  const product: Product = {
    ...input,
    id: newId("prod"),
    slug,
    createdAt: new Date().toISOString(),
  };
  all.push(product);
  await writeAll(all);
  return product;
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  const all = await readAll();
  const index = all.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const next: Product = { ...all[index], ...input, id };
  if (input.name && !input.slug) {
    const baseSlug = slugify(input.name);
    const taken = all.some((p) => p.slug === baseSlug && p.id !== id);
    next.slug = taken ? `${baseSlug}-${newId("")}` : baseSlug;
  }
  if (input.slug) next.slug = slugify(input.slug);

  all[index] = next;
  await writeAll(all);
  return next;
}

export async function deleteProduct(id: string) {
  const all = await readAll();
  const next = all.filter((p) => p.id !== id);
  if (next.length === all.length) return false;
  await writeAll(next);
  return true;
}

export type ShopFilters = {
  category?: string;
  collection?: string;
  finish?: string;
  smart?: boolean;
  min?: number;
  max?: number;
  sort?: string;
  q?: string;
};

export async function filterProducts(filters: ShopFilters) {
  let products = await getProducts();

  if (filters.category && isCategory(filters.category)) {
    products = products.filter((p) => p.category === filters.category);
  }
  if (filters.collection) {
    products = products.filter((p) => p.collection === filters.collection);
  }
  if (filters.finish) {
    products = products.filter((p) => p.finish === filters.finish);
  }
  if (filters.smart) {
    products = products.filter((p) => p.smart);
  }
  if (typeof filters.min === "number") {
    products = products.filter((p) => p.price >= filters.min!);
  }
  if (typeof filters.max === "number") {
    products = products.filter((p) => p.price <= filters.max!);
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    products = products.filter((p) =>
      [p.name, p.tagline, p.collection, p.finish, p.material]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      products.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return products;
}
