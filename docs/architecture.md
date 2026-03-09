# Architecture – WorkflowStacks

## Overview

WorkflowStacks is a statically-generated Next.js application that sells growth playbooks and a done-for-you implementation service (Automation Sprint). All content is stored in a committed JSON file (`data/playbooks.json`) that is populated by a local sync script from Google Sheets. There is no runtime database or server-side API.

**Guiding principles:**
- Static-first: every page is pre-rendered at build time for maximum performance and zero cold-start latency.
- Content-as-code: `data/playbooks.json` is committed to the repo; Vercel rebuilds the site whenever it changes.
- Minimal external dependencies at runtime: no database, no auth, no server-side secrets in production.

---

## Components

### Frontend – Next.js App Router

| Route | File | Type |
|---|---|---|
| `/` | `src/app/page.tsx` | Server Component |
| `/playbooks` | `src/app/playbooks/page.tsx` + `PlaybooksClient.tsx` | Server + Client |
| `/playbooks/[slug]` | `src/app/playbooks/[slug]/page.tsx` + `TechnicalDetails.tsx` | SSG + Client |
| `/stackfinder` | `src/app/stackfinder/page.tsx` + `StackFinderClient.tsx` | Server + Client |
| `/automation-sprint` | `src/app/automation-sprint/page.tsx` | Server Component |

### Data Layer – JSON content

`data/playbooks.json` is the single source of truth for playbook content at build time. It is read by `src/lib/playbooks.ts` via a simple `import` — no database queries, no network calls.

### Sync Script – `scripts/syncPlaybooks.ts`

A local-only Bun/TypeScript script that authenticates with the Google Sheets API (service account), reads the `Playbooks` tab of the `WorkflowStacks_Content` spreadsheet, filters active + approved rows, maps them to the `Playbook` type, and overwrites `data/playbooks.json`. Run manually; never executed during the production build.

---

## Data Flow

```
Google Sheets (WorkflowStacks_Content / Playbooks tab)
        │
        │  bun run sync:playbooks  (local, manual)
        ▼
data/playbooks.json  ──── git commit & push ────▶  GitHub repo
                                                         │
                                                         │  Vercel build trigger
                                                         ▼
                                              next build (SSG)
                                                         │
                                                         ▼
                                              Static HTML / JS bundles
                                                         │
                                                         ▼
                                              Vercel CDN  ◀──  User browser
```

**Request lifecycle (production):**
1. User visits a URL → Vercel CDN serves pre-rendered HTML instantly.
2. React hydrates the page on the client.
3. Client-only components (`PlaybooksClient`, `StackFinderClient`, `TechnicalDetails`) become interactive.
4. No server-side data fetching occurs at request time.

---

## External Services

| Service | Purpose | When used |
|---|---|---|
| **Google Sheets** | Content management for playbooks | Sync script only (local) |
| **Gumroad** | Payment processing for playbook purchases | User clicks "Get this playbook" CTA |
| **Vercel** | Hosting, CDN, build pipeline | Production deployment |
| **Google Fonts** (via `next/font`) | Geist Sans / Geist Mono typefaces | Build time (font files bundled) |

---

## Deployment

- **Platform:** Vercel (static export / server-rendered Next.js)
- **Trigger:** Push to `main` branch on GitHub
- **Build command:** `next build` (default)
- **Output:** Static HTML + JS bundles served from Vercel's global CDN
- **Environment variables required at build time:** none (all content is in JSON)
- **Environment variables for sync script (local only):**
  - `GOOGLE_SHEETS_CLIENT_EMAIL`
  - `GOOGLE_SHEETS_PRIVATE_KEY`
  - `GOOGLE_SHEET_ID`

These are never needed by Vercel and should not be set in the Vercel dashboard unless a future server-side sync is added.
