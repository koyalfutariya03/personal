"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // API Configuration - Connect to your Express backend
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL|| 'http://localhost:5002';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setLoading(false);
          return;
        }

        console.log('Validating token with backend...');

        // Validate token with your Express backend
        const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (res.ok) {
          const userData = await res.json();
          console.log('Token validation successful:', userData);
          
          setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            role: userData.role,
            isActive: userData.isActive,
            lastLogin: userData.lastLogin
          });

          // Sync localStorage with validated data
          localStorage.setItem('adminRole', userData.role);
          localStorage.setItem('adminUsername', userData.username);
          localStorage.setItem('adminEmail', userData.email || '');
          localStorage.setItem('adminId', userData.id);
          localStorage.setItem('isAdminLoggedIn', 'true');
        } else {
          console.log('Token validation failed:', res.status);
          // Clear invalid token and related data
          clearAuthData();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_BASE_URL]);

  const clearAuthData = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminId');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAdminLoggedIn');
    setUser(null);
  };

  const login = (userData) => {
    console.log('AuthContext login called with:', userData);
    
    // Normalize role to lowercase
    const normalizedRole = userData.role ? userData.role.toLowerCase() : '';
    
    // Store all user data with normalized role
    const userInfo = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      role: normalizedRole,  // Ensure role is always lowercase
      isActive: userData.isActive,
      lastLogin: userData.lastLogin || new Date().toISOString()
    };

    console.log('Storing user data:', userInfo);
    
    // Update state
    setUser(userInfo);

    // Store all necessary data in localStorage with consistent naming
    localStorage.setItem('adminToken', userData.token || '');
    localStorage.setItem('adminRole', normalizedRole);
    localStorage.setItem('adminUsername', userInfo.username);
    localStorage.setItem('adminEmail', userInfo.email || '');
    localStorage.setItem('adminId', userInfo.id);
    localStorage.setItem('userData', JSON.stringify(userInfo));
    localStorage.setItem('isAdminLoggedIn', 'true');
    
    console.log('AuthContext: Login successful, localStorage updated');
    
    console.log('User logged in successfully:', userInfo);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (token) {
        // Optional: Call backend logout endpoint if you implement one
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).catch(() => {
          // Ignore logout endpoint errors - still clear local data
          console.log('Logout endpoint not available or failed');
        });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Always clear local data regardless of backend response
      clearAuthData();
      router.replace('/AdminLogin');
    }
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('adminToken');
  };

  const hasRole = (requiredRoles) => {
    if (!user) return false;
    if (typeof requiredRoles === 'string') {
      return user.role === requiredRoles.toLowerCase();
    }
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.some(role => user.role === role.toLowerCase());
    }
    return false;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
    clearAuthData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
