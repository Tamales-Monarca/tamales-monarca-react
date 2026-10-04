# Restaurante El Monarca

The website for **Restaurante El Monarca**, a family-owned Mexican restaurant in Emporia, Kansas. It covers handmade tamales, breakfast served all day, tacos, tortas, birria, pozole and menudo.

The site is a single bilingual (English / Español) page with these sections: hero, full menu, our story, visit us (hours, map, phones) and footer. It is exported as static HTML, so it can be hosted on any static host or CDN.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, `output: "export"`) on React 19
- [Tailwind CSS 4](https://tailwindcss.com) with the brand theme tokens in `app/globals.css`
- [shadcn/ui](https://ui.shadcn.com) primitives in `components/ui`
- [cult-ui](https://www.cult-ui.com) components installed through the shadcn registry: `bg-media`, `text-animate`, `texture-card`, `texture-button`, `texture-overlay`, `three-d-carousel` and others
- [Motion](https://motion.dev) for animation, [lucide-react](https://lucide.dev) for icons (light theme only)
- [Biome](https://biomejs.dev) for linting and formatting

## Getting started

```bash
yarn install
yarn dev      # http://localhost:3000
yarn build    # static export to ./out
yarn start    # preview ./out with a static server (npx serve)
yarn lint     # biome check (read-only, CI-safe)
yarn lint:fix # biome check --write (format + safe fixes)
yarn typecheck
yarn verify   # lint + typecheck
```

## Project layout

| Path | Purpose |
| --- | --- |
| `app/layout.tsx` | Fonts (Fraunces, DM Sans, Caveat), SEO metadata, Open Graph and Twitter tags, schema.org `Restaurant` JSON-LD |
| `app/page.tsx` | Page composition: Header, Hero, Menu, About, Visit, Footer |
| `app/robots.ts`, `app/sitemap.ts` | Generated `robots.txt` and `sitemap.xml` |
| `components/sections/*` | One file per page section |
| `components/menu/*` | Menu building blocks: category nav, item rows, tamales board, dish photo strip |
| `components/ui/*` | shadcn and cult-ui components (vendored, so they can be edited) |
| `lib/site.ts` | Business info (address, phones, hours, links), page copy and JSON-LD |
| `lib/menu.ts` | Bilingual menu data and prices |
| `lib/i18n.ts`, `components/language-provider.tsx` | EN/ES language state, saved in `localStorage` |
| `public/` | Logos, favicons, web manifest, OG image, dish photos (`images/dishes`) |

## Editing content

- **Menu items and prices:** edit `lib/menu.ts`. Each item has an `en` and `es` name and description. If an item has no `prices`, the site shows "Ask in store".
- **Hours, address, phones and links:** edit `site` in `lib/site.ts`. The page, the footer and the JSON-LD all read from it.
- **Text on the page:** edit `copy` in `lib/site.ts`.

## Adding shadcn / cult-ui components

```bash
npx shadcn@latest add <component>
npx shadcn@latest add https://cult-ui.com/r/<component>.json
```

After you add one, check the new files for `import { cn } from "cn"` and change it to `import { cn } from "@/lib/utils"`.

## Before launch

Confirm these with the owner, as listed in `site.unverified`:

- the street address

When online ordering launches, set `links.order` in `lib/site.ts` to turn the
Order Online buttons back on.

The site is served at https://elmonarcaemporia.com (`site.url`).
