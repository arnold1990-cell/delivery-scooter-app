import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuthStorage, getStoredToken, hasRole } from '../utils/auth';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getStoredToken();
  const isAdmin = hasRole('ADMIN');
  const isRider = hasRole('RIDER') || isAdmin;
  const navItems = [
    { label: 'Rider', path: '/rider/dashboard', isVisible: isRider },
    { label: 'Admin', path: '/admin/dashboard', isVisible: isAdmin },
    { label: 'Viewer', path: '/viewer/dashboard', isVisible: !!token && !isRider && !isAdmin },
    { label: 'Login', path: '/login', isVisible: !token },
    { label: 'Register', path: '/register', isVisible: !token }
  ].filter((item) => item.isVisible);

  const handleLogout = () => {
    clearAuthStorage();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Scootify</p>
            <h1 className="text-xl font-semibold">Live Fleet Command</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm">
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
            {token ? (
              <button
                className="rounded-full bg-rose-500/20 px-4 py-2 text-rose-100 transition hover:bg-rose-500/40"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : null}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">{children}</main>
    </div>
  );
}
