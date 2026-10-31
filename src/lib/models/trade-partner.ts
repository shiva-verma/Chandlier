import { Schema, model, models, type Model } from "mongoose";

export type BusinessType = "Retailer" | "Wholesaler" | "Distributor" | "Interior designer" | "Architect" | "Contractor" | "Builder/developer" | "Other";
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export type TradePartnerRecord = {
  _id: string;
  userId: string;
  businessName: string;
  businessType: BusinessType;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  gstNumber?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  website?: string;
  instagram?: string;
  monthlyPurchaseQty?: string;
  interestedCategories: string[];
  additionalInfo?: string;
  verificationStatus: VerificationStatus;
  tradePricingEnabled: boolean;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
};

const TradePartnerSchema = new Schema<TradePartnerRecord>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    businessName: { type: String, required: true },
    businessType: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    gstNumber: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    website: { type: String },
    instagram: { type: String },
    monthlyPurchaseQty: { type: String },
    interestedCategories: { type: [String], default: [] },
    additionalInfo: { type: String },
    verificationStatus: { type: String, required: true, default: "PENDING", enum: ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"] },
    tradePricingEnabled: { type: Boolean, default: false },
    approvedAt: { type: String },
    approvedBy: { type: String },
    rejectionReason: { type: String },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { versionKey: false, timestamps: false },
);

export const TradePartnerModel: Model<TradePartnerRecord> =
  (models.TradePartner as Model<TradePartnerRecord>) || model<TradePartnerRecord>("TradePartner", TradePartnerSchema);