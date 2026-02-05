import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getStoredToken, hasRole } from '../utils/auth';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const token = getStoredToken();
  const isAdmin = hasRole('ADMIN');
  const isRider = hasRole('RIDER') || isAdmin;
  const navItems = [
    { label: 'Rider', path: '/', isVisible: isRider },
    { label: 'Admin', path: '/admin', isVisible: isAdmin },
    { label: 'Login', path: '/login', isVisible: !token }
  ].filter((item) => item.isVisible);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Scootify</p>
            <h1 className="text-xl font-semibold">Live Fleet Command</h1>
          </div>
          <nav className="flex gap-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-full px-4 py-2 transition ${
                  location.pathname === item.path
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">{children}</main>
    </div>
  );
}
