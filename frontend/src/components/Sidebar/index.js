import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Home, Users, DollarSign,
  Clipboard, Briefcase, User, LogOut } from 'react-feather';

import './styles.css';
import { useAuth } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';

export default function Sidebar() {
  const history = useHistory();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  function handleTabClick(e) {
    const tab = e.currentTarget.value;
    if (tab === 'logout') {
      history.push('/');
    }
    setActiveTab(tab);
    history.push(tab);
  }

  return (
    <div className='sidebar-container'>
      <div className='sidebar'>
        <div className='user-info'>
          <img src={avatar} alt='avatar' />
          <p>{user?.name}</p>
          <span>{user?.user_type}</span>
        </div>
        <div className='options'>
          <button
            value='dashboard'
            className={activeTab === 'dashboard' ? 'selected' : ''}
            onClick={handleTabClick}
          >
            <Home />Inicio
          </button>

          <button
            value='employees'
            className={activeTab === 'employees' ? 'selected' : ''}
            onClick={handleTabClick}
          >
            <Users />Funcionarios
          </button>

          <button
            value='payroll'
            className={activeTab === 'payroll' ? 'selected' : ''}
            onClick={handleTabClick}
          >
            <DollarSign />
            <span>Folha de <br></br> Pagamento</span>
          </button>

          <button
            value='reports'
            className={activeTab === 'reports' ? 'selected' : ''}
            onClick={handleTabClick}
          >
            <Clipboard />Relatórios
          </button>

          <button
            value='positions'
            className={activeTab === 'positions' ? 'selected' : ''}
            onClick={handleTabClick}
          >
            <Briefcase />Cargos
          </button>

          <button
            value='account'
            className={activeTab === 'account' ? 'selected' : ''}
            onClick={handleTabClick}
          >
            <User />Conta
          </button>

          <button
            value='logout'
            onClick={() => {signOut(() => history.push('/'))}}
          >
            <LogOut />Sair
          </button>
        </div>
      </div>
    </div>
  )
}