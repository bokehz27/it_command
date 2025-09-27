// src/components/SideNav.jsx
import { Link } from 'react-router-dom';

const navStyles = {
  borderRight: '1px solid #444',
  width: '200px',
  padding: '20px',
  height: '100vh',
  backgroundColor: '#1e1e1e',
};

const ulStyles = {
  listStyle: 'none',
  padding: 0,
};

const liStyles = {
  marginBottom: '15px',
};

const linkStyles = {
  textDecoration: 'none',
  color: '#a9a9a9',
  fontSize: '18px',
};


function SideNav() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav style={navStyles}>
      <h2>IT Asset</h2>
      <ul style={ulStyles}>
        <li style={liStyles}><Link to="/" style={linkStyles}>Dashboard</Link></li>
        <li style={liStyles}><Link to="/master-data" style={linkStyles}>Manage Master Data</Link></li>
        {/* เราจะเพิ่มเมนูอื่นๆ ที่นี่ในอนาคต */}
      </ul>
      <button onClick={handleLogout} style={{ position: 'absolute', bottom: '20px' }}>Logout</button>
    </nav>
  );
}

export default SideNav;