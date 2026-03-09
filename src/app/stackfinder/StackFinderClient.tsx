"use client";

import { useState } from "react";
import Link from "next/link";
import type { Playbook } from "@/lib/playbooks";

// ─── Types ────────────────────────────────────────────────────────────────────

type Goal = "leads" | "competitor_research" | "nurture" | "ops";
type Channel = "meta" | "google" | "linkedin" | "email" | "whatsapp";
type Skill = "non_technical" | "can_follow_guides" | "advanced";
type Budget = "<50" | "50-200" | "200+";

interface FormState {
  goal: Goal | null;
  channels: Channel[];
  skill: Skill | null;
  budget: Budget | null;
}

// ─── Label maps ───────────────────────────────────────────────────────────────

const GOAL_OPTIONS: { value: Goal; label: string }[] = [
  { value: "leads", label: "Generate leads" },
  { value: "competitor_research", label: "Competitor insights" },
  { value: "nurture", label: "Staying in touch with my audience" },
  { value: "ops", label: "Automating internal work" },
];

const CHANNEL_OPTIONS: { value: Channel; label: string }[] = [
  { value: "meta", label: "Meta (Facebook / Instagram)" },
  { value: "google", label: "Google" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
];

const SKILL_OPTIONS: { value: Skill; label: string; sub: string }[] = [
  {
    value: "non_technical",
    label: "Non-technical",
    sub: "I prefer done-for-you solutions",
  },
  {
    value: "can_follow_guides",
    label: "Can follow guides",
    sub: "I can set things up with clear instructions",
  },
  {
    value: "advanced",
    label: "Advanced",
    sub: "I'm comfortable with technical tools",
  },
];

const BUDGET_OPTIONS: { value: Budget; label: string }[] = [
  { value: "<50", label: "Under $50" },
  { value: "50-200", label: "$50 – $200" },
  { value: "200+", label: "$200+" },
];

const GOAL_LABELS: Record<Goal, string> = {
  leads: "generating leads",
  competitor_research: "competitor insights",
  nurture: "staying in touch with your audience",
  ops: "automating internal work",
};

const SKILL_LABELS: Record<Skill, string> = {
  non_technical: "non-technical",
  can_follow_guides: "able to follow guides",
  advanced: "technically advanced",
};

// ─── Filtering logic ──────────────────────────────────────────────────────────

function filterPlaybooks(
  playbooks: Playbook[],
  form: Required<{ goal: Goal; channels: Channel[]; skill: Skill; budget: Budget }>
): Playbook[] {
  const allowedDifficulties: Playbook["difficulty"][] =
    form.skill === "non_technical"
      ? ["beginner"]
      : form.skill === "can_follow_guides"
      ? ["beginner", "intermediate"]
      : ["beginner", "intermediate", "advanced"];

  return playbooks
    .filter((p) => p.goal_tags.includes(form.goal))
    .filter(
      (p) =>
        form.channels.length === 0 ||
        p.channel_tags.some((ch) => form.channels.includes(ch as Channel))
    )
    .filter((p) => allowedDifficulties.includes(p.difficulty))
    .slice(0, 3);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">
      {children}
    </p>
  );
}

function RadioCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
        selected
          ? "border-indigo-500 bg-indigo-600/20 text-white"
          : "border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-neutral-500 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function ChipButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        selected
          ? "border-indigo-500 bg-indigo-600 text-white"
          : "border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-neutral-500 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function ResultCard({
  playbook,
  goal,
  channels,
  skill,
}: {
  playbook: Playbook;
  goal: Goal;
  channels: Channel[];
  skill: Skill;
}) {
  const channelLabels =
    channels.length > 0
      ? channels
          .map(
            (ch) =>
              CHANNEL_OPTIONS.find((o) => o.value === ch)?.label ?? ch
          )
          .join(", ")
      : "your chosen channels";

  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-800 p-6">
      <div className="mb-1 flex items-center gap-2">
        <span className="rounded-full bg-indigo-600/30 px-2.5 py-0.5 text-xs font-medium text-indigo-300 capitalize">
          {playbook.category}
        </span>
        <span className="rounded-full bg-neutral-700 px-2.5 py-0.5 text-xs font-medium text-neutral-300 capitalize">
          {playbook.difficulty}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug">{playbook.name}</h3>
      <p className="mt-1 text-sm italic text-indigo-400">{playbook.outcome_text}</p>
      <p className="mt-3 text-sm text-neutral-400">
        Because you chose{" "}
        <span className="text-neutral-200">{GOAL_LABELS[goal]}</span>,{" "}
        <span className="text-neutral-200">{channelLabels}</span>, and said you
        are{" "}
        <span className="text-neutral-200">{SKILL_LABELS[skill]}</span>.
      </p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xl font-bold">${playbook.price_usd}</span>
        <Link
          href={`/playbooks/${playbook.slug}`}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
        >
          View this playbook
        </Link>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StackFinderClient({
  playbooks,
}: {
  playbooks: Playbook[];
}) {
  const [form, setForm] = useState<FormState>({
    goal: null,
    channels: [],
    skill: null,
    budget: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Playbook[]>([]);

  function toggleChannel(ch: Channel) {
    setForm((prev) => ({
      ...prev,
      channels: prev.channels.includes(ch)
        ? prev.channels.filter((c) => c !== ch)
        : [...prev.channels, ch],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.goal || !form.skill || !form.budget) return;

    const filtered = filterPlaybooks(playbooks, {
      goal: form.goal,
      channels: form.channels,
      skill: form.skill,
      budget: form.budget,
    });

    setResults(filtered);
    setSubmitted(true);
  }

  function handleReset() {
    setForm({ goal: null, channels: [], skill: null, budget: null });
    setSubmitted(false);
    setResults([]);
  }

  const isValid = form.goal !== null && form.skill !== null && form.budget !== null;

  // Show done-for-you banner when non_technical + budget >= 50
  const showDfyBanner =
    submitted &&
    form.skill === "non_technical" &&
    (form.budget === "50-200" || form.budget === "200+");

  // ── Results view ────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="space-y-6">
        {showDfyBanner && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-4">
            <p className="text-sm text-amber-300">
              <span className="font-semibold">Prefer done-for-you?</span>{" "}
              Let us set it up for you —{" "}
              <Link
                href="/automation-sprint"
                className="underline underline-offset-2 hover:text-amber-200 transition-colors"
              >
                Learn about our Automation Sprint →
              </Link>
            </p>
          </div>
        )}

        {results.length > 0 ? (
          <>
            <h2 className="text-xl font-bold">
              StackFinder recommends:
            </h2>
            <div className="space-y-4">
              {results.map((p) => (
                <ResultCard
                  key={p.slug}
                  playbook={p}
                  goal={form.goal!}
                  channels={form.channels}
                  skill={form.skill!}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-neutral-700 bg-neutral-800 px-6 py-10 text-center">
            <p className="text-lg font-semibold">No exact match found</p>
            <p className="mt-2 text-sm text-neutral-400">
              We don&apos;t have a playbook that matches all your criteria yet.
              Browse all playbooks or try different options.
            </p>
            <Link
              href="/playbooks"
              className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Browse all playbooks
            </Link>
          </div>
        )}

        <button
          type="button"
          onClick={handleReset}
          className="mt-2 text-sm text-neutral-400 underline underline-offset-2 hover:text-neutral-200 transition-colors"
        >
          ← Start over
        </button>
      </div>
    );
  }

  // ── Quiz form ────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Step 1 – Goal */}
      <fieldset>
        <SectionLabel>1. What is your main goal?</SectionLabel>
        <div className="space-y-2">
          {GOAL_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.value}
              selected={form.goal === opt.value}
              onClick={() => setForm((prev) => ({ ...prev, goal: opt.value }))}
            >
              {opt.label}
            </RadioCard>
          ))}
        </div>
      </fieldset>

      {/* Step 2 – Channels */}
      <fieldset>
        <SectionLabel>2. Which channels are you using? (pick all that apply)</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {CHANNEL_OPTIONS.map((opt) => (
            <ChipButton
              key={opt.value}
              selected={form.channels.includes(opt.value)}
              onClick={() => toggleChannel(opt.value)}
            >
              {opt.label}
            </ChipButton>
          ))}
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Skip this if you&apos;re open to any channel.
        </p>
      </fieldset>

      {/* Step 3 – Skill */}
      <fieldset>
        <SectionLabel>3. How would you describe your technical skill?</SectionLabel>
        <div className="space-y-2">
          {SKILL_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.value}
              selected={form.skill === opt.value}
              onClick={() => setForm((prev) => ({ ...prev, skill: opt.value }))}
            >
              <span className="font-medium">{opt.label}</span>
              <span className="ml-2 text-neutral-400">{opt.sub}</span>
            </RadioCard>
          ))}
        </div>
      </fieldset>

      {/* Step 4 – Budget */}
      <fieldset>
        <SectionLabel>4. What is your monthly budget for tools / ads?</SectionLabel>
        <div className="space-y-2">
          {BUDGET_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.value}
              selected={form.budget === opt.value}
              onClick={() => setForm((prev) => ({ ...prev, budget: opt.value }))}
            >
              {opt.label}
            </RadioCard>
          ))}
        </div>
      </fieldset>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Find my playbook →
      </button>
    </form>
  );
}
