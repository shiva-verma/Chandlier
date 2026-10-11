# Éclat Maison — luxury chandelier & smart-lighting storefront

A full B2C e-commerce storefront with a luxury dark/gold design system, built on
**Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.

- Full shopping flow: browse → cart drawer → checkout → confirmation
- Inquiry is **WhatsApp + email only** (floating button, product "Enquire" links, contact page)
- **Admin panel** (`/admin`) to list, add, edit and remove products, plus view orders

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

Admin: http://localhost:3000/admin — default password `chandelier-admin`
(override with the `ADMIN_PASSWORD` environment variable).

## Configure your store

Everything store-facing lives in `src/lib/site-config.ts`:

| Setting | Where |
| --- | --- |
| Store name, tagline, description | `site-config.ts` |
| WhatsApp number (inquiry links) | `site-config.ts` → `whatsapp.number` |
| Contact email (inquiry links) | `site-config.ts` → `email` |
| Free-shipping threshold / flat rate | `site-config.ts` |
| Admin password | env var `ADMIN_PASSWORD` |

## Data

The catalog is a plain JSON file (`data/products.json`) that the admin panel
reads and writes. It ships with a seed catalogue; add your own pieces from
`/admin`. Customer orders are written to `data/orders.json` (git-ignored).

Swap this for PostgreSQL/Prisma later by replacing the functions in
`src/lib/products.ts` and `src/lib/orders.ts` — the rest of the app doesn't
care how data is stored.

Product images: leave the image URL empty and the storefront renders generated
brass line-art for the piece; paste an external URL in the admin form to use
real photography (`next/image` remote patterns are already allowed).

## Payments

Checkout validates and computes totals server-side (`src/lib/actions.ts`). Card
payments are simulated in test mode; plug in Stripe by replacing the
`paymentMethod === "card"` branch with a Stripe Checkout/PaymentIntent call.

## Notes for Next.js 16

This template pins to Next 16 (Turbopack, async `params`/`searchParams`, `proxy`
instead of `middleware`). Run `next typegen` after adding routes if you want the
generated `RouteContext`/`PageProps` helpers.