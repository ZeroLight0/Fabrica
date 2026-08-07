import { ChevronRight } from "lucide-react";

export function UploadButton({ label, detail, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-between rounded-[24px] border border-stone-200 bg-white/75 px-5 py-5 text-left shadow-[0_20px_45px_rgba(40,29,18,0.05)] transition hover:-translate-y-0.5 hover:border-stone-400"
    >
      <span className="flex min-w-0 items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-700">{icon}</span>
        <span className="min-w-0">
          <span className="block truncate text-base font-semibold text-stone-900">{label}</span>
          <span className="mt-1 block text-sm text-stone-500">{detail}</span>
        </span>
      </span>
      <ChevronRight size={18} className="shrink-0 text-stone-400 transition group-hover:text-stone-900" />
    </button>
  );
}
