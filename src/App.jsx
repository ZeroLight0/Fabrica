import { Header, Hero } from "./components/layout";
import { ClientProfileForm } from "./components/client/ClientProfileForm";
import { ConsoleForm } from "./components/console/ConsoleForm";
import { MeasurementsForm } from "./components/measurements/MeasurementsForm";
import { SummaryPanel } from "./components/summary/SummaryPanel";
import { useFabricaOrder } from "./hooks/useFabricaOrder";

export default function App() {
  const order = useFabricaOrder();

  return (
    <main className="app-shell min-h-screen text-stone-900">
      <div className="ambient-grid" aria-hidden="true" />
      <Header order={order} />
      <Hero order={order} />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 md:px-8 lg:grid-cols-[1fr_380px] lg:px-10">
        <div className="space-y-8">
          <ClientProfileForm order={order} />
          <ConsoleForm order={order} />
          <MeasurementsForm order={order} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
          <SummaryPanel order={order} />
        </aside>
      </section>
    </main>
  );
}
