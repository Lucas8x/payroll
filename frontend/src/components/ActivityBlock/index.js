import React from 'react';
import './styles.css';

export default function ActivityBlock({title, data}) {
  return (
    <div className='activity-container'>
      <header className='title'>
        {title}
      </header>
      <ul>
      {data.map(item => (
        <li>
          <img src={item.avatar} alt=''/>
          <div className='info'>
            <p>{item.line1}</p>
            <span>{item.line2}</span>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}
