// src/components/ModelManager.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

function ModelManager() {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  
  const [name, setName] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State สำหรับ Edit
  const [editingItem, setEditingItem] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingBrandId, setEditingBrandId] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [modelsRes, brandsRes] = await Promise.all([
        api.get('/master-data/models'),
        api.get('/master-data/brands') 
      ]);
      
      setModels(modelsRes.data);
      setBrands(brandsRes.data);

      if (brandsRes.data.length > 0 && !selectedBrandId) {
        setSelectedBrandId(brandsRes.data[0].id);
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
    if (!name.trim() || !selectedBrandId) {
        alert('กรุณากรอกชื่อและเลือก Brand');
        return;
    }
    try {
      await api.post('/master-data/models', { name, brand_id: selectedBrandId });
      setName('');
      fetchData();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเพิ่ม Model');
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Model นี้?')) {
      try {
        await api.delete(`/master-data/models/${id}`);
        fetchData();
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ Model');
      }
    }
  };

  // ฟังก์ชันสำหรับ Edit
  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditingName(item.name);
    setEditingBrandId(item.brand_id);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleSave = async (itemId) => {
    try {
      await api.put(`/master-data/models/${itemId}`, { name: editingName, brand_id: editingBrandId });
      setEditingItem(null);
      fetchData();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอัปเดต Model');
    }
  };

  return (
    <div>
      <form onSubmit={handleAddItem} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new model name"
          style={{ marginRight: '10px' }}
        />
        <select 
            value={selectedBrandId} 
            onChange={(e) => setSelectedBrandId(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
            required
        >
            <option value="" disabled>-- Select Brand --</option>
            {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
        </select>
        <button type="submit">Add Model</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <table border="1" style={{ minWidth: '500px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Parent Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
               {editingItem === item.id ? (
                <>
                  <td><input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} /></td>
                  <td>
                    <select value={editingBrandId} onChange={(e) => setEditingBrandId(e.target.value)}>
                      {brands.map(b => (<option key={b.id} value={b.id}>{b.name}</option>))}
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSave(item.id)} style={{backgroundColor: 'darkgreen'}}>Save</button>
                    <button onClick={handleCancel} style={{marginLeft: '5px'}}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{brands.find(b => b.id === item.brand_id)?.name || 'N/A'}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} style={{backgroundColor: 'darkblue'}}>Edit</button>
                    <button onClick={() => handleDeleteItem(item.id)} style={{marginLeft: '5px', backgroundColor: 'darkred'}}>Delete</button>
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

export default ModelManager;