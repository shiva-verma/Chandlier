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
        <p className="rounded-full border border-gold/50 px-6 py-3 text-sm text-gold">
          Welcome to the atelier. Watch your inbox.
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
            className="h-12 rounded-full bg-ink-soft px-5"
          />
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-gold px-7 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
          >
            Join <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </form>
  );
}