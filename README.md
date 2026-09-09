# Dosa Hut Sunshine Coast — Landing Page

A bridge landing page for the Dosa Hut Aspley branch: introduces the restaurant,
showcases the food and location, and funnels visitors to the existing Dosa Hut
Aspley online ordering system. It is not the ordering page itself — there is
no cart, checkout, or menu-ordering UI here, and no backend.

Journey: Dosa Hut main site → Queensland → Aspley → this landing page → Order Online
→ existing Dosa Hut Aspley ordering system.

## Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- Tailwind CSS v4
- Self-hosted fonts via `@fontsource` (Cormorant Garamond + Manrope) — no
  external font requests at build or runtime
- Static frontend only, deployed to Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/page.tsx` — assembles the page from section components
- `components/` — one component per section (Hero, FoodShowcase, Gallery,
  WhyUs, Location, CtaBanner, Footer, Navbar) plus shared `Button` and `Icons`
- `lib/site.ts` — single source of truth for copy that might change: the
  order-online URL, address, phone, opening hours, dish list, gallery items
- `public/images/` — photography used across the page

## Before this goes live

- `lib/site.ts` → `SITE.orderUrl` currently points to
  `https://aspley.dosahut.net.au/`. Confirm this is the correct Aspley
  ordering link.
- A couple of ambiance photos (evening dining, al fresco, lounge) are mood/
  stock imagery, not confirmed photos of the Aspley venue itself — swap in
  real Aspley photography before launch if they aren't accurate.
- The hero photo is stretched from a smaller source image; swap in a
  higher-resolution version if you have one, for a crisper hero on large
  screens.

## Deploy

Deployed via [Vercel](https://vercel.com). No environment variables or
backend are required — it's a static frontend.
