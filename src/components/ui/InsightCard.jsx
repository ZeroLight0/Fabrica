export function InsightCard({ title, value, icon }) {
  return (
    <article className="rounded-[22px] border border-stone-200 bg-white/90 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
        {icon}
        {title}
      </div>
      <p className="mt-3 text-sm leading-6 text-stone-700">{value}</p>
    </article>
  );
}
