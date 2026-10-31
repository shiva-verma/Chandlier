"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2, Lock, Mail, User } from "lucide-react";
import { login, register, type AuthState } from "@/lib/auth-actions";

const fieldClass =
  "h-12 w-full rounded-xl border border-ink-line bg-white pl-11 pr-4 text-sm text-ink placeholder:text-taupe/70 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40";

export function AuthForm({
  mode,
  next,
  devHint,
}: {
  mode: "login" | "register";
  next?: string;
  devHint?: string;
}) {
  const action = mode === "login" ? login : register;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    null,
  );

  const isLogin = mode === "login";

  return (
    <form
      action={formAction}
      className="card-shadow mt-10 rounded-2xl border border-ink-line bg-white/70 p-8"
    >
      {next && <input type="hidden" name="next" value={next} />}

      {!isLogin && (
        <div className="mb-5">
          <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-taupe">
            Name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
              className={fieldClass}
            />
          </div>
        </div>
      )}

      <div className="mb-5">
        <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-taupe">
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-taupe">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
          <input
            type="password"
            name="password"
            required
            minLength={isLogin ? undefined : 8}
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="••••••••••"
            className={fieldClass}
          />
        </div>
        {!isLogin && (
          <p className="mt-2 text-[0.68rem] text-taupe">At least 8 characters.</p>
        )}
      </div>

      {state?.error && (
        <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-[0.76rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft disabled:opacity-60"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLogin ? "Sign in" : "Create account"}
      </button>

      <p className="mt-5 text-center text-[0.72rem] text-taupe">
        {isLogin ? (
          <>
            New here?{" "}
            <Link href="/signup" className="gold-underline text-ink">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="gold-underline text-ink">
              Sign in
            </Link>
          </>
        )}
      </p>

      {devHint && (
        <p className="mt-4 rounded-lg border border-ink-line bg-ivory px-3 py-2 text-center text-[0.66rem] uppercase tracking-[0.16em] text-taupe">
          {devHint}
        </p>
      )}
    </form>
  );
}
