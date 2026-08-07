export function OptionGroup({ label, options, value, onChange, icon, columns }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-600">
        {icon}
        <span>{label}</span>
      </div>
      <div className={`grid gap-2 ${columns}`}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={`rounded-[18px] border px-4 py-3 text-left text-sm font-semibold transition ${
              value === option
                ? "border-[#1c3429] bg-[#1c3429] text-white shadow-[0_18px_40px_rgba(28,52,41,0.2)]"
                : "border-stone-200 bg-white/80 text-stone-700 hover:border-stone-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
