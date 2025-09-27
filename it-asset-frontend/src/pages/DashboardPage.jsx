// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

function DashboardPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await api.get('/assets');
        setAssets(response.data);
      } catch (err) {
        setError('ไม่สามารถดึงข้อมูลได้ หรือ Token อาจหมดอายุ');
        console.error('Fetch assets failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>IT Asset Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <hr />
      <h2>Assets List</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Serial Number</th>
            <th>Category</th>
            <th>Status</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.asset_name}</td>
              <td>{asset.serial_number}</td>
              <td>{asset.Category?.name}</td>
              <td>{asset.status?.name}</td>
              <td>{asset.user?.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardPage;