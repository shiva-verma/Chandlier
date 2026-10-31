import Link from "next/link";

const rooms = [
  { name: "Living Room", slug: "living-room", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", desc: "Statement chandeliers and ambient lighting" },
  { name: "Bedroom", slug: "bedroom", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80", desc: "Soft, intimate lighting solutions" },
  { name: "Dining Room", slug: "dining-room", image: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=1200&q=80", desc: "Elegant pendant and chandelier lighting" },
  { name: "Kitchen", slug: "kitchen", image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80", desc: "Task and under-cabinet lighting" },
  { name: "Bathroom", slug: "bathroom", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80", desc: "Water-resistant wall and ceiling lights" },
  { name: "Hallway", slug: "hallway", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", desc: "Welcoming entrance lighting" },
  { name: "Staircase", slug: "staircase", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80", desc: "Dramatic vertical lighting" },
  { name: "Office", slug: "office", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", desc: "Focused task lighting" },
  { name: "Outdoor", slug: "outdoor", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", desc: "Weather-resistant lighting solutions" },
];

export default function ShopByRoomPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav className="text-[0.66rem] uppercase tracking-[0.22em] text-taupe">
        <Link href="/" className="hover:text-gold-deep">Home</Link>
        <span className="mx-2 text-taupe/40">/</span>
        <span className="text-ink">Shop by Room</span>
      </nav>

      <header className="mt-8">
        <p className="eyebrow">Room inspiration</p>
        <h1 className="mt-3 font-display text-5xl text-ink sm:text-6xl">Shop by Room</h1>
        <p className="mt-4 max-w-xl text-taupe">Find the perfect lighting for every space in your home or project</p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Link key={room.slug} href={`/shop?room=${room.slug}`} className="group relative overflow-hidden rounded-2xl border border-ink-line">
            <img src={room.image} alt={room.name} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="font-display text-3xl text-ivory">{room.name}</h2>
              <p className="mt-2 text-sm text-ivory/80">{room.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}