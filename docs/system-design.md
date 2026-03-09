# System Design – WorkflowStacks

## High-Level Architecture

WorkflowStacks is a **static Next.js application** with no runtime backend. All pages are pre-rendered at build time from a committed JSON file. Content is managed in Google Sheets and synced locally by a script.

```
┌─────────────────────────────────────────────────────────────────┐
│  Content Management                                             │
│  Google Sheets (WorkflowStacks_Content / Playbooks tab)         │
└───────────────────────────┬─────────────────────────────────────┘
                            │  bun run sync:playbooks (local)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Data Layer                                                     │
│  data/playbooks.json  (committed to Git)                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │  import at build time
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  UI Layer – Next.js App Router (SSG)                            │
│  src/app/  →  Static HTML + JS bundles                          │
└───────────────────────────┬─────────────────────────────────────┘
                            │  git push → Vercel build trigger
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Hosting – Vercel CDN                                           │
│  Global edge network, zero cold-start                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Modules

### UI Layer (`src/app/`)

Responsible for all user-facing pages and components.

| Module | Files | Responsibility |
|---|---|---|
| Home | `src/app/page.tsx` | Hero + featured playbooks grid |
| Playbooks list | `src/app/playbooks/page.tsx`, `PlaybooksClient.tsx` | Browse + filter by category |
| Playbook detail | `src/app/playbooks/[slug]/page.tsx`, `TechnicalDetails.tsx` | SSG detail page, Gumroad CTA |
| StackFinder | `src/app/stackfinder/page.tsx`, `StackFinderClient.tsx` | 4-step quiz, deterministic matching |
| Automation Sprint | `src/app/automation-sprint/page.tsx` | Static info + pricing page |
| Root layout | `src/app/layout.tsx` | HTML shell, fonts, global CSS |

### Data Layer (`src/lib/`, `data/`)

| Module | Files | Responsibility |
|---|---|---|
| Playbook type + accessor | `src/lib/playbooks.ts` | `Playbook` type, `getPlaybooks()` |
| Playbook content | `data/playbooks.json` | Source of truth for all playbook data |

### Sync Script (`scripts/`)

| Module | Files | Responsibility |
|---|---|---|
| Google Sheets sync | `scripts/syncPlaybooks.ts` | Pull Sheet rows → write `data/playbooks.json` |

### Docs (`docs/`)

| File | Purpose |
|---|---|
| `docs/architecture.md` | System architecture and data flow |
| `docs/mvp-tech-doc.md` | MVP scope, features, tech stack |
| `docs/system-design.md` | This file |
| `docs/pro.md` | Plans and pricing documentation |

---

## Data Model

### `Playbook`

Defined in [`src/lib/playbooks.ts`](../src/lib/playbooks.ts).

| Field | Type | Description |
|---|---|---|
| `id` | `number` | Unique integer identifier |
| `slug` | `string` | URL-safe identifier (used in `/playbooks/[slug]`) |
| `name` | `string` | Display name |
| `short_description` | `string` | One-sentence summary |
| `category` | `"research" \| "ads" \| "nurture" \| "ops"` | Primary category for filtering |
| `goal_tags` | `string[]` | Goals this playbook addresses (e.g. `["leads"]`) |
| `channel_tags` | `string[]` | Channels involved (e.g. `["linkedin", "email"]`) |
| `difficulty` | `"beginner" \| "intermediate" \| "advanced"` | Setup complexity |
| `region_tags` | `string[]` | Geographic relevance (e.g. `["global"]`) |
| `outcome_text` | `string` | One-line outcome statement |
| `before_bullets` | `string[]` | Pain points before using the playbook |
| `after_bullets` | `string[]` | Outcomes after using the playbook |
| `how_steps` | `string[]` | Ordered implementation steps |
| `what_you_get` | `string[]` | Deliverables included in the purchase |
| `technical_details` | `string` | Markdown/plain text for collapsible technical section |
| `gumroad_url` | `string` | Purchase link |
| `price_usd` | `number` | Price in USD |

**Google Sheets column mapping (for sync script):**

Array fields use these delimiters in the Sheet:
- `goal_tags`, `channel_tags`, `region_tags` → comma-separated
- `before_bullets`, `after_bullets`, `how_steps`, `what_you_get` → pipe (`|`) separated

Additional Sheet-only columns (not stored in JSON):
- `active` – boolean; row is excluded if falsy
- `approved` – boolean; row is excluded if falsy

---

## Performance & Scaling

### Performance
- **Static generation (SSG):** All pages are pre-rendered at build time. No server-side rendering at request time.
- **CDN delivery:** Vercel serves assets from the nearest edge node globally.
- **No client-side data fetching:** All data is embedded in the HTML at build time.
- **`next/image`:** Use for any images added in future to get automatic optimisation and lazy loading.

### Scaling
- Adding more playbooks requires only adding rows to the Sheet, running `sync:playbooks`, and pushing the updated JSON.
- No database to scale; no server to provision.
- Vercel scales automatically for traffic spikes.

### Caching
- Vercel CDN caches static assets with long TTLs.
- No application-level caching needed (no dynamic queries).

---

## Security & Observability

### Security

- **No secrets at runtime:** The production app reads only from `data/playbooks.json`. No API keys, database URLs, or service account credentials are needed by Vercel.
- **Sync script credentials (local only):** `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, and `GOOGLE_SHEET_ID` are stored in `.env.local` (git-ignored) and never committed.
- **External links:** Gumroad and booking URLs use `target="_blank" rel="noopener noreferrer"` to prevent tab-napping.
- **No user input stored:** StackFinder quiz state is client-side only; nothing is persisted.
- **Content Security Policy:** Not yet configured; add via `next.config.ts` headers when needed.

### Observability

- **Vercel Analytics:** Can be enabled in the Vercel dashboard with zero code changes.
- **Error tracking:** Not yet configured; add Sentry via `@sentry/nextjs` when needed.
- **Build logs:** Available in the Vercel dashboard for every deployment.
- **No health check endpoint:** Not needed for a fully static site; Vercel monitors build status.
