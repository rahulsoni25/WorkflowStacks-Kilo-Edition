"use client";

import { useState } from "react";
import Link from "next/link";
import { Playbook } from "@/lib/playbooks";

// Tool categories for the repository
const TOOL_CATEGORIES = [
  { id: "research", label: "🔍 Research", description: "Lead mining & competitor intel" },
  { id: "ads", label: "📣 Ads", description: "Meta, Google & paid acquisition" },
  { id: "nurture", label: "📧 Nurture", description: "Email, WhatsApp & content" },
  { id: "ops", label: "⚙️ Ops", description: "Automation & process docs" },
] as const;

export function ToolsClient({ playbooks }: { playbooks: Playbook[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTools, setSelectedTools] = useState<Set<number>>(new Set());

  const filteredTools = selectedCategory === "all"
    ? playbooks
    : playbooks.filter((p) => p.category === selectedCategory);

  const toggleTool = (id: number) => {
    setSelectedTools((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedPlaybooks = playbooks.filter((p) => selectedTools.has(p.id));
  const totalPrice = selectedPlaybooks.reduce((sum, p) => sum + (p.price_usd || 0), 0);
  const bundleDiscount = selectedTools.size >= 3 ? 0.15 : selectedTools.size >= 2 ? 0.1 : 0;
  const discountedPrice = totalPrice * (1 - bundleDiscount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">🧰 Tools Repository</h1>
              <p className="text-slate-400 text-sm">Bundle tools together and save up to 15%</p>
            </div>
            {selectedTools.size > 0 && (
              <div className="text-right">
                <p className="text-slate-400 text-xs">Bundle Price</p>
                <p className="text-2xl font-bold text-emerald-400">
                  ${discountedPrice.toFixed(0)}
                  {bundleDiscount > 0 && (
                    <span className="text-sm text-slate-500 line-through ml-2">
                      ${totalPrice}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Tools Grid */}
          <div className="flex-1">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                All Tools
              </button>
              {TOOL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTools.map((tool) => {
                const isSelected = selectedTools.has(tool.id);
                return (
                  <div
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                        : "border-slate-700/50 bg-slate-800/50 hover:border-slate-600"
                    }`}
                  >
                    {/* Selection indicator */}
                    <div
                      className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-slate-600"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Category badge */}
                    <div className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                      {tool.category}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-2 pr-8">
                      {tool.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {tool.short_description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.channel_tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-slate-700/50 text-slate-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {tool.difficulty && (
                        <span className="px-2 py-0.5 text-xs bg-slate-700/50 text-slate-300 rounded">
                          {tool.difficulty}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-white">
                        ${tool.price_usd}
                      </span>
                      {tool.difficulty === "beginner" && (
                        <span className="text-xs text-emerald-400">✓ Easy setup</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Stack Summary */}
          <div className="lg:w-80">
            <div className="sticky top-24">
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Your Stack</h2>

                {selectedTools.size === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">📦</div>
                    <p className="text-slate-400 text-sm">
                      Click tools to add them to your stack
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Selected tools list */}
                    <div className="space-y-3 mb-6">
                      {selectedPlaybooks.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {p.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              ${p.price_usd}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTool(p.id);
                            }}
                            className="text-slate-400 hover:text-red-400 p-1"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Discount notice */}
                    {bundleDiscount > 0 && (
                      <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                        <p className="text-emerald-400 text-sm font-medium">
                          🎉 {bundleDiscount * 100}% bundle discount applied!
                        </p>
                      </div>
                    )}

                    {/* Bundle suggestion */}
                    {selectedTools.size < 2 && (
                      <div className="mb-4 p-3 bg-slate-700/30 rounded-lg">
                        <p className="text-slate-400 text-xs">
                          Add {2 - selectedTools.size} more tool
                          {2 - selectedTools.size > 1 ? "s" : ""} to get 10% off
                        </p>
                      </div>
                    )}

                    {/* Pricing summary */}
                    <div className="border-t border-slate-700 pt-4 mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Individual total</span>
                        <span className="text-slate-300">${totalPrice}</span>
                      </div>
                      {bundleDiscount > 0 && (
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-emerald-400">Bundle discount</span>
                          <span className="text-emerald-400">
                            -${(totalPrice - discountedPrice).toFixed(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-white">Total</span>
                        <span className="text-emerald-400">${discountedPrice.toFixed(0)}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-emerald-500/25">
                      Get Your Stack →
                    </button>

                    <p className="text-center text-xs text-slate-500 mt-3">
                      Secure checkout via Gumroad
                    </p>
                  </>
                )}
              </div>

              {/* Info box */}
              <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <h3 className="text-sm font-medium text-white mb-2">💡 Bundle & Save</h3>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• 2 tools = 10% off</li>
                  <li>• 3+ tools = 15% off</li>
                  <li>• Stack them for your workflow</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
