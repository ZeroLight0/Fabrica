export function SummaryRow({ label, value, strong = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 print:!gap-2 ${strong ? "text-base font-semibold text-stone-950 print:!text-[10px]" : "text-stone-600 print:!text-[9px]"}`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
