import React, { createContext, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import api from '../services/api';
import fakeSignIn from '../services/fake-auth';

const AuthContext = createContext({
  signed: false,
  user: null,
  loading: false,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = localStorage.getItem('@PayrollAuth:user');
      const storagedToken = localStorage.getItem('@PayrollAuth:token');
      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn() {
    const response = await fakeSignIn();
    setUser(response.user);

    api.defaults.headers.Authorization = `Baerer ${response.token}`;
    localStorage.setItem('@PayrollAuth:user', JSON.stringify(response.user));
    localStorage.setItem('@PayrollAuth:token', response.token);
  }

  async function signOut(callback) {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
