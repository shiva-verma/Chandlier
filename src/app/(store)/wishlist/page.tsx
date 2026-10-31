import { getProducts } from "@/lib/products";
import { WishlistFilter } from "@/components/store/wishlist-filter";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav className="text-[0.66rem] uppercase tracking-[0.22em] text-taupe">
        <Link href="/" className="hover:text-gold-deep">
          Home
        </Link>
        <span className="mx-2 text-taupe/40">/</span>
        <span className="text-ink">Wishlist</span>
      </nav>

      <header className="mt-8">
        <p className="eyebrow">Saved pieces</p>
        <h1 className="mt-3 font-display text-5xl text-ink sm:text-6xl">Your Wishlist</h1>
        <p className="mt-4 max-w-xl text-taupe">
          Pieces you've saved for later. Enquire via WhatsApp or email to discuss pricing and availability.
        </p>
      </header>

      <WishlistFilter products={products} />
    </div>
  );
}