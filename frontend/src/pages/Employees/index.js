import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import './styles.css';
import api from '../../services/api';
import EmployeesTable from '../../components/EmployeesTable';

export default function Employees() {
  const history = useHistory();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get('funcionarios').then((response) => {
      setEmployees(response.data);
    });
  }, []);

  return (
    <div className='employees-page'>
      <Link to='/employees/create' className='add-button'>
        <Plus size={32} color='#FFF' />
      </Link>
      <EmployeesTable data={employees} />
    </div>
  );
}
