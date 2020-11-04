import React from 'react';
import './App.css';

import Routes from './routes';
import { AuthProvider } from './contexts/auth'

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}
