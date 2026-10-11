import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "eclat_admin";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "chandelier-admin";
}

function tokenFor(password: string) {
  return createHash("sha256").update(`eclat-maison::${password}`).digest("hex");
}

export function expectedToken() {
  return tokenFor(adminPassword());
}

export async function isAdmin() {
  const store = await cookies();
  const value = store.get(COOKIE)?.value;
  return Boolean(value) && value === expectedToken();
}

/** Only call from a Server Action or Route Handler. */
export async function signIn(password: string) {
  if (password !== adminPassword()) return false;
  const store = await cookies();
  store.set(COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return true;
}

/** Only call from a Server Action or Route Handler. */
export async function signOut() {
  const store = await cookies();
  store.delete(COOKIE);
}

/** Guards admin pages and Server Actions. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
