export function PreviewBadge({ label, value }) {
  return (
    <div className="rounded-full border border-stone-200 bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.18em] text-stone-700">
      <span className="text-stone-500">{label}</span>
      <span className="ml-2 font-semibold text-stone-900">{value}</span>
    </div>
  );
}
