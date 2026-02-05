import MapPlaceholder from '../components/MapPlaceholder';
import StatCard from '../components/StatCard';

const maintenanceQueue = [
  { id: 'SC-112', issue: 'Battery below 15%', action: 'Dispatch swap' },
  { id: 'SC-332', issue: 'Brake sensor alert', action: 'Schedule repair' },
  { id: 'SC-778', issue: 'Idle > 6 hrs', action: 'Relocate scooter' }
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-4 lg:grid-cols-4">
        <StatCard title="Total rides" value="12,840" helper="+14% this month" />
        <StatCard title="Live scooters" value="318" helper="92 charging" />
        <StatCard title="Revenue" value="$86,240" helper="Includes promos" />
        <StatCard title="Active riders" value="4,982" helper="Peak: 1,240 online" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-6">
          <MapPlaceholder />
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold text-white">System health</h3>
            <div className="mt-4 grid gap-4 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span>Live WebSocket updates</span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">Healthy</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span>Payments pipeline</span>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-300">Monitor</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span>Map ingest latency</span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">2.1s</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-lg font-semibold text-white">Maintenance queue</h3>
          <p className="text-sm text-slate-400">Automated alerts from IoT telemetry.</p>
          <div className="mt-4 flex flex-col gap-3">
            {maintenanceQueue.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-sm font-semibold text-white">{item.id}</p>
                <p className="text-xs text-slate-400">{item.issue}</p>
                <button className="mt-3 rounded-full border border-brand-500 px-3 py-1 text-xs text-brand-500">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
