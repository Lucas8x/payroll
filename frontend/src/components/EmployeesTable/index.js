import React, { useEffect, useState } from 'react';
import { ExternalLink, Edit, Trash2 } from 'react-feather';
import './styles.css';

import api from '../../services/api';
import avatar from '../../assets/avatar.png';

export default function EmployeesTable({ data }) {
  const [employees, setEmployees] = useState([]);

  function handleShow(id) {}
  function handleEdit(id) {}

  function handleDelete(id) {
    api.delete(`funcionarios/${id}`);
    let after_delete = employees.filter((item) => item.id !== id);
    setEmployees(after_delete);
  }

  useEffect(() => {
    setEmployees(data);
  }, [data]);

  return (
    <div className='employees-table-container'>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <img src={employee.avatar ? employee.avatar : avatar} alt='' />
            <div>
              <div className='info'>
                <p>{employee.nome}</p>
                <span>{employee.cargo.nome}</span>
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
