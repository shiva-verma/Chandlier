"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/field";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
      className="mx-auto mt-8 flex max-w-md gap-3"
    >
      {done ? (
        <p className="rounded-full border border-brass/40 px-6 py-3 text-sm text-ink">
          Welcome to the studio. Watch your inbox.
        </p>
      ) : (
        <>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            className="h-12 rounded-full bg-white px-5"
          />
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-7 text-[0.72rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mocha-soft"
          >
            Join <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </form>
  );
}
