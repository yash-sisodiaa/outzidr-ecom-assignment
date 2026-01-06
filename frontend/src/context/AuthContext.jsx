import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // App start pe check karo user logged in hai ya nahi
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Koi protected endpoint hit karo (baad mein /products wagera daal dena)
        await api.get('/auth/me'); // ← yeh endpoint bana dena backend pe simple user return karne ke liye
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, tenantId) => {
    try {
      await api.post(
        '/auth/login',
        { email, password },
        { headers: { 'x-tenant-id': tenantId } }
      );
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (email, password, tenantId) => {
    try {
      await api.post(
        '/auth/register',
        { email, password },
        { headers: { 'x-tenant-id': tenantId } }
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout failed');
    }
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);