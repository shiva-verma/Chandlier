import Link from "next/link";

const styles = [
  { name: "Modern Luxury", slug: "modern-luxury", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" },
  { name: "Minimalist", slug: "minimalist", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80" },
  { name: "Contemporary", slug: "contemporary", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
  { name: "Vintage", slug: "vintage", image: "https://images.unsplash.com/photo-1505692794403-34d4982f88aa?auto=format&fit=crop&w=1200&q=80" },
  { name: "Industrial", slug: "industrial", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80" },
  { name: "Scandinavian", slug: "scandinavian", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80" },
  { name: "Classic", slug: "classic", image: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=1200&q=80" },
  { name: "Designer Collection", slug: "designer-collection", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80" },
];

export default function ShopByStylePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav className="text-[0.66rem] uppercase tracking-[0.22em] text-taupe">
        <Link href="/" className="hover:text-gold-deep">Home</Link>
        <span className="mx-2 text-taupe/40">/</span>
        <span className="text-ink">Shop by Style</span>
      </nav>

      <header className="mt-8">
        <p className="eyebrow">Design inspiration</p>
        <h1 className="mt-3 font-display text-5xl text-ink sm:text-6xl">Shop by Style</h1>
        <p className="mt-4 max-w-xl text-taupe">Curated collections to match your aesthetic vision</p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {styles.map((style) => (
          <Link key={style.slug} href={`/shop?style=${style.slug}`} className="group relative overflow-hidden rounded-2xl border border-ink-line">
            <img src={style.image} alt={style.name} className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h2 className="font-display text-2xl text-ivory">{style.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}