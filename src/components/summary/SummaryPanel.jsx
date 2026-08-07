import { AlertCircle, CalendarDays, Check, CheckCheck, Mail, Phone, Printer, Ruler, UserRound } from "lucide-react";
import { atelierProfile, formatMoney, lowerBodyMeasurementKeys, measurementConfig, upperBodyMeasurementKeys, workflowSteps } from "../../data/constants";
import { formatDisplayDate } from "../../lib/format";
import { Metric, SummaryRow } from "../ui";

export function SummaryPanel({ order }) {
  const {
    validation,
    jobStatus,
    jobReference,
    createdAt,
    clientName,
    clientPhone,
    clientEmail,
    assignedTailor,
    collectionDate,
    collectionMode,
    selectedStyle,
    setSelectedStyle,
    gender,
    inferredFabric,
    fabricType,
    pattern,
    imageSignal,
    texture,
    selectedColor,
    safeMeasurements,
    summary,
    parsedAvailableYardage,
    recommendation,
    selectedRecommendation,
    viableAlternatives,
    fabricLabel,
    styleLabel,
    stylePreview,
    handlePrintSummary,
  } = order;

  const upperMeasurements = measurementConfig.filter((field) => upperBodyMeasurementKeys.includes(field.key));
  const lowerMeasurements = measurementConfig.filter((field) => lowerBodyMeasurementKeys.includes(field.key));

  return (
    <>
      <section id="summary" className="print-root panel-surface rounded-[32px] p-4 sm:p-6 md:p-7 print:!p-3">
        <div className="flex items-start justify-between gap-4 print:!items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500 print:!text-[8px] print:!tracking-normal">Job summary brief</p>
            <h2 className="mt-3 [font-family:var(--font-display)] text-3xl text-stone-950 print:!mt-1 print:!text-base">{atelierProfile.name}</h2>
            <p className="mt-1 text-xs leading-5 text-stone-500 print:!mt-0 print:!text-[8px] print:!leading-tight">
              {atelierProfile.address} · {atelierProfile.phone}
            </p>
          </div>
          <div
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] print:!px-2 print:!py-0.5 print:!text-[8px] ${jobStatus === "Confirmed" ? "bg-[#1c3429] text-white" : "bg-amber-100 text-amber-900"}`}
          >
            {jobStatus}
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-stone-200 print:hidden">
          <div className="h-full rounded-full bg-[linear-gradient(90deg,#1c3429,#b2874e)]" style={{ width: `${validation.score}%` }} />
        </div>

        <div className="mt-6 rounded-[24px] border border-stone-200 bg-white/85 p-4 print:!mt-2 print:!rounded-md print:!p-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 print:!text-[8px] print:!tracking-normal">Job &amp; client profile</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-stone-700 print:!mt-1 print:!grid-cols-4 print:!gap-1">
            <Metric label="Client name" value={clientName || "Not set"} icon={<UserRound size={16} />} />
            <Metric label="Job reference" value={jobReference} />
            <Metric label="Phone" value={clientPhone || "Not set"} icon={<Phone size={16} />} />
            <Metric label="Email" value={clientEmail || "Not set"} icon={<Mail size={16} />} />
            <Metric label="Created" value={formatDisplayDate(createdAt)} icon={<CalendarDays size={16} />} />
            <Metric label="Collection" value={formatDisplayDate(collectionDate)} icon={<CalendarDays size={16} />} />
            <Metric label="Assigned tailor" value={assignedTailor || "Not set"} icon={<UserRound size={16} />} />
            <Metric label="Collection mode" value={collectionMode === "Pickup" ? "Studio Pickup" : "Delivery"} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 print:hidden">
          {workflowSteps.map((item) => (
            <div key={item.step} className="rounded-[18px] border border-stone-200 bg-white/80 p-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1c3429]">Step {item.step}</p>
              <p className="mt-1 text-xs font-semibold text-stone-900">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] border border-stone-200 bg-white/85 p-4 print:!mt-2 print:!rounded-md print:!p-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 print:!text-[8px] print:!tracking-normal">Sewing sheet</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-stone-700 print:!mt-1 print:!grid-cols-3 print:!gap-1">
            <Metric label="Style" value={selectedStyle} />
            <Metric label="Gender" value={gender} />
            <Metric label="Fabric" value={inferredFabric?.type || fabricType} />
            <Metric label="Pattern" value={pattern} />
            <Metric label="Texture" value={imageSignal?.texture || texture} />
            <Metric label="Color" value={selectedColor.name} />
          </div>

          <div className="mt-4 rounded-[18px] border border-stone-200 bg-white p-3 print:!mt-1 print:!rounded-md print:!p-1.5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 print:!text-[8px] print:!tracking-normal">Fit-aware body measurements (inches)</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 print:!mt-1 print:!grid-cols-2 print:!gap-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 print:!text-[7px]">Upper body</p>
                <div className="mt-2 space-y-2 text-sm text-stone-700 print:!mt-0.5 print:!space-y-0.5">
                  {upperMeasurements.map((field) => (
                    <div key={field.key} className="flex items-center justify-between rounded-lg border border-stone-100 px-2 py-1 print:!rounded-none print:!border-0 print:!px-0 print:!py-0 print:!text-[8px]">
                      <span>{field.label}</span>
                      <span className="font-semibold">{safeMeasurements[field.key]}&quot;</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 print:!text-[7px]">Lower &amp; full body</p>
                <div className="mt-2 space-y-2 text-sm text-stone-700 print:!mt-0.5 print:!space-y-0.5">
                  {lowerMeasurements.map((field) => (
                    <div key={field.key} className="flex items-center justify-between rounded-lg border border-stone-100 px-2 py-1 print:!rounded-none print:!border-0 print:!px-0 print:!py-0 print:!text-[8px]">
                      <span>{field.label}</span>
                      <span className="font-semibold">{safeMeasurements[field.key]}&quot;</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[18px] border border-stone-200 bg-white p-3 text-sm text-stone-700 print:!mt-1 print:!rounded-md print:!p-1.5 print:!text-[9px]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 print:!text-[8px] print:!tracking-normal">Cut note</p>
            <p className="mt-2 print:!mt-0.5">
              Need cloth: {summary.yardage.toFixed(1)} yards. Available: {parsedAvailableYardage > 0 ? `${parsedAvailableYardage.toFixed(1)} yards` : "Not set"}. Completion: {summary.completionDays} days.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-stone-200 bg-white/80 p-4 print:hidden">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Order intelligence</p>
            <span className="rounded-full bg-[#1c3429] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{validation.score}% ready</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-stone-700">
            <Metric label="Req. yardage" value={`${summary.yardage.toFixed(1)} yds`} icon={<Ruler size={16} />} />
            <Metric label="Available" value={parsedAvailableYardage > 0 ? `${parsedAvailableYardage.toFixed(1)} yds` : "Not set"} />
            <Metric label="Completion" value={`${summary.completionDays} days`} icon={<CalendarDays size={16} />} />
            <Metric label="Texture" value={imageSignal?.texture || texture} />
          </div>
          <div className="mt-3">
            <Metric label="Detected fabric" value={inferredFabric?.type || fabricType} />
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-stone-200 bg-white/80 p-4 print:!mt-2 print:!rounded-md print:!p-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 print:!text-[8px] print:!tracking-normal">Recommendation</p>
          <p className="mt-3 text-sm leading-6 text-stone-700 print:!mt-1 print:!text-[9px] print:!leading-snug">{recommendation}</p>
        </div>

        <div
          className={`mt-6 rounded-[24px] border p-4 print:!mt-2 print:!rounded-md print:!p-2 ${selectedRecommendation?.worksWithAvailableFabric ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}
        >
          <div className="flex items-start gap-3 print:!gap-2">
            {selectedRecommendation?.worksWithAvailableFabric ? <CheckCheck size={18} className="mt-0.5 shrink-0 text-emerald-700 print:hidden" /> : <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-700 print:hidden" />}
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] print:!text-[8px] print:!tracking-normal ${selectedRecommendation?.worksWithAvailableFabric ? "text-emerald-800" : "text-amber-800"}`}>
                Cloth check
              </p>
              <p className={`mt-2 text-sm leading-6 print:!mt-0.5 print:!text-[9px] print:!leading-snug ${selectedRecommendation?.worksWithAvailableFabric ? "text-emerald-900" : "text-amber-900"}`}>
                {selectedRecommendation?.worksWithAvailableFabric
                  ? `${selectedStyle} can be cut from ${parsedAvailableYardage.toFixed(1)} yards. Balance: ${selectedRecommendation.availableGap?.toFixed(1) || "0.0"} yards.`
                  : `${selectedStyle} needs ${summary.yardage.toFixed(1)} yards. Choose another style below.`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-stone-200 bg-white/80 p-4 print:!mt-2 print:!rounded-md print:!p-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 print:!text-[8px] print:!tracking-normal">Uploaded references</p>
          <div className="mt-3 space-y-3 print:!mt-1 print:!grid print:!grid-cols-2 print:!gap-2 print:!space-y-0">
            <div className="rounded-[18px] border border-dashed border-stone-300 bg-white p-3 text-center print:!rounded-md print:!p-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500 print:!text-[7px] print:!tracking-normal">Customer fabric upload</p>
              <p className="mt-1 text-sm font-semibold text-stone-900 print:!mt-0.5 print:!text-[8px]">
                {fabricLabel || (inferredFabric ? `${inferredFabric.type} fabric` : "Not provided")}
                {parsedAvailableYardage > 0 ? ` (${parsedAvailableYardage.toFixed(2)} Yds)` : ""}
              </p>
            </div>
            <div className="rounded-[18px] border border-dashed border-stone-300 bg-white p-3 text-center print:!rounded-md print:!p-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500 print:!text-[7px] print:!tracking-normal">Style preference upload</p>
              <p className="mt-1 text-sm font-semibold text-stone-900 print:!mt-0.5 print:!text-[8px]">
                {styleLabel || (stylePreview ? "Style reference uploaded" : "Not provided")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-stone-200 bg-white/80 p-4 print:hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Other styles that fit your cloth</p>
          <div className="mt-4 space-y-3">
            {viableAlternatives.length > 0 ? (
              viableAlternatives.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedStyle(item.name)}
                  className="flex w-full items-center justify-between gap-4 rounded-[18px] border border-stone-200 bg-white px-4 py-3 text-left transition hover:border-stone-400"
                >
                  <div>
                    <p className="font-semibold text-stone-900">{item.name}</p>
                    <p className="mt-1 text-sm text-stone-600">{item.summary.yardage.toFixed(1)} yards needed · {item.availableGap?.toFixed(1)} yards spare</p>
                  </div>
                  <span className="rounded-full bg-stone-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-700">Select</span>
                </button>
              ))
            ) : (
              <p className="text-sm leading-6 text-stone-600">No other style fits this cloth amount. Add more cloth or change gender/style.</p>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-3 border-t border-stone-200 pt-5 text-sm print:!mt-2 print:!space-y-1 print:!pt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 print:!text-[8px] print:!tracking-normal">Price summary</p>
          <SummaryRow label="Material estimate" value={formatMoney.format(summary.materialEstimate)} />
          <SummaryRow label="Tailoring labor" value={formatMoney.format(summary.labor)} />
          <SummaryRow label="Pressing and finishing" value="Included" />
          <SummaryRow label="Collection / delivery" value="Included" />
          <SummaryRow label="Total amount" value={formatMoney.format(summary.total)} strong />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 border-t border-stone-200 pt-6 text-xs text-stone-500 print:!mt-3 print:!gap-4 print:!pt-2">
          <div>
            <div className="h-10 border-b border-stone-400 print:!h-5" />
            <p className="mt-2 uppercase tracking-[0.14em] print:!mt-0.5 print:!text-[7px] print:!tracking-normal">Client signature &amp; approval</p>
          </div>
          <div>
            <div className="h-10 border-b border-stone-400 print:!h-5" />
            <p className="mt-2 uppercase tracking-[0.14em] print:!mt-0.5 print:!text-[7px] print:!tracking-normal">Master tailor / studio rep</p>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-stone-400 print:!mt-2 print:!text-[7px]">
          {atelierProfile.footerNote} · {atelierProfile.footerUrl}
        </p>

        <button
          type="button"
          onClick={handlePrintSummary}
          className="no-print mt-6 flex w-full items-center justify-center gap-2 rounded-[20px] bg-[#1c3429] px-4 py-4 text-sm font-semibold text-white transition hover:bg-[#11241d]"
        >
          <Printer size={17} />
          Print job brief
        </button>
      </section>

      <section className="hidden">
        <div className="flex items-center gap-3">
          <Check size={18} className="text-[#1c3429]" />
          <h3 className="text-lg font-semibold text-stone-950">Production review</h3>
        </div>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-stone-700">
          {validation.issues.slice(0, 3).map((issue) => (
            <li key={issue} className="rounded-[18px] border border-stone-200 bg-white/75 px-4 py-3">{issue}</li>
          ))}
          {validation.issues.length === 0 ? (
            <li className="rounded-[18px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
              All primary inputs are within range. The brief is ready for client-facing review.
            </li>
          ) : null}
        </ul>
      </section>
    </>
  );
}
