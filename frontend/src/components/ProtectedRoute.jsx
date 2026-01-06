// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Cookie check ki jagah localStorage fallback use karo
  const hasAccessToken = !!localStorage.getItem('accessToken');
  
  // Ya agar cookie check hi karna hai to yeh try karo (better version)
  const hasRefreshCookie = document.cookie.includes('refreshToken=');

  console.log('ProtectedRoute check:', {
    hasAccessToken,
    hasRefreshCookie,
    allCookies: document.cookie // debugging ke liye
  });

  // Agar koi bhi cheez mili to allow kar do
  if (hasAccessToken || hasRefreshCookie) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;