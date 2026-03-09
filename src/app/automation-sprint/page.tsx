import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automation Sprint – We Set Up Your Playbook For You",
  description:
    "Not technical? No problem. Our Automation Sprint service sets up your chosen growth playbook end-to-end so you can focus on results, not setup.",
};

// ── Icon helpers ──────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
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
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const WHO_ITS_FOR = [
  "You've found a playbook that fits your goal but don't want to set it up yourself.",
  "You're not technical and prefer someone else to handle the tools and integrations.",
  "You want results fast — without spending weeks figuring out the tech stack.",
  "You're a founder or marketer who'd rather focus on strategy than implementation.",
];

const WHATS_INCLUDED = [
  "Full end-to-end setup of your chosen playbook (tools, automations, integrations).",
  "Custom configuration tailored to your brand, audience, and channels.",
  "A 30-minute walkthrough call so you understand exactly what was built.",
  "7 days of post-launch support via email for any questions or tweaks.",
  "A short SOP document so your team can maintain and extend the setup.",
];

const HOW_IT_WORKS = [
  {
    step: "Book your sprint",
    detail:
      "Click the button below to book. You'll fill in a short intake form telling us your goal, channels, and the playbook you want deployed.",
  },
  {
    step: "We review & confirm",
    detail:
      "Within 24 hours we'll confirm scope, timeline (typically 3–5 business days), and any access we need from you.",
  },
  {
    step: "We build it",
    detail:
      "Our team sets up every tool, automation, and integration specified in the playbook — fully configured for your business.",
  },
  {
    step: "Walkthrough & handoff",
    detail:
      "We walk you through everything on a live call, hand over credentials and the SOP doc, and answer your questions.",
  },
  {
    step: "7-day support window",
    detail:
      "After handoff you have 7 days to email us with any issues or minor adjustments — we'll fix them at no extra charge.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AutomationSprintPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Back link */}
        <Link
          href="/playbooks"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors mb-12"
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
          Browse playbooks
        </Link>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-indigo-900/60 border border-indigo-700 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-6">
            Done-for-you service
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Automation Sprint: We Set Up Your Playbook For You.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-400 sm:text-xl">
            Pick a playbook. We handle every tool, integration, and automation
            — end-to-end — so you can start seeing results without touching a
            single line of code.
          </p>
          <div className="mt-10">
            <a
              href="https://placeholder.example.com/book-automation-sprint"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              Book Automation Sprint
            </a>
          </div>
        </div>

        {/* ── Sections ──────────────────────────────────────────────────────── */}
        <div className="space-y-16">
          {/* Who this is for */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              Who this is for
            </h2>
            <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-8">
              <ul className="space-y-4">
                {WHO_ITS_FOR.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* What's included */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              What&apos;s included
            </h2>
            <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-8">
              <ul className="space-y-4">
                {WHATS_INCLUDED.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card A – DIY Playbooks */}
              <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-8 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">DIY Playbooks</h3>
                  <span className="rounded-full bg-neutral-700 border border-neutral-600 px-3 py-1 text-xs font-semibold text-neutral-300">
                    Self-serve
                  </span>
                </div>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold">From $29</span>
                </div>
                <p className="text-sm text-neutral-400 mb-6">per playbook, one-time</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Instant download after purchase",
                    "Step-by-step setup guide",
                    "Tool & integration checklist",
                    "Community support",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/playbooks"
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-600 px-6 py-3 text-sm font-semibold text-neutral-200 hover:border-neutral-400 hover:text-white transition-colors"
                >
                  Browse Playbooks
                </Link>
              </div>

              {/* Card B – Automation Sprint (featured) */}
              <div className="rounded-2xl border border-indigo-500 bg-neutral-800 p-8 flex flex-col ring-1 ring-indigo-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Automation Sprint</h3>
                  <span className="rounded-full bg-indigo-900/60 border border-indigo-700 px-3 py-1 text-xs font-semibold text-indigo-300">
                    Done-for-you
                  </span>
                </div>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold">$499</span>
                </div>
                <p className="text-sm text-neutral-400 mb-6">one-time implementation fee</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Everything in DIY Playbooks",
                    "Full setup & configuration by our team",
                    "Custom workflow tailored to your stack",
                    "1-hour walkthrough call",
                    "7-day post-launch support",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://placeholder.example.com/book-automation-sprint"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                >
                  Book Automation Sprint
                </a>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              How it works
            </h2>
            <ol className="space-y-6">
              {HOW_IT_WORKS.map(({ step, detail }, i) => (
                <li key={i} className="flex items-start gap-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold">
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="font-semibold text-white">{step}</p>
                    <p className="mt-1 text-sm text-neutral-400">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
        <div className="mt-20 rounded-2xl border border-indigo-700 bg-indigo-900/30 p-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to skip the setup?
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
            Book your Automation Sprint today and have your playbook live within
            a week — without writing a single line of code.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://placeholder.example.com/book-automation-sprint"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              Book Automation Sprint
            </a>
            <Link
              href="/stackfinder"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-600 px-8 py-4 text-base font-semibold text-neutral-200 hover:border-neutral-400 hover:text-white transition-colors"
            >
              Find my playbook first
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
