# MVP Technical Document – WorkflowStacks

## MVP Scope

**Core problem:** Operators and founders need proven, step-by-step automation playbooks but lack the time or expertise to research and configure the right tools.

**Target user persona:**
- Non-technical founders and marketers who want to automate growth workflows.
- Operators who are comfortable with tools but want a shortcut to a proven setup.

**Success criteria for MVP launch:**
- Users can browse and filter playbooks by category.
- Users can use StackFinder to get a personalised playbook recommendation.
- Users can purchase a playbook via Gumroad.
- Users can book an Automation Sprint (done-for-you implementation).
- All pages build and render without errors on Vercel.

---

## User Flows

### Onboarding
1. User lands on `/` (home) — sees hero + featured playbooks.
2. Clicks "Get my playbook" → `/stackfinder` quiz (4 steps: goal, channels, skill, budget).
3. Quiz returns up to 3 matching playbooks with rationale.
4. User clicks through to a playbook detail page.

### Core action
1. User browses `/playbooks` — filters by category chip.
2. Opens a playbook detail page (`/playbooks/[slug]`).
3. Reads Before/After, How it works, What you get, Technical details.
4. Clicks "Get this playbook" → Gumroad checkout.
5. Optionally clicks "Let us set it up for you" → `/automation-sprint`.

### Exit / return
- User bookmarks a playbook URL and returns directly.
- User shares a playbook URL with a colleague.

---

## Features

### MVP (shipped)

- **Home page** – Hero + featured playbooks grid
- **Playbooks list** (`/playbooks`) – Category filter chips, responsive card grid
- **Playbook detail** (`/playbooks/[slug]`) – SSG, two-column layout, Before/After, How it works, What you get, collapsible Technical details, Gumroad CTA, Automation Sprint add-on prompt
- **StackFinder** (`/stackfinder`) – 4-step quiz, deterministic filtering, up to 3 result cards with rationale, done-for-you banner, empty-state
- **Automation Sprint** (`/automation-sprint`) – Static info page: Hero, Who this is for, What's included, Pricing cards (DIY vs Sprint), How it works, bottom CTA
- **Google Sheets sync script** (`scripts/syncPlaybooks.ts`) – Local-only script to pull playbook content from Sheets into `data/playbooks.json`

### Out-of-scope / future features

- User accounts and authentication
- Stripe / direct payment processing (currently delegated to Gumroad)
- WorkflowStacks Pro subscription tier
- Server-side or real-time content updates (currently static JSON)
- Email capture / newsletter integration
- Analytics dashboard
- Admin CMS UI

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Static generation by default |
| Language | TypeScript 5 (strict mode) | |
| Styling | Tailwind CSS 4 | Utility-first, dark theme |
| Runtime / Package manager | Bun | Used for local dev and scripts |
| Content | JSON file (`data/playbooks.json`) | Committed to repo |
| Content source | Google Sheets | Synced locally via `sync:playbooks` |
| Payments | Gumroad | External link, no server-side integration |
| Deployment | Vercel | Static CDN, triggered by GitHub push |

---

## Constraints

- **No runtime AI calls** – StackFinder uses deterministic tag-matching, not an LLM.
- **Minimal external APIs** – Only Google Sheets (local sync) and Gumroad (external link). No API keys needed at runtime.
- **Low hosting cost** – Static pages on Vercel free tier; no database, no server.
- **No auth** – MVP has no user accounts; all content is public.
- **Performance** – All pages are pre-rendered; target Lighthouse score ≥ 90 on all Core Web Vitals.
- **Accessibility** – Semantic HTML, `aria-hidden` on decorative SVGs, keyboard-navigable CTAs.
