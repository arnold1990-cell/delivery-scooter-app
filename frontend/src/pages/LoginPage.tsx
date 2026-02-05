export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Secure access</p>
        <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <input
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100"
          placeholder="Email"
          type="email"
        />
        <input
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100"
          placeholder="Password"
          type="password"
        />
        <button className="rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white">Sign in</button>
        <p className="text-xs text-slate-400">
          Use your rider or admin credentials to access role-based dashboards.
        </p>
      </div>
    </div>
  );
}
