"use client";

import Link from "next/link";
import { useState } from "react";
import type { Playbook } from "@/lib/playbooks";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Research", value: "research" },
  { label: "Ads", value: "ads" },
  { label: "Nurture", value: "nurture" },
  { label: "Ops", value: "ops" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  research: "bg-blue-900/60 text-blue-300 border border-blue-700",
  ads: "bg-orange-900/60 text-orange-300 border border-orange-700",
  nurture: "bg-green-900/60 text-green-300 border border-green-700",
  ops: "bg-purple-900/60 text-purple-300 border border-purple-700",
};

interface PlaybooksClientProps {
  playbooks: Playbook[];
}

export default function PlaybooksClient({ playbooks }: PlaybooksClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? playbooks
      : playbooks.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
              activeCategory === cat.value
                ? "bg-indigo-600 text-white"
                : "bg-neutral-800 text-neutral-300 border border-neutral-700 hover:border-neutral-500 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Playbook grid */}
      {filtered.length === 0 ? (
        <p className="text-neutral-400 text-center py-16">
          No playbooks found in this category yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((playbook) => (
            <div
              key={playbook.slug}
              className="flex flex-col rounded-xl border border-neutral-700 bg-neutral-800 p-6 shadow-sm hover:border-neutral-500 transition-colors"
            >
              {/* Category badge */}
              <span
                className={`self-start rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                  CATEGORY_COLORS[playbook.category] ??
                  "bg-neutral-700 text-neutral-300"
                }`}
              >
                {playbook.category}
              </span>

              {/* Name */}
              <h2 className="mt-3 text-lg font-semibold leading-snug">
                {playbook.name}
              </h2>

              {/* Short description */}
              <p className="mt-2 flex-1 text-sm text-neutral-400">
                {playbook.short_description}
              </p>

              {/* Outcome text */}
              <p className="mt-4 text-sm italic text-indigo-400">
                {playbook.outcome_text}
              </p>

              {/* Price + CTA */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xl font-bold">${playbook.price_usd}</span>
                <Link
                  href={`/playbooks/${playbook.slug}`}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
