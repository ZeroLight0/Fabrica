export function MetricCard({ label, value, icon, tone = "light" }) {
  return (
    <div
      className={`rounded-[20px] border p-4 shadow-[0_18px_45px_rgba(40,29,18,0.04)] print:!rounded-md print:!p-1 print:!shadow-none ${tone === "dark" ? "border-white/10 bg-white/5" : "border-stone-200 bg-white/85"}`}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.2em] print:!text-[7px] print:!normal-case print:!tracking-normal ${tone === "dark" ? "text-stone-300" : "text-stone-500"}`}
      >
        {label}
      </p>
      <div
        className={`mt-3 flex items-center gap-2 text-base font-semibold print:!mt-0 print:!gap-1 print:!text-[9px] ${tone === "dark" ? "text-white" : "text-stone-900"}`}
      >
        <span className="print:hidden">{icon}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}

export function Metric({ label, value, icon }) {
  return <MetricCard label={label} value={value} icon={icon} tone="light" />;
}
