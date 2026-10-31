# Tejora

A luxury single-brand B2C chandelier and lighting e-commerce experience built with Next.js 16, TypeScript, Tailwind CSS, and shadcn-style UI components. Tejora is an inquiry-only storefront with WhatsApp and email inquiries - no payment processing.

## Features

- **Luxury storefront** - Tejora-branded single-brand B2C experience with warm ivory/mocha/brass palette
- **Product catalog** - Chandeliers, pendants, wall lights, floor lamps, and smart lighting with detailed specs
- **Image gallery** - Main image with thumbnails, lightbox zoom with keyboard navigation
- **Wishlist** - Save favorite pieces with heart icons, dedicated wishlist page
- **Recently viewed** - Track and display browsing history across the site
- **Share product** - Share via Web Share API or copy link with one click
- **Advanced filters** - Filter by category, collection, finish, smart lighting, and price range slider
- **Inquiry-only flow** - WhatsApp and email inquiries (no cart checkout payments)
- **Real authentication** - Auth.js v5 with credentials login/signup, customer accounts
- **Order history** - Track inquiries/orders by email in customer account
- **Admin panel** - Manage products, orders, and content with multi-image upload
- **Cloudinary integration** - Image storage with gallery support (main + additional images)
- **MongoDB persistence** - Mongoose models with dual-mode (MongoDB/JSON fallback)
- **Responsive design** - Mobile-first with Tailwind CSS and shadcn-style UI

## Tech Stack

- [Next.js 16](https://nextjs.org/) - App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Auth.js v5](https://authjs.dev/) - Authentication
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Cloudinary](https://cloudinary.com/) - Image storage
- [Lucide React](https://lucide.dev/) - Icons
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (optional - falls back to JSON files if not configured)
- Cloudinary account (optional - for image uploads)

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# MongoDB (optional - uses JSON fallback if not set)
MONGODB_URI=mongodb+srv://...
MONGODB_DB=Chandlier

# Auth.js
AUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (supports CLOUDINARY_URL or individual vars)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
# or
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Admin seeding
ADMIN_EMAIL=admin@tejora.com
ADMIN_PASSWORD=your-secure-password
```

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Seeding

```bash
npm run seed
```

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/          # Next.js App Router pages and API routes
├── components/   # React components (UI, store, admin)
├── lib/          # Utilities, models, auth, data layer
└── auth.ts       # Auth.js configuration
```

## Brand

**Tejora** - Single-brand luxury lighting studio. Inquiry-only model with WhatsApp and email contact. No shopping cart payments or checkout flows.
