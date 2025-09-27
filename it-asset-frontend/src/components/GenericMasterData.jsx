// src/components/GenericMasterData.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

// รับ prop 'dataKey' เพิ่มเข้ามา โดยมีค่า default เป็น 'name'
function GenericMasterData({ title, apiEndpoint, dataKey = 'name' }) {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editingItem, setEditingItem] = useState(null);
  const [editingText, setEditingText] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(apiEndpoint);
      setItems(response.data);
    } catch (err) {
      setError(`ไม่สามารถดึงข้อมูล ${title} ได้`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiEndpoint]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;
    try {
      // ใช้ [dataKey] เพื่อสร้าง object แบบ dynamic e.g. { size: '16GB' }
      const payload = { [dataKey]: itemName };
      await api.post(apiEndpoint, payload);
      setItemName('');
      fetchData();
    } catch (err) {
      alert(`เกิดข้อผิดพลาดในการเพิ่ม ${title}`);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ ${title} นี้?`)) {
      try {
        await api.delete(`${apiEndpoint}/${itemId}`);
        fetchData();
      } catch (err) {
        alert(`เกิดข้อผิดพลาดในการลบ ${title}`);
      }
    }
  };
  
  const handleEdit = (item) => {
    setEditingItem(item.id);
    // อ่านค่าจาก key ที่ถูกต้อง
    setEditingText(item[dataKey]);
  };
  
  const handleSave = async (itemId) => {
    try {
      // ส่งข้อมูลด้วย key ที่ถูกต้อง
      const payload = { [dataKey]: editingText };
      await api.put(`${apiEndpoint}/${itemId}`, payload);
      setEditingItem(null);
      setEditingText('');
      fetchData();
    } catch (err) {
      alert(`เกิดข้อผิดพลาดในการอัปเดต ${title}`);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditingText('');
  };

  return (
    <div>
      <form onSubmit={handleAddItem} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder={`Enter new ${title.slice(0, -1)}`}
        />
        <button type="submit">Add {title.slice(0, -1)}</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <table border="1" style={{ minWidth: '500px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            {/* ทำให้ Header เป็นชื่อที่ถูกต้อง */}
            <th style={{textTransform: 'capitalize'}}>{dataKey}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {editingItem === item.id ? (
                <>
                  <td>
                    <input 
                      type="text" 
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(item.id)} style={{backgroundColor: 'darkgreen'}}>Save</button>
                    <button onClick={handleCancel} style={{marginLeft: '5px'}}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  {/* แสดงค่าจาก key ที่ถูกต้อง */}
                  <td>{item[dataKey]}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} style={{backgroundColor: 'darkblue'}}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} style={{marginLeft: '5px', backgroundColor: 'darkred'}}>
                      Delete
                    </button>
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

export default GenericMasterData;