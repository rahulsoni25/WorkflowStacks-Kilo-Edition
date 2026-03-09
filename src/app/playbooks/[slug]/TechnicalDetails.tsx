"use client";

import { useState } from "react";

interface TechnicalDetailsProps {
  details: string;
}

export default function TechnicalDetails({ details }: TechnicalDetailsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-800 overflow-hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-white hover:bg-neutral-700/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        aria-expanded={open}
      >
        <span>Technical details</span>
        <svg
          className={`h-5 w-5 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="px-6 pb-6 pt-2 text-sm text-neutral-300 leading-relaxed border-t border-neutral-700">
          {details}
        </div>
      )}
    </div>
  );
}
