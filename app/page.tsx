import { AlertTriangle, BarChart3, CheckCircle2, Clock3, MapPin, Recycle, Trash2, Truck } from "lucide-react";

const kpiCards = [
  {
    title: "Total Bins",
    value: "128",
    trend: "+6 this week",
    icon: Trash2,
  },
  {
    title: "Collections Completed",
    value: "342",
    trend: "+12% vs last week",
    icon: CheckCircle2,
  },
  {
    title: "Average Fill Level",
    value: "64%",
    trend: "Stable",
    icon: BarChart3,
  },
  {
    title: "Critical Alerts",
    value: "9",
    trend: "Needs attention",
    icon: AlertTriangle,
  },
];

const zoneStatus = [
  { zone: "North Zone", fillLevel: "72%", pickupEta: "1h 10m", status: "Priority" },
  { zone: "Central Zone", fillLevel: "58%", pickupEta: "2h 05m", status: "On schedule" },
  { zone: "West Zone", fillLevel: "80%", pickupEta: "40m", status: "Priority" },
  { zone: "Industrial Zone", fillLevel: "46%", pickupEta: "3h 20m", status: "On schedule" },
];

const truckStatus = [
  { id: "Truck-01", route: "North - Central", load: "70%", lastUpdate: "5 min ago" },
  { id: "Truck-02", route: "West - Industrial", load: "55%", lastUpdate: "2 min ago" },
  { id: "Truck-03", route: "Central - East", load: "63%", lastUpdate: "8 min ago" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm font-medium text-emerald-300">Smart Waste Management System</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Operations Dashboard</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">
            Monitor bin fill levels, optimize pickup routes, and track fleet activity in one systematic control panel.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-300">{card.title}</p>
                  <Icon className="h-5 w-5 text-emerald-300" />
                </div>
                <p className="mt-3 text-3xl font-semibold">{card.value}</p>
                <p className="mt-1 text-xs text-slate-400">{card.trend}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold">Zone Health Overview</h2>
            <p className="mt-1 text-sm text-slate-400">Live status grouped by collection zones.</p>
            <div className="mt-5 space-y-3">
              {zoneStatus.map((zone) => (
                <div
                  key={zone.zone}
                  className="grid gap-2 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm sm:grid-cols-4 sm:items-center"
                >
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin className="h-4 w-4 text-emerald-300" />
                    {zone.zone}
                  </div>
                  <p>Fill Level: {zone.fillLevel}</p>
                  <p className="flex items-center gap-2 text-slate-300">
                    <Clock3 className="h-4 w-4" />
                    ETA: {zone.pickupEta}
                  </p>
                  <span
                    className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                      zone.status === "Priority"
                        ? "bg-amber-200/20 text-amber-300"
                        : "bg-emerald-200/20 text-emerald-300"
                    }`}
                  >
                    {zone.status}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold">Fleet Activity</h2>
            <p className="mt-1 text-sm text-slate-400">Current truck loads and route allocations.</p>
            <div className="mt-5 space-y-3">
              {truckStatus.map((truck) => (
                <div key={truck.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 font-medium">
                      <Truck className="h-4 w-4 text-emerald-300" />
                      {truck.id}
                    </p>
                    <span className="rounded-full bg-sky-200/20 px-2.5 py-1 text-xs text-sky-300">
                      Load {truck.load}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">Route: {truck.route}</p>
                  <p className="mt-1 text-xs text-slate-400">Updated {truck.lastUpdate}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <footer className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-300">
          <p className="flex items-center gap-2">
            <Recycle className="h-4 w-4 text-emerald-300" />
            Data refresh interval: 60 seconds
          </p>
          <p>Last synchronized: 10:45 AM</p>
        </footer>
      </div>
    </div>
  );
}
