import { Schema, model, models, type Model } from "mongoose";
import type { Order } from "@/lib/types";

export type OrderDoc = Omit<Order, "id"> & { _id: string };

const OrderSchema = new Schema<OrderDoc>(
  {
    _id: { type: String, required: true },
    reference: { type: String, required: true, unique: true, index: true },
    createdAt: { type: String, required: true, index: true },
    status: { type: String, required: true },
    customer: {
      name: String,
      email: { type: String, index: true },
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      notes: String,
    },
    paymentMethod: { type: String, required: true },
    lines: [
      {
        _id: false,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { versionKey: false, timestamps: false },
);

export const OrderModel: Model<OrderDoc> =
  (models.Order as Model<OrderDoc>) || model<OrderDoc>("Order", OrderSchema);

export function toOrder(doc: OrderDoc): Order {
  const { _id, ...rest } = doc;
  return { id: String(_id), ...rest };
}
