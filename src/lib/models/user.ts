import { Schema, model, models, type Model } from "mongoose";

export type UserRole = "admin" | "super_admin" | "customer" | "trade_customer";

export type UserRecord = {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
  phone?: string;
  whatsapp?: string;
};

const UserSchema = new Schema<UserRecord>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: "customer", enum: ["admin", "super_admin", "customer", "trade_customer"] },
    createdAt: { type: String, required: true },
    phone: { type: String },
    whatsapp: { type: String },
  },
  { versionKey: false, timestamps: false },
);

export const UserModel: Model<UserRecord> =
  (models.User as Model<UserRecord>) || model<UserRecord>("User", UserSchema);
