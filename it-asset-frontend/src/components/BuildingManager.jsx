// src/components/BuildingManager.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

function BuildingManager() {
  const [buildings, setBuildings] = useState([]);
  const [buildingName, setBuildingName] = useState('');
  const [buildingVlan, setBuildingVlan] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State สำหรับ Edit
  const [editingItem, setEditingItem] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingVlan, setEditingVlan] = useState('');

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/master-data/buildings');
      setBuildings(response.data);
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูล Buildings ได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const handleAddBuilding = async (e) => {
    e.preventDefault();
    if (!buildingName.trim() || !buildingVlan.trim()) {
        alert('กรุณากรอกข้อมูลให้ครบทั้ง Name และ VLAN');
        return;
    }
    try {
      await api.post('/master-data/buildings', { name: buildingName, vlan: buildingVlan });
      setBuildingName('');
      setBuildingVlan('');
      fetchBuildings();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเพิ่ม Building: อาจมีข้อมูลนี้อยู่แล้ว');
    }
  };

  const handleDeleteBuilding = async (buildingId) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Building นี้?')) {
      try {
        await api.delete(`/master-data/buildings/${buildingId}`);
        fetchBuildings();
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ Building');
      }
    }
  };
  
  // ฟังก์ชันสำหรับ Edit
  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditingName(item.name);
    setEditingVlan(item.vlan);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleSave = async (itemId) => {
    try {
      await api.put(`/master-data/buildings/${itemId}`, { name: editingName, vlan: editingVlan });
      setEditingItem(null);
      fetchBuildings();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอัปเดต Building');
    }
  };

  return (
    <div>
      <form onSubmit={handleAddBuilding} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          placeholder="Enter building name"
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          value={buildingVlan}
          onChange={(e) => setBuildingVlan(e.target.value)}
          placeholder="Enter VLAN"
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add Building</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <table border="1" style={{ minWidth: '500px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>VLAN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buildings.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
               {editingItem === item.id ? (
                <>
                  <td><input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} /></td>
                  <td><input type="text" value={editingVlan} onChange={(e) => setEditingVlan(e.target.value)} /></td>
                  <td>
                    <button onClick={() => handleSave(item.id)} style={{backgroundColor: 'darkgreen'}}>Save</button>
                    <button onClick={handleCancel} style={{marginLeft: '5px'}}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.vlan}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} style={{backgroundColor: 'darkblue'}}>Edit</button>
                    <button onClick={() => handleDeleteBuilding(item.id)} style={{marginLeft: '5px', backgroundColor: 'darkred'}}>Delete</button>
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

export default BuildingManager;