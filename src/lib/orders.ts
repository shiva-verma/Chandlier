import { promises as fs } from "node:fs";
import path from "node:path";
import type { Order, OrderLine } from "./types";
import { newId, orderReference } from "./utils";
import { connectMongo, isMongoConfigured } from "./mongoose";
import { OrderModel, toOrder, type OrderDoc } from "./models/order";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, "[]", "utf8");
  }
}

async function readJson(): Promise<Order[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? (data as Order[]) : [];
  } catch {
    return [];
  }
}

async function writeJson(orders: Order[]) {
  await ensureFile();
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
}

export async function getOrders(): Promise<Order[]> {
  if (isMongoConfigured()) {
    await connectMongo();
    const docs = await OrderModel.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc) => toOrder(doc as unknown as OrderDoc));
  }
  return readJson();
}

export async function getOrderByReference(reference: string) {
  const orders = await getOrders();
  return orders.find((o) => o.reference === reference) ?? null;
}

export async function getOrdersByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  const orders = await getOrders();
  return orders.filter((o) => o.customer.email.toLowerCase() === normalized);
}

export type NewOrder = {
  customer: Order["customer"];
  paymentMethod: Order["paymentMethod"];
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
};

export async function createOrder(input: NewOrder) {
  const order: Order = {
    ...input,
    id: newId("ord"),
    reference: orderReference(),
    createdAt: new Date().toISOString(),
    status: input.paymentMethod === "cod" ? "pending" : "paid",
  };

  if (isMongoConfigured()) {
    await connectMongo();
    const { id, ...rest } = order;
    await OrderModel.create({ _id: id, ...rest });
  } else {
    const orders = await getOrders();
    orders.unshift(order);
    await writeJson(orders);
  }
  return order;
}
