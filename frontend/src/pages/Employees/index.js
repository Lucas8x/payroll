import React, { useState, useEffect } from 'react';
import './styles.css';

import api from '../../services/api';
import EmployeesTable from '../../components/EmployeesTable';

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get('funcionarios').then((response) => {
      setEmployees(response.data);
    });
  }, []);

  return (
    <div className='employees-page'>
      <EmployeesTable data={employees} />
    </div>
  );
}
