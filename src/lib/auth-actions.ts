"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { isMongoConfigured } from "@/lib/mongoose";
import { createUser, getUserByEmail } from "@/lib/users";

export type AuthState = { error?: string } | null;

function safeNext(value: FormDataEntryValue | null) {
  const next = String(value ?? "");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: next });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Incorrect email or password." };
    }
    throw error; // re-throw NEXT_REDIRECT on success
  }
}

export async function register(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Please complete every field." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (password.length < 8) {
    return { error: "Use a password of at least 8 characters." };
  }
  if (!isMongoConfigured()) {
    return {
      error:
        "Account creation is unavailable until the database is connected. Please try again later.",
    };
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return { error: "An account with that email already exists." };
  }

  await createUser({ name, email, password, role: "customer" });

  try {
    await signIn("credentials", { email, password, redirectTo: "/account" });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but sign-in failed. Please log in." };
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
