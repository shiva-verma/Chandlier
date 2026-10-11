import { Input, Textarea, Select, Label } from "@/components/ui/field";
import {
  CATEGORY_LABELS,
  COLLECTIONS,
  FINISHES,
  type Product,
  type CategorySlug,
} from "@/lib/types";
import { adminCreateProduct, adminUpdateProduct } from "@/lib/admin-actions";
import { formatPrice } from "@/lib/utils";

const BADGES = ["New", "Bestseller", "Atelier", "Smart", "Sale"];

function inr(minor: number) {
  return minor / 100;
}

function Row({ label, children, span = false }: { label: string; children: React.ReactNode; span?: boolean }) {
  return (
    <div className={span ? "sm:col-span-2" : undefined}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function ProductForm({ product }: { product?: Product }) {
  const action = product
    ? adminUpdateProduct.bind(null, product.id)
    : adminCreateProduct;

  return (
    <form action={action} className="mt-8">
      <div className="grid gap-5 rounded-2xl border border-ink-line bg-ink-soft/40 p-6 sm:grid-cols-2">
        <Row label="Name *" span>
          <Input name="name" required defaultValue={product?.name} placeholder="Aurum Halo Chandelier" />
        </Row>

        <Row label="Tagline" span>
          <Input
            name="tagline"
            defaultValue={product?.tagline}
            placeholder="One-line promise for the card"
          />
        </Row>

        <Row label="Description" span>
          <Textarea
            name="description"
            defaultValue={product?.description}
            placeholder="What makes this piece special, where it shines…"
          />
        </Row>

        <Row label={`Price (₹, e.g. 249900) * — stores as ${product ? formatPrice(product.price) : ""}`}>
          <Input
            name="price"
            type="number"
            step="1"
            min="0"
            required
            defaultValue={product ? inr(product.price) : ""}
          />
        </Row>

        <Row label="Compare-at / MRP (₹)">
          <Input
            name="compareAtPrice"
            type="number"
            step="1"
            min="0"
            defaultValue={product?.compareAtPrice ? inr(product.compareAtPrice) : ""}
          />
        </Row>

        <Row label="Category">
          <Select name="category" defaultValue={product?.category ?? "chandeliers"}>
            {(Object.keys(CATEGORY_LABELS) as CategorySlug[]).map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </Select>
        </Row>

        <Row label="Collection">
          <Select name="collection" defaultValue={product?.collection ?? COLLECTIONS[0]}>
            {COLLECTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Row>

        <Row label="Finish">
          <Select name="finish" defaultValue={product?.finish ?? FINISHES[0]}>
            {FINISHES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>
        </Row>

        <Row label="Artwork variant (0–5)">
          <Select name="art" defaultValue={product?.art ?? 0}>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                Variant {n}
              </option>
            ))}
          </Select>
        </Row>

        <Row label="Stock">
          <Input name="stock" type="number" min="0" step="1" defaultValue={product?.stock ?? 5} />
        </Row>

        <Row label="Badge">
          <Select name="badge" defaultValue={product?.badge ?? ""}>
            <option value="">None</option>
            {BADGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </Row>

        <Row label="Smart enabled">
          <label className="mt-2 flex cursor-pointer items-center gap-3 text-sm text-ivory-dim">
            <input
              type="checkbox"
              name="smart"
              defaultChecked={product?.smart}
              className="h-4 w-4 accent-[#c6a15b]"
            />
            App & voice control
          </label>
        </Row>

        <Row label="Featured on home">
          <label className="mt-2 flex cursor-pointer items-center gap-3 text-sm text-ivory-dim">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product?.featured}
              className="h-4 w-4 accent-[#c6a15b]"
            />
            Show in featured rails
          </label>
        </Row>

        <Row label="Material">
          <Input name="material" defaultValue={product?.material} placeholder="Brass & lead crystal" />
        </Row>

        <Row label="Dimensions">
          <Input name="dimensions" defaultValue={product?.dimensions} placeholder="W 92 × H 84 cm" />
        </Row>

        <Row label="Wattage">
          <Input name="wattage" defaultValue={product?.wattage} placeholder="9 × 5 W LED (G9)" />
        </Row>

        <Row label="Lumens">
          <Input name="lumens" defaultValue={product?.lumens} placeholder="3600 lm" />
        </Row>

        <Row label="Colour temperature">
          <Input name="colorTemp" defaultValue={product?.colorTemp} placeholder="2700 K warm white" />
        </Row>

        <Row label="Bulb type">
          <Input name="bulbType" defaultValue={product?.bulbType} placeholder="G9 LED" />
        </Row>

        <Row label="Rating (0–5)">
          <Input name="rating" type="number" step="0.1" min="0" max="5" defaultValue={product?.rating ?? 5} />
        </Row>

        <Row label="Review count">
          <Input name="reviewCount" type="number" min="0" step="1" defaultValue={product?.reviewCount ?? 0} />
        </Row>

        <Row label="Product image URL (optional)">
          <Input
            name="image"
            type="url"
            defaultValue={product?.image}
            placeholder="https://…  Leave empty to use generated artwork"
          />
        </Row>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-full bg-gold px-8 text-[0.76rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
        >
          {product ? "Save changes" : "Create product"}
        </button>
        <a
          href="/admin"
          className="rounded-full border border-ink-line px-8 text-[0.76rem] uppercase tracking-[0.2em] text-ivory-dim transition-colors hover:border-gold hover:text-gold"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}