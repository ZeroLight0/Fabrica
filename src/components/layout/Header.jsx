import { ShieldCheck } from "lucide-react";

export function Header({ order }) {
  const { summary, isAnalyzing, handleReliabilityBadgeClick } = order;

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-[rgba(244,239,231,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-10">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.5em] text-stone-500">
            Fabrica
          </div>
          <p className="mt-1 text-sm text-stone-600">Tailor helper</p>
        </div>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex"
        >
          <a href="#overview" className="transition hover:text-stone-950">
            Home
          </a>
          <a
            href="#fabrica-console"
            className="transition hover:text-stone-950"
          >
            Form
          </a>
          <a href="#measurements" className="transition hover:text-stone-950">
            Body Size
          </a>
          <a href="#summary" className="transition hover:text-stone-950">
            Print
          </a>
        </nav>
        <button
          type="button"
          onClick={handleReliabilityBadgeClick}
          className="flex items-center gap-3 rounded-full border border-stone-300/80 bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-600 transition hover:border-stone-500 hover:text-stone-900"
          title="Show score"
          aria-label="Show score"
        >
          <ShieldCheck size={16} />
          {isAnalyzing ? "Checking" : `${summary.confidence}% score`}
        </button>
      </div>
    </header>
  );
}
