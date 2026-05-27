# Dla Mamy — Cinematic Birthday Experience

Premium, mobile-first, animated birthday page.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Photos

Replace photo placeholders in components:

- **Mama's photo** → `src/components/CakeSection.tsx` — replace the placeholder `<div>` with `<Image>`
- **Memories (1-4)** → `src/components/MemoriesSection.tsx` — replace each placeholder

Put images in `public/images/` and reference as `/images/filename.jpg`.

## Deploy to Vercel

```bash
npx vercel
```

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
