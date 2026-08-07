import { CalendarDays, Mail, Phone, UserRound } from "lucide-react";

export function ClientProfileForm({ order }) {
  const {
    clientName,
    setClientName,
    clientPhone,
    setClientPhone,
    clientEmail,
    setClientEmail,
    assignedTailor,
    setAssignedTailor,
    collectionDate,
    setCollectionDate,
    jobReference,
  } = order;

  return (
    <section className="panel-surface rounded-[32px] p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Job &amp; client</p>
          <h2 className="mt-3 [font-family:var(--font-display)] text-4xl text-stone-950">Job and client profile</h2>
        </div>
        <div className="rounded-[22px] border border-stone-300/70 bg-white/70 px-4 py-3 text-sm text-stone-600">
          Job reference <span className="font-semibold text-stone-900">{jobReference}</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="field-shell block rounded-[24px] p-4">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            <UserRound size={14} /> Client name
          </span>
          <input
            type="text"
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            placeholder="e.g. Apex E."
            className="mt-3 w-full border-0 bg-transparent text-xl font-semibold tracking-tight text-stone-950 outline-none placeholder:font-normal placeholder:text-stone-400"
          />
        </label>

        <label className="field-shell block rounded-[24px] p-4">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            <UserRound size={14} /> Assigned tailor
          </span>
          <input
            type="text"
            value={assignedTailor}
            onChange={(event) => setAssignedTailor(event.target.value)}
            placeholder="e.g. Master Marco"
            className="mt-3 w-full border-0 bg-transparent text-xl font-semibold tracking-tight text-stone-950 outline-none placeholder:font-normal placeholder:text-stone-400"
          />
        </label>

        <label className="field-shell block rounded-[24px] p-4">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            <Phone size={14} /> Phone
          </span>
          <input
            type="tel"
            value={clientPhone}
            onChange={(event) => setClientPhone(event.target.value)}
            placeholder="e.g. +243 705 019 2834"
            className="mt-3 w-full border-0 bg-transparent text-xl font-semibold tracking-tight text-stone-950 outline-none placeholder:font-normal placeholder:text-stone-400"
          />
        </label>

        <label className="field-shell block rounded-[24px] p-4">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            <Mail size={14} /> Email
          </span>
          <input
            type="email"
            value={clientEmail}
            onChange={(event) => setClientEmail(event.target.value)}
            placeholder="e.g. client@example.com"
            className="mt-3 w-full border-0 bg-transparent text-xl font-semibold tracking-tight text-stone-950 outline-none placeholder:font-normal placeholder:text-stone-400"
          />
        </label>

        <label className="field-shell block rounded-[24px] p-4 md:col-span-2">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            <CalendarDays size={14} /> Collection date
          </span>
          <input
            type="date"
            value={collectionDate}
            onChange={(event) => setCollectionDate(event.target.value)}
            className="mt-3 w-full border-0 bg-transparent text-xl font-semibold tracking-tight text-stone-950 outline-none"
          />
        </label>
      </div>
    </section>
  );
}
