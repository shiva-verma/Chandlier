import { Schema, model, models, type Model } from "mongoose";

export type QuotationStatus = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED";

export type QuotationItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  notes?: string;
};

export type QuotationRecord = {
  _id: string;
  quotationNumber: string;
  customerId?: string;
  tradePartnerId?: string;
  leadId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  terms?: string;
  validUntil?: string;
  notes?: string;
  status: QuotationStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

const QuotationSchema = new Schema<QuotationRecord>(
  {
    _id: { type: String, required: true },
    quotationNumber: { type: String, required: true, unique: true, index: true },
    customerId: { type: String },
    tradePartnerId: { type: String },
    leadId: { type: String },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    items: { type: [{ productId: String, productName: String, quantity: Number, unitPrice: Number, total: Number, notes: String }], required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    terms: { type: String },
    validUntil: { type: String },
    notes: { type: String },
    status: { type: String, required: true, default: "DRAFT", enum: ["DRAFT", "SENT", "ACCEPTED", "REJECTED", "EXPIRED"] },
    createdBy: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { versionKey: false, timestamps: false },
);

export const QuotationModel: Model<QuotationRecord> =
  (models.Quotation as Model<QuotationRecord>) || model<QuotationRecord>("Quotation", QuotationSchema);