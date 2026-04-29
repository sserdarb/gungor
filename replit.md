# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

### `artifacts/gungor-yalitim` — Güngör Yalıtım Uygulama Çözümleri Website
Premium bilingual (TR/EN) corporate website for a waterproofing & industrial flooring company based in İzmir Folkart Towers.

**Tech stack:** React + Vite + TypeScript, Tailwind CSS, Framer Motion, wouter router, i18n context

**Design:** Dark teal (#0D3143) + gold (#E8C895/#A58E6A) + cream (#FDFDFD), Kalnia serif + Urbanist sans-serif fonts

**Key files:**
- `src/lib/i18n.tsx` — LangContext with TR/EN toggle, `useLang()` hook, all translation strings
- `src/data/services.ts` — 23 services (9 waterproofing + 14 flooring) with bilingual content + Pexels images
- `src/data/projects.ts` — 6 sample projects with bilingual content + Pexels images
- `src/App.tsx` — wouter router: `/`, `/hizmetler/:slug`, `/projeler`, `/projeler/:slug`
- `src/pages/home.tsx` — Homepage with all sections
- `src/pages/service-detail.tsx` — Individual service detail page
- `src/pages/projects.tsx` — Projects listing with water/floor filter
- `src/pages/project-detail.tsx` — Individual project detail page

**Components:** Navbar (language toggle, transparent→opaque on scroll), Hero (video bg), Services (full-width grid, clickable cards), Solutions, WhyUs, Portfolio (links to /projeler), Partners (TACER/Prosista/Lunik), Contact (form), Footer (service links)

**Image strategy:** Pexels CDN `https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=1200`

**CSS vars:** `--teal-dark: #0D3143`, `--teal-mid: #18465C`, `--gold: #A58E6A`, `--gold-light: #E8C895`, `--bg-cream: #FDFDFD`

---

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
