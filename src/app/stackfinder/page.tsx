import type { Metadata } from "next";
import { getPlaybooks } from "@/lib/playbooks";
import StackFinderClient from "./StackFinderClient";

export const metadata: Metadata = {
  title: "StackFinder – Find Your Growth Playbook",
  description:
    "Answer 4 quick questions and StackFinder will recommend the right growth playbook for your goal, channels, skill level, and budget.",
};

export default function StackFinderPage() {
  const playbooks = getPlaybooks();

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Find your playbook
          </h1>
          <p className="mt-3 text-neutral-400">
            Answer 4 quick questions and we&apos;ll recommend the right playbook
            for you.
          </p>
        </div>
        <StackFinderClient playbooks={playbooks} />
      </div>
    </main>
  );
}
