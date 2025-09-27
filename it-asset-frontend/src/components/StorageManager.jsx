// src/components/StorageManager.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

function StorageManager() {
  const [storages, setStorages] = useState([]);
  const [storageType, setStorageType] = useState('');
  const [storageSize, setStorageSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State สำหรับการ Edit
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState('');
  const [editingSize, setEditingSize] = useState('');

  const fetchStorages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/master-data/storages');
      setStorages(response.data);
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูล Storages ได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  const handleAddStorage = async (e) => {
    e.preventDefault();
    if (!storageType.trim() || !storageSize.trim()) {
      alert('กรุณากรอกข้อมูลให้ครบทั้ง Type และ Size');
      return;
    }
    try {
      await api.post('/master-data/storages', { type: storageType, size: storageSize });
      setStorageType('');
      setStorageSize('');
      fetchStorages();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเพิ่ม Storage: อาจมีข้อมูลนี้อยู่แล้ว');
    }
  };

  const handleDeleteStorage = async (storageId) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Storage นี้?')) {
      try {
        await api.delete(`/master-data/storages/${storageId}`);
        fetchStorages();
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ Storage');
      }
    }
  };

  // ฟังก์ชันสำหรับ Edit
  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditingType(item.type);
    setEditingSize(item.size);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleSave = async (itemId) => {
    try {
      await api.put(`/master-data/storages/${itemId}`, { type: editingType, size: editingSize });
      setEditingItem(null);
      fetchStorages();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอัปเดต Storage');
    }
  };

  return (
    <div>
      <form onSubmit={handleAddStorage} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={storageType}
          onChange={(e) => setStorageType(e.target.value)}
          placeholder="Enter storage type (e.g., SSD)"
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          value={storageSize}
          onChange={(e) => setStorageSize(e.target.value)}
          placeholder="Enter storage size (e.g., 512GB)"
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add Storage</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <table border="1" style={{ minWidth: '500px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storages.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {editingItem === item.id ? (
                <>
                  <td><input type="text" value={editingType} onChange={(e) => setEditingType(e.target.value)} /></td>
                  <td><input type="text" value={editingSize} onChange={(e) => setEditingSize(e.target.value)} /></td>
                  <td>
                    <button onClick={() => handleSave(item.id)} style={{backgroundColor: 'darkgreen'}}>Save</button>
                    <button onClick={handleCancel} style={{marginLeft: '5px'}}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.type}</td>
                  <td>{item.size}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} style={{backgroundColor: 'darkblue'}}>Edit</button>
                    <button onClick={() => handleDeleteStorage(item.id)} style={{marginLeft: '5px', backgroundColor: 'darkred'}}>Delete</button>
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

export default StorageManager;