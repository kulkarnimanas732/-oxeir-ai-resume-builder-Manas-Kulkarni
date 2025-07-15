import React, { createContext, useEffect, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('userType');
    if (token && type) {
      setUserType(type);
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id, name: payload.name, email: payload.email });
      } catch (err) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token, type) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', type);
    setUserType(type);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.id, name: payload.name, email: payload.email });
    } catch {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
