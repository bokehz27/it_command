// src/components/EmployeeManager.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

function EmployeeManager() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [emails, setEmails] = useState([]);
  
  const [addFormData, setAddFormData] = useState({
    employee_code: '',
    fullName: '',
    contactNumber: '',
    department_id: '',
    position_id: '',
    email_id: '',
  });

  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [empRes, deptRes, posRes, emailRes] = await Promise.all([
        api.get('/employees'),
        api.get('/master-data/departments'),
        api.get('/master-data/positions'),
        api.get('/master-data/emails'),
      ]);
      setEmployees(empRes.data);
      setDepartments(deptRes.data);
      setPositions(posRes.data);
      setEmails(emailRes.data);
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    // ถ้า value เป็นค่าว่าง ให้ใช้ null แทน
    setAddFormData(prev => ({ ...prev, [name]: value === '' ? null : value }));
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await api.post('/employees', addFormData);
      alert('เพิ่มพนักงานสำเร็จ!');
      setAddFormData({ employee_code: '', fullName: '', contactNumber: '', department_id: '', position_id: '', email_id: '' });
      fetchData();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเพิ่มพนักงาน');
    }
  };
  
  const handleDeleteEmployee = async (id) => {
      if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบพนักงานคนนี้?')) {
          try {
              await api.delete(`/employees/${id}`);
              fetchData();
          } catch (err) {
              alert('เกิดข้อผิดพลาดในการลบพนักงาน');
          }
      }
  };

  // --- START: แก้ไขฟังก์ชันนี้ ---
  const handleEdit = (employee) => {
    setEditingItem(employee.id);
    // ตรวจสอบให้แน่ใจว่าค่า id ที่ส่งมาเป็น null หากไม่มีข้อมูล
    setEditFormData({
        ...employee,
        department_id: employee.Department?.id || null,
        position_id: employee.Position?.id || null,
        email_id: employee.Email?.id || null
    });
  };
  // --- END: แก้ไขฟังก์ชันนี้ ---

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    // ถ้า value เป็นค่าว่าง ให้ใช้ null แทน
    setEditFormData(prev => ({ ...prev, [name]: value === '' ? null : value }));
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleSave = async (employeeId) => {
    try {
      const payload = {
        employee_code: editFormData.employee_code,
        fullName: editFormData.fullName,
        contactNumber: editFormData.contactNumber,
        department_id: editFormData.department_id,
        position_id: editFormData.position_id,
        email_id: editFormData.email_id,
      };
      await api.put(`/employees/${employeeId}`, payload);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูลพนักงาน');
      console.error(err);
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Add New Employee</h3>
      <form onSubmit={handleAddEmployee} style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <input name="employee_code" value={addFormData.employee_code} onChange={handleAddInputChange} placeholder="Employee Code" required />
          <input name="fullName" value={addFormData.fullName} onChange={handleAddInputChange} placeholder="Full Name" required />
          <input name="contactNumber" value={addFormData.contactNumber} onChange={handleAddInputChange} placeholder="Contact Number" />
          <select name="department_id" value={addFormData.department_id || ''} onChange={handleAddInputChange} required>
              <option value="">-- Select Department --</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <select name="position_id" value={addFormData.position_id || ''} onChange={handleAddInputChange} required>
              <option value="">-- Select Position --</option>
              {positions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select name="email_id" value={addFormData.email_id || ''} onChange={handleAddInputChange}>
              <option value="">-- Select Email (Optional) --</option>
              {emails.map(e => <option key={e.id} value={e.id}>{e.email_address}</option>)}
          </select>
          <button type="submit">Add Employee</button>
      </form>
      <hr/>
      <h3>Employee List</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              {editingItem === emp.id ? (
                <>
                  <td><input name="employee_code" value={editFormData.employee_code} onChange={handleEditInputChange}/></td>
                  <td><input name="fullName" value={editFormData.fullName} onChange={handleEditInputChange}/></td>
                  <td>
                    <select name="department_id" value={editFormData.department_id || ''} onChange={handleEditInputChange}>
                        <option value="">-- No Department --</option>
                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </td>
                  <td>
                    <select name="position_id" value={editFormData.position_id || ''} onChange={handleEditInputChange}>
                        <option value="">-- No Position --</option>
                        {positions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </td>
                  <td>
                    <select name="email_id" value={editFormData.email_id || ''} onChange={handleEditInputChange}>
                        <option value="">-- No Email --</option>
                        {emails.map(e => <option key={e.id} value={e.id}>{e.email_address}</option>)}
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSave(emp.id)} style={{backgroundColor: 'darkgreen'}}>Save</button>
                    <button onClick={handleCancel} style={{marginLeft: '5px'}}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{emp.employee_code}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.Department?.name}</td>
                  <td>{emp.Position?.name}</td>
                  <td>{emp.Email?.email_address}</td>
                  <td>
                      <button onClick={() => handleEdit(emp)} style={{backgroundColor: 'darkblue'}}>Edit</button>
                      <button onClick={() => handleDeleteEmployee(emp.id)} style={{marginLeft: '5px', backgroundColor: 'darkred'}}>Delete</button>
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
export default EmployeeManager;