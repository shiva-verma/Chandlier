import { Schema, model, models, type Model } from "mongoose";
import type { Product } from "@/lib/types";

/**
 * Mongo document shape. `collection` is a reserved Mongoose schema key, so the
 * product's collection name is stored as `collectionName` and mapped back on
 * read/write. Every other field matches the app `Product` type 1:1.
 */
export type ProductDoc = Omit<Product, "id" | "collection"> & {
  _id: string;
  collectionName: string;
};

const ProductSchema = new Schema<ProductDoc>(
  {
    _id: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    category: { type: String, required: true, index: true },
    collectionName: { type: String, default: "" },
    finish: { type: String, default: "" },
    material: { type: String, default: "" },
    dimensions: { type: String, default: "" },
    wattage: { type: String, default: "" },
    lumens: { type: String, default: "" },
    colorTemp: { type: String, default: "" },
    bulbType: { type: String, default: "" },
    smart: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    badge: { type: String },
    featured: { type: Boolean, default: false, index: true },
    image: { type: String },
    imagePublicId: { type: String },
    images: { type: [String], default: [] },
    imagePublicIds: { type: [String], default: [] },
    art: { type: Number, default: 0 },
    createdAt: { type: String, required: true },
  },
  { versionKey: false, timestamps: false },
);

export const ProductModel: Model<ProductDoc> =
  (models.Product as Model<ProductDoc>) ||
  model<ProductDoc>("Product", ProductSchema);

export function toProduct(doc: ProductDoc): Product {
  const { _id, collectionName, ...rest } = doc;
  return { id: String(_id), collection: collectionName ?? "", ...rest };
}
