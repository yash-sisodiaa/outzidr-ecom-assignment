import api from '../services/api';
import { useNavigate,Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.log('Logout error');
    }
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>You are logged in successfully! 🎉</p>
      <p>Welcome!</p>

      <div style={{ margin: '20px 0' }}>
    <Link to="/products" style={{ marginRight: '20px' }}>View Products</Link>
    <Link to="/cart">View Cart</Link>
  </div>

      <button
        onClick={handleLogout}
        style={{ padding: '10px 20px', background: '#ff4444', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Logout
      </button>

    </div>
  );
}