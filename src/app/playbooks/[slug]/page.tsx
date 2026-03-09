import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlaybooks } from "@/lib/playbooks";
import TechnicalDetails from "./TechnicalDetails";

// ── SSG: pre-generate one page per playbook ──────────────────────────────────
export function generateStaticParams() {
  return getPlaybooks().map((p) => ({ slug: p.slug }));
}

// ── Per-page metadata ─────────────────────────────────────────────────────────
export function generateMetadata({ params }: { params: { slug: string } }) {
  const playbook = getPlaybooks().find((p) => p.slug === params.slug);
  if (!playbook) return {};
  return {
    title: `${playbook.name} | Playbooks`,
    description: playbook.short_description,
  };
}

// ── Colour maps ───────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  research: "bg-blue-900/60 text-blue-300 border border-blue-700",
  ads: "bg-orange-900/60 text-orange-300 border border-orange-700",
  nurture: "bg-green-900/60 text-green-300 border border-green-700",
  ops: "bg-purple-900/60 text-purple-300 border border-purple-700",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-emerald-900/60 text-emerald-300 border border-emerald-700",
  intermediate: "bg-yellow-900/60 text-yellow-300 border border-yellow-700",
  advanced: "bg-red-900/60 text-red-300 border border-red-700",
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PlaybookDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const playbook = getPlaybooks().find((p) => p.slug === params.slug);
  if (!playbook) notFound();

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Back link */}
        <Link
          href="/playbooks"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors mb-10"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          All playbooks
        </Link>

        {/* ── Two-column layout ─────────────────────────────────────────────── */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* ── Left / main column ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header */}
            <div>
              {/* Tags row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    CATEGORY_COLORS[playbook.category] ??
                    "bg-neutral-700 text-neutral-300"
                  }`}
                >
                  {playbook.category}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    DIFFICULTY_COLORS[playbook.difficulty] ??
                    "bg-neutral-700 text-neutral-300"
                  }`}
                >
                  {playbook.difficulty}
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {playbook.name}
              </h1>
              <p className="mt-4 text-lg text-neutral-300">
                {playbook.short_description}
              </p>
              <p className="mt-3 text-base italic text-indigo-400">
                {playbook.outcome_text}
              </p>
            </div>

            {/* Who this is for */}
            <div className="rounded-xl border border-neutral-700 bg-neutral-800 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-3">
                Who this is for
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {playbook.who_this_is_for}
              </p>
            </div>

            {/* Prerequisites & Time to deploy */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-700 bg-neutral-800 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-3">
                  Prerequisites
                </h2>
                <ul className="space-y-2">
                  {playbook.prerequisites.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-neutral-700 bg-neutral-800 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-3">
                  Time to deploy
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {playbook.time_to_deploy}
                </p>
              </div>
            </div>

            {/* Before / After */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Before */}
              <div className="rounded-xl border border-neutral-700 bg-neutral-800 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-red-400 mb-4">
                  Before
                </h2>
                <ul className="space-y-2">
                  {playbook.before_bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <span className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true">✗</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="rounded-xl border border-neutral-700 bg-neutral-800 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-4">
                  After
                </h2>
                <ul className="space-y-2">
                  {playbook.after_bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <span className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How it works */}
            <div>
              <h2 className="text-xl font-bold mb-6">How it works</h2>
              <ol className="space-y-4">
                {playbook.how_steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="pt-0.5 text-sm text-neutral-300">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* What you get */}
            <div>
              <h2 className="text-xl font-bold mb-6">What you get</h2>
              <ul className="space-y-3">
                {playbook.what_you_get.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical details (collapsible) */}
            <TechnicalDetails details={playbook.technical_details} />
          </div>

          {/* ── Right / sticky panel ────────────────────────────────────────── */}
          <div className="mt-12 lg:mt-0">
            <div className="sticky top-8 rounded-2xl border border-neutral-700 bg-neutral-800 p-8 shadow-lg">
              <p className="text-4xl font-extrabold">${playbook.price_usd}</p>
              <p className="mt-1 text-sm text-neutral-400">One-time purchase</p>

              <div className="mt-8 space-y-3">
                {/* Primary CTA */}
                <a
                  href={playbook.gumroad_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Get this playbook
                </a>

                <p className="mt-3 text-sm text-neutral-400 text-center">
                  Need help implementing?{" "}
                  <Link href="/automation-sprint" className="text-indigo-400 hover:text-indigo-300 underline">
                    Automation Sprint
                  </Link>{" "}
                  available as a done-for-you add-on.
                </p>

                {/* Secondary CTA */}
                <Link
                  href="/automation-sprint"
                  className="flex w-full items-center justify-center rounded-lg border border-neutral-600 bg-neutral-700 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Let us set it up for you
                </Link>
              </div>

              {/* Quick-info list */}
              <ul className="mt-8 space-y-3 text-sm text-neutral-400 border-t border-neutral-700 pt-6">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-indigo-400 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                  Instant download
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-indigo-400 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                  Lifetime access
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-indigo-400 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                  <span className="capitalize">{playbook.difficulty} level</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
