export default function MapPlaceholder() {
  return (
    <div className="flex h-72 flex-col justify-between rounded-2xl border border-slate-800 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-800/80 via-slate-900 to-slate-950 p-6">
      <div>
        <h3 className="text-lg font-semibold text-white">Live Map Preview</h3>
        <p className="mt-1 text-sm text-slate-400">
          Connect Google Maps or Mapbox to render scooters, heatmaps, and ride paths.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 text-xs text-slate-300">
        {['Nearby scooters', 'Hot zones', 'Live rides'].map((label) => (
          <div key={label} className="rounded-lg bg-slate-800/70 px-3 py-2 text-center">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
