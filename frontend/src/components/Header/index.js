import React from 'react';
import './styles.css';

import avatar from '../../assets/avatar.png'

export default function Header() {
  return (
    <div className='header-container'>
      <div className='logo-container'>
        <p>RH</p>
      </div>
      <div className='header'>
        <div className='user-info'>
          <p>Elon Musk</p>
          <img src={avatar} alt='username' />
        </div>
      </div>
    </div>
  )
}