// src/components/EmailManager.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

function EmailManager() {
  const [emails, setEmails] = useState([]);
  const [emailAddress, setEmailAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editingItem, setEditingItem] = useState(null);
  const [editingAddress, setEditingAddress] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/master-data/emails');
      setEmails(response.data);
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูล Emails ได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!emailAddress.trim()) return;
    try {
      await api.post('/master-data/emails', { email_address: emailAddress });
      setEmailAddress('');
      fetchData();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเพิ่ม Email');
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Email นี้?')) {
      try {
        await api.delete(`/master-data/emails/${id}`);
        fetchData();
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ Email');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditingAddress(item.email_address);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleSave = async (itemId) => {
    try {
      await api.put(`/master-data/emails/${itemId}`, { email_address: editingAddress });
      setEditingItem(null);
      fetchData();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอัปเดต Email');
    }
  };

  return (
    <div>
      <h1>Manage Emails</h1>
      <form onSubmit={handleAddItem} style={{ marginBottom: '20px' }}>
        <input
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          placeholder="Enter new email address"
          style={{ marginRight: '10px', width: '250px' }}
        />
        <button type="submit">Add Email</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" style={{ minWidth: '600px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {editingItem === item.id ? (
                <>
                  <td><input type="email" value={editingAddress} onChange={(e) => setEditingAddress(e.target.value)} style={{width: '100%'}} /></td>
                  <td>
                    <button onClick={() => handleSave(item.id)} style={{backgroundColor: 'darkgreen'}}>Save</button>
                    <button onClick={handleCancel} style={{marginLeft: '5px'}}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.email_address}</td>
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

export default EmailManager;