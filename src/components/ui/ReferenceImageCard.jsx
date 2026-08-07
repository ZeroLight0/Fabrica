export function ReferenceImageCard({ label, image, alt, placeholder }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-stone-200 bg-white/70">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
        {image ? <img src={image} alt={alt} className="h-full w-full object-cover" /> : placeholder}
      </div>
      <p className="border-t border-stone-200 bg-white/85 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{label}</p>
    </div>
  );
}
