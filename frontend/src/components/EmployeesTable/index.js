import React from 'react';
import './styles.css';

import { ExternalLink, Edit, Trash2 } from 'react-feather';

import avatar from '../../assets/avatar.png';

export default function EmployeesTable({ data }) {
  function handleEdit(id) {
  }

  return (
    <div className='employees-container'>
      <ul>
        {data.map(employee => (
          <li key={employee.id}>
            <img src={avatar} alt=''/>
            <div>
              <div className='info'>
                <p>{employee.name}</p>
                <span>{employee.cargo}</span>
              </div>

              <div className='actions'>
                <button className='actionButton'>
                  <ExternalLink />
                </button>

                <button
                  className='actionButton'
                  onClick={() => handleEdit(employee.id)}
                >
                  <Edit />
                </button>

                <button className='actionButton'>
                  <Trash2 />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}