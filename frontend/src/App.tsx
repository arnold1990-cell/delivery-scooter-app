import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import DriverDashboard from './pages/DriverDashboard';
import RiderDashboard from './pages/RiderDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import ProtectedRoute from './routes/ProtectedRoute';
import ViewerDashboard from './pages/ViewerDashboard';
import { getStoredRoles } from './utils/auth';

export default function App() {
  const roles = getStoredRoles();
  const defaultRoute = roles.includes('ADMIN')
    ? '/admin/dashboard'
    : roles.includes('DRIVER')
      ? '/driver/dashboard'
    : roles.includes('RIDER')
      ? '/rider/dashboard'
      : '/viewer/dashboard';

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/driver" element={<Navigate to="/driver/dashboard" replace />} />
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
          path="/driver/dashboard"
          element={
            <ProtectedRoute allowedRoles={['DRIVER', 'ADMIN']}>
              <DriverDashboard />
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
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Layout>
  );
}
