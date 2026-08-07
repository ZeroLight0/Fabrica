import { Ruler } from "lucide-react";
import { measurementConfig } from "../../data/constants";

export function MeasurementsForm({ order }) {
  const {
    measurements,
    updateMeasurement,
    fabricPrice,
    parsedFabricPrice,
    setFabricPrice,
    availableYardage,
    parsedAvailableYardage,
    setAvailableYardage,
  } = order;

  return (
    <section id="measurements" className="panel-surface rounded-[32px] p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Fit inputs</p>
          <h2 className="mt-3 [font-family:var(--font-display)] text-4xl text-stone-950">Body measurements</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/75 px-4 py-2 text-sm text-stone-600">
          <Ruler size={16} />
          Inches
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {measurementConfig.map((field) => {
          const rawValue = measurements[field.key];
          const parsed = Number.parseFloat(rawValue);
          const invalid = rawValue === "" || !Number.isFinite(parsed) || parsed < field.min || parsed > field.max;

          return (
            <label key={field.key} className={`field-shell rounded-[24px] p-4 ${invalid ? "border-rose-200" : "border-white/60"}`}>
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">{field.label}</span>
              <input
                type="text"
                inputMode="decimal"
                value={rawValue}
                aria-invalid={invalid}
                aria-describedby={`${field.key}-hint`}
                onChange={(event) => updateMeasurement(field.key, event.target.value)}
                className="mt-3 w-full border-0 bg-transparent text-3xl font-semibold tracking-tight text-stone-950 outline-none"
              />
              <span id={`${field.key}-hint`} className="mt-3 block text-sm text-stone-500">
                Range {field.min} to {field.max}
              </span>
            </label>
          );
        })}
      </div>

      <label className="field-shell mt-4 block rounded-[24px] p-4">
        <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Price per yard (Naira)</span>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xl font-semibold text-stone-500">NGN</span>
          <input
            type="text"
            inputMode="decimal"
            value={fabricPrice}
            aria-invalid={parsedFabricPrice === 0}
            onChange={(event) => setFabricPrice(event.target.value)}
            className="w-full border-0 bg-transparent text-3xl font-semibold tracking-tight text-stone-950 outline-none"
          />
        </div>
      </label>

      <label className="field-shell mt-4 block rounded-[24px] p-4">
        <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Cloth you have (yards)</span>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xl font-semibold text-stone-500">YDS</span>
          <input
            type="text"
            inputMode="decimal"
            value={availableYardage}
            aria-invalid={parsedAvailableYardage === 0}
            onChange={(event) => setAvailableYardage(event.target.value)}
            className="w-full border-0 bg-transparent text-3xl font-semibold tracking-tight text-stone-950 outline-none"
          />
        </div>
        <span className="mt-3 block text-sm text-stone-500">The app checks if cloth is enough for the selected style.</span>
      </label>
    </section>
  );
}
