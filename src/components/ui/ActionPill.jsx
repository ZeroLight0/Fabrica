export function ActionPill({ icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/70 px-4 py-2 text-sm text-stone-700 shadow-[0_18px_45px_rgba(40,29,18,0.07)]">
      <span className="text-[#1c3429]">{icon}</span>
      {label}
    </div>
  );
}
