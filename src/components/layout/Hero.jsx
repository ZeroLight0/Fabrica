import { ArrowRight, BadgeCheck, Camera, Clock3, ShieldCheck, Sparkles, SwatchBook, WandSparkles } from "lucide-react";
import { patternClasses, statHighlights, conversionStats } from "../../data/constants";
import { ActionPill, InsightCard, PreviewBadge, ReferenceImageCard } from "../ui";

export function Hero({ order }) {
  const {
    activeStyle,
    selectedColor,
    fabricType,
    summary,
    pattern,
    fabricPreview,
    stylePreview,
    imageSignal,
    texture,
    recommendation,
    selectedRecommendation,
    selectedStyle,
    inferredFabric,
    styleInsight,
  } = order;

  return (
    <section id="overview" className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-8 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:pt-12">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(28,52,41,0.15)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1c3429] shadow-[0_20px_50px_rgba(40,29,18,0.08)]">
          <WandSparkles size={14} />
          Tailor app
        </div>
        <h1 className="mt-6 max-w-3xl [font-family:var(--font-display)] text-5xl leading-none text-stone-950 md:text-7xl">
          Cloth and style calculator
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-stone-600 md:text-lg">
          Add a cloth photo, enter body size, and get a quick cost.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#fabrica-console"
            className="inline-flex items-center gap-2 rounded-full bg-[#1c3429] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#11241d]"
          >
            Start
            <ArrowRight size={16} />
          </a>
          <a
            href="#summary"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/75 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-500"
          >
            View summary
          </a>
        </div>

        <p className="mt-4 text-sm leading-7 text-stone-500">Built for tailors and seamstresses in Nigeria.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ActionPill icon={<ShieldCheck size={16} />} label="Easy form" />
          <ActionPill icon={<SwatchBook size={16} />} label="Cloth view" />
          <ActionPill icon={<Clock3 size={16} />} label="Fast print" />
        </div>

        <div className="hidden">
          {statHighlights.map((stat) => (
            <article key={stat.label} className="panel-surface rounded-[28px] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">{stat.label}</p>
              <p className="mt-3 text-sm leading-6 text-stone-700">{stat.value}</p>
            </article>
          ))}
        </div>

        <div className="hidden">
          {conversionStats.map((item) => (
            <div key={item.label} className="rounded-[24px] border border-white/55 bg-white/55 px-5 py-4 shadow-[0_18px_45px_rgba(40,29,18,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-stone-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="hero-stage rounded-[32px] p-4 sm:p-6">
        <div className="rounded-[28px] border border-white/60 bg-[rgba(255,252,247,0.95)] p-4 text-stone-900 shadow-[0_28px_90px_rgba(17,12,9,0.14)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Reference</p>
              <h2 className="mt-2 [font-family:var(--font-display)] text-3xl">Fabric &amp; style reference</h2>
            </div>
            <div className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700">
              {selectedColor.name} / {fabricType} / {summary.yardage.toFixed(1)} yards
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ReferenceImageCard
              label="Fabric upload"
              image={fabricPreview}
              alt="Uploaded fabric"
              placeholder={
                <div
                  className={`fabric-grain ${patternClasses[pattern]} flex h-full w-full items-center justify-center p-4 text-center text-xs font-medium text-stone-700`}
                  style={{ backgroundColor: selectedColor.value }}
                >
                  No fabric image uploaded yet.
                </div>
              }
            />
            <ReferenceImageCard
              label="Style upload"
              image={stylePreview}
              alt="Uploaded style reference"
              placeholder={
                <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs font-medium text-stone-500">
                  No style reference uploaded yet.
                </div>
              }
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <PreviewBadge label="Style" value={activeStyle.name} />
            <PreviewBadge label="Cloth needed" value={`${summary.yardage.toFixed(1)} yards`} />
            <PreviewBadge label="Texture" value={imageSignal?.texture || texture} />
            <PreviewBadge label="Ready in" value={`${summary.completionDays} days`} />
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <InsightCard title="Shape note" value={activeStyle.silhouette} icon={<BadgeCheck size={17} />} />
            <InsightCard title="Advice" value={recommendation} icon={<Sparkles size={17} />} />
          </div>

          <div className="mt-5 rounded-[22px] border border-stone-200 bg-white/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Fabric check</p>
                <p className="mt-2 text-sm text-stone-700">
                  {selectedRecommendation?.worksWithAvailableFabric
                    ? `${selectedStyle} fits the cloth you have.`
                    : `${selectedStyle} needs more cloth. Check options below.`}
                </p>
              </div>
              <div className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${selectedRecommendation?.worksWithAvailableFabric ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}>
                {selectedRecommendation?.worksWithAvailableFabric ? "Can cut" : "Not enough cloth"}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <InsightCard
              title="Detected fabric"
              value={inferredFabric ? `${inferredFabric.type} detected. Other likely: ${inferredFabric.alternatives.join(", ")}.` : "Upload a fabric image to detect cloth type."}
              icon={<SwatchBook size={17} />}
            />
            <InsightCard
              title="Style cue"
              value={styleInsight ? `Shape: ${styleInsight.silhouette}. Suggested styles: ${styleInsight.preferredStyles.join(", ")}.` : "Upload a style image for better style suggestion."}
              icon={<Camera size={17} />}
            />
          </div>
        </div>
      </section>
    </section>
  );
}
