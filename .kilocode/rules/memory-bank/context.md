# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Ready for development

The template is a clean Next.js 16 starter with TypeScript and Tailwind CSS 4. It's ready for AI-assisted expansion to build any type of application.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Playbook data model (`Playbook` type + `getPlaybooks()` in `src/lib/playbooks.ts`)
- [x] Sample playbook data in `data/playbooks.json`
- [x] Home page v2: Hero section + Featured Playbooks grid using `getPlaybooks()`
- [x] `/playbooks` list page: server component + `PlaybooksClient` with category filter chips (All, Research, Ads, Nurture, Ops) and responsive card grid
- [x] `/playbooks/[slug]` detail page: SSG via `generateStaticParams`, two-column layout (main + sticky right panel), Before/After, How it works, What you get, collapsible Technical details (`TechnicalDetails` client component)
- [x] `data/playbooks.json` expanded to 8 playbooks with proper `goal_tags` (`leads`, `competitor_research`, `nurture`, `ops`) and `channel_tags` (`meta`, `google`, `linkedin`, `email`, `whatsapp`)
- [x] `/stackfinder` quiz page: server component wrapper + `StackFinderClient` (`"use client"`) with 4-step form (goal, channels, skill, budget), deterministic filtering, up to 3 result cards with "Because you chose…" rationale, done-for-you banner for non-technical + budget ≥ $50, empty-state with browse link
- [x] `/automation-sprint` static info page: Hero with headline + CTA, "Who this is for", "What's included", "How it works" (5-step numbered list), bottom CTA section; placeholder booking URL; no data fetching
- [x] /automation-sprint: added Pricing section with DIY Playbooks ($29/playbook) and Automation Sprint ($499) cards
- [x] /playbooks/[slug]: added "Need help implementing? Automation Sprint add-on" text below CTA
- [x] docs/pro.md: updated with DIY Playbooks, Automation Sprint, WorkflowStacks Pro plans and feature matrix
- [x] `scripts/syncPlaybooks.ts`: Google Sheets → `data/playbooks.json` sync script using service account auth; `sync:playbooks` npm script added; `googleapis` dev dependency installed
- [x] `docs/architecture.md`: populated with components, data flow diagram, external services, deployment story
- [x] `docs/mvp-tech-doc.md`: populated with MVP scope, user flows, features (shipped vs future), tech stack, constraints
- [x] `docs/system-design.md`: populated with high-level architecture, modules, Playbook data model, performance/scaling, security/observability
- [x] `README.md`: created with project description, local dev setup, Sheets sync instructions, pricing model overview, Vercel deployment guide, remaining TODOs
- [x] Updated Playbook data model with system-style names, outcome-driven outcomes, and new fields (`who_this_is_for`, `prerequisites`, `time_to_deploy`)
- [x] Updated playbook detail page with "Who this is for" and "Prerequisites & Time to deploy" sections
- [x] Added `is_placeholder` field to Playbook type and sync script
- [x] Updated playbook detail page with placeholder vs real CTA logic (shows "Join waitlist" for placeholders, "Get this playbook" for real products)
- [x] Added Launch checklist and Smoke test sections to `docs/mvp-tech-doc.md`
- [x] Added "How to add a new playbook" section to `README.md`

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

The template is ready. Next steps depend on user requirements:

1. What type of application to build
2. What features are needed
3. Design/branding preferences

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-03-09 | Added Pricing section to /automation-sprint, "Need help implementing?" add-on text to /playbooks/[slug], updated docs/pro.md with plans and feature matrix |
| 2026-03-09 | Updated Playbook data model with system-style names (e.g., "LinkedIn Lead Mining Engine"), outcome-driven outcomes (numeric targets), and new fields (who_this_is_for, prerequisites, time_to_deploy); Added "Who this is for" and "Prerequisites & Time to deploy" sections to playbook detail page |
| 2026-03-12 | ✅ Final version: Production build successful, all pages compiled and deployed
