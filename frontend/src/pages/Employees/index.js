import React, { useState, useEffect } from 'react';
import './styles.css';

import EmployeesTable from '../../components/EmployeesTable';

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees([
      {name: 'lucas', cargo: 'dev'},
      {name: 'lucas', cargo: 'dev'},
      {name: 'lucas', cargo: 'dev'}
    ])
  }, []);

  return (
    <div className='employees-page'>
      <EmployeesTable data={employees} />
    </div>
  )
}
