import StatCard from '../components/StatCard';

const assignments = [
  { id: 'RK-201', route: 'Downtown loop', eta: '12 min', status: 'In progress' },
  { id: 'RK-207', route: 'Warehouse swap', eta: '25 min', status: 'Queued' },
  { id: 'RK-214', route: 'Battery pickup', eta: '18 min', status: 'Ready' }
];

export default function DriverDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-4 lg:grid-cols-3">
        <StatCard title="Assignments" value="3" helper="2 queued, 1 active" />
        <StatCard title="Scooters serviced" value="14" helper="Today" />
        <StatCard title="On-time rate" value="96%" helper="Last 7 days" />
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold text-white">Current tasks</h3>
        <p className="text-sm text-slate-400">Manage swap and relocation assignments.</p>
        <div className="mt-4 grid gap-3">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4"
            >
              <div>
                <p className="text-sm font-semibold text-white">{assignment.id}</p>
                <p className="text-xs text-slate-400">{assignment.route}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-300">{assignment.status}</p>
                <p className="text-xs text-slate-500">{assignment.eta} ETA</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
