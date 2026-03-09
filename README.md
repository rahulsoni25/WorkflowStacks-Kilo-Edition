# WorkflowStacks

Growth playbooks and done-for-you automation implementation for operators and founders.

---

## What is WorkflowStacks?

WorkflowStacks sells step-by-step automation playbooks that help teams set up proven growth workflows — covering lead research, paid ads, email nurture, and ops automation. Users can either buy a playbook and set it up themselves, or book an **Automation Sprint** to have the WorkflowStacks team configure everything end-to-end.

**Key pages:**
- `/` – Home: hero + featured playbooks
- `/playbooks` – Browse and filter all playbooks by category
- `/playbooks/[slug]` – Playbook detail: Before/After, How it works, What you get, Gumroad purchase CTA
- `/stackfinder` – 4-step quiz that recommends the right playbook for your goal, channels, skill level, and budget
- `/automation-sprint` – Done-for-you implementation service info + pricing

---

## Running locally

### Prerequisites

- [Bun](https://bun.sh) installed (`curl -fsSL https://bun.sh/install | bash`)
- Node.js 20+ (for Next.js compatibility)

### Install dependencies

```bash
bun install
```

### Start the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

| Command | Purpose |
|---|---|
| `bun build` | Production build |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun typecheck` | Run TypeScript type checking |

---

## Google Sheets sync script

Playbook content is managed in a Google Sheet (`WorkflowStacks_Content`, tab: `Playbooks`) and synced into `data/playbooks.json` by a local script.

### Sheet columns

| Column | Type | Notes |
|---|---|---|
| `id` | number | Unique integer |
| `slug` | string | URL-safe identifier |
| `name` | string | Display name |
| `short_description` | string | One-sentence summary |
| `category` | string | `research`, `ads`, `nurture`, or `ops` |
| `goal_tags` | string | Comma-separated (e.g. `leads,nurture`) |
| `channel_tags` | string | Comma-separated (e.g. `linkedin,email`) |
| `difficulty` | string | `beginner`, `intermediate`, or `advanced` |
| `region_tags` | string | Comma-separated (e.g. `global`) |
| `outcome_text` | string | One-line outcome statement |
| `before_bullets` | string | Pipe-separated (`\|`) pain points |
| `after_bullets` | string | Pipe-separated (`\|`) outcomes |
| `how_steps` | string | Pipe-separated (`\|`) steps |
| `what_you_get` | string | Pipe-separated (`\|`) deliverables |
| `technical_details` | string | Plain text / markdown |
| `gumroad_url` | string | Purchase link |
| `price_usd` | number | Price in USD |
| `active` | boolean | `true`/`1`/`yes` to include |
| `approved` | boolean | `true`/`1`/`yes` to include |

### Setup

1. Create a Google service account and download the JSON key.
2. Share the Google Sheet with the service account email (Viewer access is sufficient).
3. Create a `.env.local` file in the project root (this file is git-ignored):

```env
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_spreadsheet_id_from_the_url
```

### Running the sync

```bash
bun run sync:playbooks
```

This overwrites `data/playbooks.json` with the active + approved rows from the Sheet. After running, commit and push the updated JSON to trigger a Vercel rebuild.

> **Important:** Do NOT run this script during the production build. It is a local-only tool.

---

## Pricing / plan model

WorkflowStacks has two live tiers and one planned future tier:

| Tier | Price | Description |
|---|---|---|
| **DIY Playbooks** | From $29/playbook | Self-serve purchase via Gumroad; instant download |
| **Automation Sprint** | $499 one-time | Done-for-you setup by the WorkflowStacks team |
| **WorkflowStacks Pro** *(future)* | TBD | Subscription with unlimited playbook access |

See [`docs/pro.md`](docs/pro.md) for the full feature matrix.

---

## Deployment

### Connect to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the GitHub repo.
3. Vercel will auto-detect Next.js. Leave all settings at their defaults.
4. Click **Deploy**.

Every push to `main` will trigger an automatic rebuild and deployment.

### Environment variables on Vercel

The production app reads only from `data/playbooks.json` — **no environment variables are required for the Vercel build or runtime**.

If you add a future server-side sync or API route that needs Google credentials, set these in the Vercel dashboard under **Settings → Environment Variables**:

| Variable | Description |
|---|---|
| `GOOGLE_SHEETS_CLIENT_EMAIL` | Service account email |
| `GOOGLE_SHEETS_PRIVATE_KEY` | Service account private key (PEM) |
| `GOOGLE_SHEET_ID` | Spreadsheet ID |

### Content updates

The production app uses `data/playbooks.json` only. To update content:

1. Edit the Google Sheet.
2. Run `bun run sync:playbooks` locally.
3. Commit and push `data/playbooks.json`.
4. Vercel rebuilds automatically.

---

## Remaining TODOs / FIXMEs

- [ ] Replace `https://placeholder.example.com/book-automation-sprint` with the real booking URL (Calendly, Typeform, etc.) in `src/app/automation-sprint/page.tsx`.
- [ ] Replace Gumroad URLs in `data/playbooks.json` with real product links once playbooks are published.
- [ ] Update `src/app/layout.tsx` metadata (`title`, `description`) with the real site name and description.
- [ ] Add a real favicon to `src/app/favicon.ico`.
- [ ] Configure a custom domain in Vercel once the site is ready to launch.
- [ ] Enable Vercel Analytics in the dashboard for traffic monitoring.
- [ ] Add `og:image` and Twitter card meta tags for social sharing.
- [ ] WorkflowStacks Pro subscription tier — not yet built; documented in `docs/pro.md` for planning.
