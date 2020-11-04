import React from 'react';
import './styles.css'

export default function StatisticCard({line1, line2}) {
  return (
    <li className='info-card'>
      <p>{line1}</p>
      <span>{line2}</span>
    </li>
  )
}