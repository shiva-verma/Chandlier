import { Schema, model, models, type Model } from "mongoose";

export type UserRole = "admin" | "customer";

export type UserRecord = {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
};

const UserSchema = new Schema<UserRecord>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: "customer" },
    createdAt: { type: String, required: true },
  },
  { versionKey: false, timestamps: false },
);

export const UserModel: Model<UserRecord> =
  (models.User as Model<UserRecord>) || model<UserRecord>("User", UserSchema);
