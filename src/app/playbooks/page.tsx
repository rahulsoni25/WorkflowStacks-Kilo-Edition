import { getPlaybooks } from "@/lib/playbooks";
import PlaybooksClient from "./PlaybooksClient";

export const metadata = {
  title: "Playbooks | StackFinder",
  description:
    "Browse all growth playbooks. Filter by category and find the right playbook for your goals.",
};

export default function PlaybooksPage() {
  const playbooks = getPlaybooks();

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            All Playbooks
          </h1>
          <p className="mt-3 text-lg text-neutral-400">
            {playbooks.length} playbook{playbooks.length !== 1 ? "s" : ""}{" "}
            available — filter by category to find the right fit.
          </p>
        </div>

        {/* Client component handles filtering + grid */}
        <PlaybooksClient playbooks={playbooks} />
      </div>
    </main>
  );
}
