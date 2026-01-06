import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantId, setTenantId] = useState('test-tenant-123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post(
      '/auth/login',
      { email, password },
      { headers: { 'x-tenant-id': tenantId } }
    );

    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    localStorage.setItem('tenantId', tenantId);

    // 500ms delay daal do taaki cookie properly set ho jaye
    setTimeout(() => {
      navigate('/');
    }, 500);  // ya 1000 (1 second) bhi try kar sakte ho

  } catch (err) {
    console.error("Login error:", err);
    setError(err.response?.data?.message || 'Login failed');
  }
};

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Tenant ID</label><br />
          <input
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: '20px' }}>
        New here? <a href="/register">Register</a>
      </p>
    </div>
  );
}