import Link from "next/link";
import { getPlaybooks } from "@/lib/playbooks";

export default function Home() {
  const featured = getPlaybooks().slice(0, 4);

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Growth Playbooks that Just Work
        </h1>
        <p className="mt-6 max-w-xl text-lg text-neutral-400 sm:text-xl">
          Pick a goal, StackFinder recommends a playbook, we help you deploy it.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/stackfinder"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Get my playbook
          </Link>
          <Link
            href="/playbooks"
            className="rounded-lg border border-neutral-600 px-6 py-3 text-base font-semibold text-neutral-200 hover:border-neutral-400 hover:text-white transition-colors"
          >
            Browse playbooks
          </Link>
        </div>
      </section>

      {/* Featured Playbooks */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">
          Featured Playbooks
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((playbook) => (
            <div
              key={playbook.slug}
              className="flex flex-col rounded-xl border border-neutral-700 bg-neutral-800 p-6 shadow-sm hover:border-neutral-500 transition-colors"
            >
              <h3 className="text-lg font-semibold leading-snug">
                {playbook.name}
              </h3>
              <p className="mt-2 flex-1 text-sm text-neutral-400">
                {playbook.short_description}
              </p>
              <p className="mt-4 text-sm italic text-indigo-400">
                {playbook.outcome_text}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xl font-bold">
                  ${playbook.price_usd}
                </span>
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
      </section>
    </main>
  );
}
