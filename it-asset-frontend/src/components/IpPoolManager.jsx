// src/components/IpPoolManager.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

function IpPoolManager() {
  const [ipPools, setIpPools] = useState([]);
  const [buildings, setBuildings] = useState([]);
  
  const [ipAddress, setIpAddress] = useState('');
  const [selectedBuildingId, setSelectedBuildingId] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State สำหรับ Edit
  const [editingItem, setEditingItem] = useState(null);
  const [editIpAddress, setEditIpAddress] = useState('');
  const [editBuildingId, setEditBuildingId] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ipRes, buildingRes] = await Promise.all([
        api.get('/ip-pools'),
        api.get('/master-data/buildings')
      ]);
      setIpPools(ipRes.data);
      setBuildings(buildingRes.data);
      if (buildingRes.data.length > 0 && !selectedBuildingId) {
        setSelectedBuildingId(buildingRes.data[0].id);
      }
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!ipAddress.trim() || !selectedBuildingId) {
      alert('กรุณากรอก IP Address และเลือก Building');
      return;
    }
    try {
      await api.post('/ip-pools', { ip_address: ipAddress, building_id: selectedBuildingId });
      setIpAddress('');
      fetchData();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเพิ่ม IP Address');
    }
  };

  const handleDeleteItem = async (item) => {
    if (item.is_used) {
        alert('ไม่สามารถลบ IP ที่กำลังใช้งานได้');
        return;
    }
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ IP นี้?')) {
      try {
        await api.delete(`/ip-pools/${item.id}`);
        fetchData();
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ IP');
      }
    }
  };
  
  // ฟังก์ชันสำหรับ Edit
  const handleEdit = (item) => {
      if (item.is_used) {
          alert('ไม่สามารถแก้ไข IP ที่กำลังใช้งานได้');
          return;
      }
      setEditingItem(item.id);
      setEditIpAddress(item.ip_address);
      setEditBuildingId(item.building_id);
  };
  
  const handleCancel = () => {
      setEditingItem(null);
  };
  
  const handleSave = async (itemId) => {
      try {
          await api.put(`/ip-pools/${itemId}`, { ip_address: editIpAddress, building_id: editBuildingId });
          setEditingItem(null);
          fetchData();
      } catch (err) {
          alert('เกิดข้อผิดพลาดในการอัปเดต IP');
      }
  };

  return (
    <div>
      <form onSubmit={handleAddItem} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          placeholder="Enter new IP address"
          style={{ marginRight: '10px' }}
        />
        <select
          value={selectedBuildingId}
          onChange={(e) => setSelectedBuildingId(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
          required
        >
          <option value="" disabled>-- Select Building --</option>
          {buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <button type="submit">Add IP</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <table border="1" style={{ minWidth: '600px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>IP Address</th>
            <th>Building</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ipPools.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {editingItem === item.id ? (
                  <>
                    <td><input type="text" value={editIpAddress} onChange={(e) => setEditIpAddress(e.target.value)} /></td>
                    <td>
                        <select value={editBuildingId} onChange={(e) => setEditBuildingId(e.target.value)}>
                            {buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </td>
                    <td>-</td>
                    <td>
                        <button onClick={() => handleSave(item.id)} style={{backgroundColor: 'darkgreen'}}>Save</button>
                        <button onClick={handleCancel} style={{marginLeft: '5px'}}>Cancel</button>
                    </td>
                  </>
              ) : (
                  <>
                    <td>{item.ip_address}</td>
                    <td>{item.Building?.name || 'N/A'}</td>
                    <td style={{ color: item.is_used ? 'orange' : 'lightgreen' }}>
                        {item.is_used ? 'Used' : 'Available'}
                    </td>
                    <td>
                        <button onClick={() => handleEdit(item)} style={{backgroundColor: 'darkblue', opacity: item.is_used ? 0.5 : 1}} disabled={item.is_used}>Edit</button>
                        <button onClick={() => handleDeleteItem(item)} style={{marginLeft: '5px', backgroundColor: 'darkred', opacity: item.is_used ? 0.5 : 1}} disabled={item.is_used}>Delete</button>
                    </td>
                  </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default IpPoolManager;