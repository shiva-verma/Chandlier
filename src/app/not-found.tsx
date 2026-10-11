import Link from "next/link";
import { ProductArt } from "@/components/ui/product-art";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-2xl place-items-center px-6 text-center">
      <div>
        <div className="mx-auto h-36 w-36 opacity-70">
          <ProductArt variant={3} />
        </div>
        <p className="eyebrow mt-8">404</p>
        <h1 className="mt-3 font-display text-5xl">This room is empty.</h1>
        <p className="mt-4 text-sm text-ivory-dim">
          The page you&apos;re looking for has moved, or was never lit.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center rounded-full border border-gold/60 px-8 text-[0.72rem] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}