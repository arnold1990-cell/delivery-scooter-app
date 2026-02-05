import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getStoredRoles, setAuthStorage } from '../utils/auth';

const normalizeRoles = (roles: unknown): string[] => {
  if (Array.isArray(roles)) {
    return roles.map((role) => String(role));
  }
  if (typeof roles === 'string') {
    return roles
      .split(',')
      .map((role) => role.trim())
      .filter(Boolean);
  }
  return [];
};

const getRegisterErrorMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as { response?: { status?: number } };
    if (axiosError.response?.status === 409) {
      return 'An account already exists with that email.';
    }
  }
  return 'Registration failed. Check your details or API connection.';
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('RIDER');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await api.post('/api/auth/register', {
        fullName,
        email,
        password,
        phoneNumber: phoneNumber.trim() || undefined,
        role
      });
      const payload = response.data as { token: string; roles?: string[] | string };
      const roles = normalizeRoles(payload.roles);

      setAuthStorage(payload.token, roles);
      const storedRoles = roles.length > 0 ? roles : getStoredRoles();

      if (storedRoles.includes('ADMIN')) {
        navigate('/admin/dashboard');
      } else if (storedRoles.includes('DRIVER')) {
        navigate('/driver/dashboard');
      } else if (storedRoles.includes('RIDER')) {
        navigate('/rider/dashboard');
      } else {
        navigate('/viewer/dashboard');
      }
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      setErrorMessage(getRegisterErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Create account</p>
        <h2 className="text-2xl font-semibold text-white">Start your ride</h2>
      </div>
      <form className="flex flex-col gap-3 text-sm" onSubmit={handleSubmit}>
        <input
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100"
          placeholder="Full name"
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
        <input
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100"
          placeholder="Phone number (optional)"
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <select
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option value="RIDER">Rider</option>
          <option value="DRIVER">Driver</option>
          <option value="ADMIN">Admin</option>
        </select>
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
          {status === 'loading' ? 'Creating account...' : 'Create account'}
        </button>
        {status === 'error' ? (
          <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
            {errorMessage}
          </p>
        ) : null}
        <p className="text-xs text-slate-400">
          Already have an account?{' '}
          <Link className="text-brand-300 hover:text-brand-200" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
