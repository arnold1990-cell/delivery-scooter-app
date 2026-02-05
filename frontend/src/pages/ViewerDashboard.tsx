export default function ViewerDashboard() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
      <h2 className="text-2xl font-semibold text-white">Viewer Dashboard</h2>
      <p className="mt-2 text-sm text-slate-300">
        Your account is authenticated, but no role-specific dashboard is assigned yet.
      </p>
    </section>
  );
}
