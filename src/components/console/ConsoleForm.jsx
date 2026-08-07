import { AlertCircle, Camera, FileText, Layers, ShieldCheck, Shirt, Truck, Upload, UserRound } from "lucide-react";
import { collectionModes, fabricTypes, genders, patterns, textures } from "../../data/constants";
import { OptionGroup, UploadButton } from "../ui";

export function ConsoleForm({ order }) {
  const {
    fabricPreview,
    stylePreview,
    fabricInputRef,
    styleInputRef,
    handleImageUpload,
    uploadError,
    statusMessage,
    inferredFabric,
    styleInsight,
    fabricLabel,
    setFabricLabel,
    styleLabel,
    setStyleLabel,
    gender,
    setGender,
    style,
    availableStyles,
    setSelectedStyle,
    fabricType,
    setFabricType,
    texture,
    setTexture,
    pattern,
    setPattern,
    collectionMode,
    setCollectionMode,
  } = order;

  return (
    <section id="fabrica-console" className="panel-surface rounded-[32px] p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Input</p>
          <h2 className="mt-3 [font-family:var(--font-display)] text-4xl text-stone-950">Enter order details</h2>
        </div>
        <div className="rounded-[22px] border border-stone-300/70 bg-white/70 px-4 py-3 text-sm text-stone-600">
          Fill the form. The app will calculate cloth and cost.
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <UploadButton
          label="Fabric image"
          detail={fabricPreview ? "Uploaded" : "JPG/PNG/WEBP up to 6 MB"}
          icon={<Upload size={18} />}
          onClick={() => fabricInputRef.current?.click()}
        />
        <UploadButton
          label="Style reference"
          detail={stylePreview ? "Uploaded" : "Optional"}
          icon={<Camera size={18} />}
          onClick={() => styleInputRef.current?.click()}
        />
      </div>

      <input
        ref={fabricInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleImageUpload("fabric", file);
          }
          event.target.value = "";
        }}
      />
      <input
        ref={styleInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleImageUpload("style", file);
          }
          event.target.value = "";
        }}
      />

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="field-shell block rounded-[20px] p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Fabric description</span>
          <input
            type="text"
            value={fabricLabel}
            onChange={(event) => setFabricLabel(event.target.value)}
            placeholder="e.g. Italian Wool Navy Houndstooth"
            className="mt-3 w-full border-0 bg-transparent text-base font-semibold text-stone-950 outline-none placeholder:font-normal placeholder:text-stone-400"
          />
        </label>
        <label className="field-shell block rounded-[20px] p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Style description</span>
          <input
            type="text"
            value={styleLabel}
            onChange={(event) => setStyleLabel(event.target.value)}
            placeholder="e.g. Double-Breasted Peak Lapel Cut"
            className="mt-3 w-full border-0 bg-transparent text-base font-semibold text-stone-950 outline-none placeholder:font-normal placeholder:text-stone-400"
          />
        </label>
      </div>

      <div className={`mt-5 rounded-[22px] border px-4 py-4 text-sm ${uploadError ? "border-rose-200 bg-rose-50 text-rose-700" : "border-stone-200 bg-stone-50/80 text-stone-600"}`}>
        <div className="flex items-start gap-3">
          {uploadError ? <AlertCircle size={18} className="mt-0.5 shrink-0" /> : <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#1c3429]" />}
          <div>
            <p>{uploadError || statusMessage}</p>
            {!uploadError && (inferredFabric || styleInsight) ? (
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-stone-500">
                {inferredFabric ? `Detected fabric: ${inferredFabric.type}` : "Awaiting fabric inference"}
                {styleInsight ? ` / Style cue: ${styleInsight.silhouette}` : " / Awaiting style cue"}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <OptionGroup label="Gender (Male/Female)" options={genders} value={gender} onChange={setGender} icon={<UserRound size={17} />} columns="grid-cols-2" />
        <OptionGroup label="Style (Design)" options={availableStyles.map((item) => item.name)} value={style.name} onChange={setSelectedStyle} icon={<FileText size={17} />} columns="grid-cols-1" />
        <OptionGroup label="Fabric (Cloth type)" options={fabricTypes} value={fabricType} onChange={setFabricType} icon={<Shirt size={17} />} columns="grid-cols-2" />
        <OptionGroup label="Texture" options={textures} value={texture} onChange={setTexture} icon={<Layers size={17} />} columns="grid-cols-2" />
        <OptionGroup label="Pattern" options={patterns} value={pattern} onChange={setPattern} icon={<Camera size={17} />} columns="grid-cols-2" />
        <OptionGroup label="Delivery (Pick/Send)" options={collectionModes} value={collectionMode} onChange={setCollectionMode} icon={<Truck size={17} />} columns="grid-cols-2" />
      </div>
    </section>
  );
}
