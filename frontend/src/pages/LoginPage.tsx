import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, roles } = response.data as { token: string; roles: string[] };
      localStorage.setItem('token', token);
      localStorage.setItem('roles', JSON.stringify(roles));

      if (roles?.includes('ADMIN')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Login failed. Check your credentials or API connection.');
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Secure access</p>
        <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
      </div>
      <form className="flex flex-col gap-3 text-sm" onSubmit={handleSubmit}>
        <input
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className="rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          type="submit"
        >
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </button>
        {status === 'error' ? (
          <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
            {errorMessage}
          </p>
        ) : null}
        <p className="text-xs text-slate-400">
          Use your rider or admin credentials to access role-based dashboards.
        </p>
      </form>
    </div>
  );
}
