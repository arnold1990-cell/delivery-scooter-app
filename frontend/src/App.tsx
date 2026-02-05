import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import RiderDashboard from './pages/RiderDashboard';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import ProtectedRoute from './routes/ProtectedRoute';
import ViewerDashboard from './pages/ViewerDashboard';
import { getStoredRoles } from './utils/auth';

export default function App() {
  const roles = getStoredRoles();
  const defaultRoute = roles.includes('ADMIN')
    ? '/admin/dashboard'
    : roles.includes('RIDER')
      ? '/rider/dashboard'
      : '/viewer/dashboard';

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/rider" element={<Navigate to="/rider/dashboard" replace />} />
        <Route
          path="/rider/dashboard"
          element={
            <ProtectedRoute allowedRoles={['RIDER', 'ADMIN']}>
              <RiderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewer/dashboard"
          element={
            <ProtectedRoute>
              <ViewerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}
