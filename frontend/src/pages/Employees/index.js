import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

import api from '../../services/api';
import EmployeesTable from '../../components/EmployeesTable';

export default function Employees() {
  const history = useHistory();
  const [employees, setEmployees] = useState([]);

  function handleNavigateToCreate() {
    history.push('/employees/create');
  }

  useEffect(() => {
    api.get('funcionarios').then((response) => {
      setEmployees(response.data);
    });
  }, []);

  return (
    <div className='employees-page'>
      <button onClick={handleNavigateToCreate}>criar</button>
      <EmployeesTable data={employees} />
    </div>
  );
}
