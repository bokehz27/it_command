// src/App.jsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MasterDataPage from './pages/MasterDataPage';
import SideNav from './components/SideNav'; // Import SideNav
import './App.css';

// Layout หลักที่มี SideNav
function MainLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <SideNav />
      <main style={{ flexGrow: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}

// Component สำหรับจัดการ Route ที่ต้อง Login ก่อน
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // ถ้าเป็นหน้า Login ให้แสดงเฉพาะ Component Login
  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }

  // สำหรับหน้าอื่นๆ ให้แสดง Layout หลักที่มี SideNav
  return (
    <ProtectedRoute>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/master-data" element={<MasterDataPage />} />
          {/* เราจะเพิ่ม Route อื่นๆ ที่นี่ */}
        </Routes>
      </MainLayout>
    </ProtectedRoute>
  );
}

export default App;