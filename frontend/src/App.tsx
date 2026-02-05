import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import RiderDashboard from './pages/RiderDashboard';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import RequireRole from './components/RequireRole';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <RequireRole allowedRoles={['RIDER', 'ADMIN']}>
              <RiderDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireRole allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </RequireRole>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}
