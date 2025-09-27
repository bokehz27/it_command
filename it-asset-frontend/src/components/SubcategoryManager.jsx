// src/components/SubcategoryManager.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

function SubcategoryManager() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [name, setName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State สำหรับ Edit
  const [editingItem, setEditingItem] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subcategoriesRes, categoriesRes] = await Promise.all([
        api.get('/master-data/subcategories'),
        api.get('/master-data/categories') 
      ]);
      
      setSubcategories(subcategoriesRes.data);
      setCategories(categoriesRes.data);

      if (categoriesRes.data.length > 0 && !selectedCategoryId) {
        setSelectedCategoryId(categoriesRes.data[0].id);
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
    if (!name.trim() || !selectedCategoryId) {
        alert('กรุณากรอกชื่อและเลือก Category');
        return;
    }
    try {
      await api.post('/master-data/subcategories', { name, category_id: selectedCategoryId });
      setName('');
      fetchData();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเพิ่ม Subcategory');
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Subcategory นี้?')) {
      try {
        await api.delete(`/master-data/subcategories/${id}`);
        fetchData();
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ Subcategory');
      }
    }
  };

  // ฟังก์ชันสำหรับ Edit
  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditingName(item.name);
    setEditingCategoryId(item.category_id);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleSave = async (itemId) => {
    try {
      await api.put(`/master-data/subcategories/${itemId}`, { name: editingName, category_id: editingCategoryId });
      setEditingItem(null);
      fetchData();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอัปเดต Subcategory');
    }
  };

  return (
    <div>
      <form onSubmit={handleAddItem} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new subcategory name"
          style={{ marginRight: '10px' }}
        />
        <select 
            value={selectedCategoryId} 
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
            required
        >
            <option value="" disabled>-- Select Category --</option>
            {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
        </select>
        <button type="submit">Add Subcategory</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <table border="1" style={{ minWidth: '500px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Parent Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {editingItem === item.id ? (
                <>
                  <td><input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} /></td>
                  <td>
                    <select value={editingCategoryId} onChange={(e) => setEditingCategoryId(e.target.value)}>
                      {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
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
                  <td>{categories.find(c => c.id === item.category_id)?.name || 'N/A'}</td>
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

export default SubcategoryManager;