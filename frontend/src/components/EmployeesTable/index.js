import React from 'react';
import './styles.css';

import { ExternalLink, Edit, Trash2 } from 'react-feather';

import avatar from '../../assets/avatar.png';

export default function EmployeesTable({ data }) {
  function handleShow(id) {}
  function handleEdit(id) {}
  function handleDelete(id) {}

  return (
    <div className='employees-container'>
      <ul>
        {data.map((employee) => (
          <li key={employee.id}>
            <img src={employee.avatar ? employee.avatar : avatar} alt='' />
            <div>
              <div className='info'>
                <p>{employee.nome}</p>
                <span>{employee.cargo}</span>
              </div>

              <div className='actions'>
                <button
                  className='actionButton'
                  onClick={() => handleShow(employee.id)}
                >
                  <ExternalLink />
                </button>

                <button
                  className='actionButton'
                  onClick={() => handleEdit(employee.id)}
                >
                  <Edit />
                </button>

                <button
                  className='actionButton'
                  onClick={() => handleDelete(employee.id)}
                >
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
