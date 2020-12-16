import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import { useAuth } from '../../contexts/auth';

export default function Login() {
  const history = useHistory();
  const { signIn, signed } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (username === 'adm' && password === 'adm') {
      setError('');
      signIn();
      if (signed) {
        history.push('/dashboard');
      }
    }
    setError('Usuario ou Senha incorretos');
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <input
          type='text'
          placeholder='Digite seu usuario'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type='password'
          value={password}
          placeholder='Digite sua senha'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>Entrar</button>
      </form>
    </div>
  );
}
