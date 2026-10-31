import { Schema, model, models, type Model } from "mongoose";

export type CustomerType = "B2C" | "B2B";
export type LeadSource = "product_enquiry" | "whatsapp" | "email" | "trade_registration" | "bulk_quotation" | "lighting_studio" | "contact_form" | "project_enquiry";
export type LeadStatus = "NEW" | "CONTACTED" | "INTERESTED" | "QUOTATION_SENT" | "NEGOTIATION" | "CONVERTED" | "LOST";

export type LeadRecord = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  customerType: CustomerType;
  source: LeadSource;
  products?: Array<{ productId: string; name: string; quantity?: number }>;
  productCategory?: string;
  budget?: string;
  message?: string;
  status: LeadStatus;
  assignedTo?: string;
  followUpAt?: string;
  internalNotes: Array<{ note: string; addedBy: string; addedAt: string }>;
  createdAt: string;
  updatedAt: string;
};

const LeadSchema = new Schema<LeadRecord>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    customerType: { type: String, required: true, enum: ["B2C", "B2B"] },
    source: { type: String, required: true },
    products: { type: [{ productId: String, name: String, quantity: Number }], default: [] },
    productCategory: { type: String },
    budget: { type: String },
    message: { type: String },
    status: { type: String, required: true, default: "NEW", enum: ["NEW", "CONTACTED", "INTERESTED", "QUOTATION_SENT", "NEGOTIATION", "CONVERTED", "LOST"] },
    assignedTo: { type: String },
    followUpAt: { type: String },
    internalNotes: { type: [{ note: String, addedBy: String, addedAt: String }], default: [] },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { versionKey: false, timestamps: false },
);

export const LeadModel: Model<LeadRecord> =
  (models.Lead as Model<LeadRecord>) || model<LeadRecord>("Lead", LeadSchema);