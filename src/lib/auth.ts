import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Server-side session helper (Auth.js). */
export async function getSession() {
  return auth();
}

export async function currentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "admin";
}

/** Guards admin pages and Server Actions. */
export async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin" && session?.user?.role !== "super_admin") redirect("/login?next=/admin");
  return session.user;
}

export async function requireSuperAdmin() {
  const session = await auth();
  if (session?.user?.role !== "super_admin") redirect("/login?next=/admin");
  return session.user;
}

export async function requireTradeCustomer() {
  const session = await auth();
  if (session?.user?.role !== "trade_customer") redirect("/login?next=/trade");
  return session.user;
}

/** Guards customer-only pages. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session.user;
}
