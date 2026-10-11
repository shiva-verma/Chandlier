"use client";

import { useTransition } from "react";
import { adminDeleteProduct } from "@/lib/admin-actions";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          window.confirm(`Remove "${name}" from the catalogue? This cannot be undone.`)
        ) {
          const formData = new FormData();
          formData.set("id", id);
          startTransition(() => adminDeleteProduct(formData));
        }
      }}
      className="rounded-full border border-red-400/40 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-red-300 transition-colors hover:bg-red-400/10 disabled:opacity-50"
    >
      {pending ? "Removing…" : "Remove"}
    </button>
  );
}