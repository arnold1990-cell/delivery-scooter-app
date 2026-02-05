import MapPlaceholder from '../components/MapPlaceholder';
import StatCard from '../components/StatCard';

const scooters = [
  { id: 'SC-204', battery: 92, status: 'Available', distance: '120m' },
  { id: 'SC-581', battery: 74, status: 'Charging', distance: '420m' },
  { id: 'SC-778', battery: 64, status: 'Available', distance: '650m' }
];

export default function RiderDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-4 lg:grid-cols-3">
        <StatCard title="Wallet Balance" value="$24.60" helper="Auto top-up enabled" />
        <StatCard title="Active Ride" value="None" helper="Scan QR to unlock a scooter" />
        <StatCard title="Safety Score" value="4.8 ★" helper="Ride smoothly for extra rewards" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <MapPlaceholder />
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-lg font-semibold text-white">Nearby scooters</h3>
          <p className="text-sm text-slate-400">Tap to reserve a scooter for 10 minutes.</p>
          <div className="mt-4 flex flex-col gap-3">
            {scooters.map((scooter) => (
              <div
                key={scooter.id}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{scooter.id}</p>
                  <p className="text-xs text-slate-400">
                    {scooter.status} • {scooter.distance} away
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-200">{scooter.battery}%</p>
                  <button className="mt-2 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
