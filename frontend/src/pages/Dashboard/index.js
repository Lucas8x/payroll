import React, { useState, useEffect } from 'react';
import moment from 'moment';

import './styles.css';
import api from '../../services/api';
import StatisticCard from '../../components/StatisticCard';
import ActivityBlock from '../../components/ActivityBlock';
import ReportsTable from '../../components/ReportsTable';

import avatarTest from '../../assets/avatar.png';

export default function Dashboard() {
  const [dashData, setDashData] = useState(null);
  const [newEmployees, setNewEmployees] = useState([]);
  const [employeeHistory, setEmployeeHistory] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get('dashboard').then((response) => {
      setDashData(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('relatorios').then((response) => {
      setReports(response.data);
    });
  }, []);

  useEffect(() => {
    // test
    setNewEmployees([
      {
        id: 1,
        avatar: avatarTest,
        line1: 'Lucas',
        line2: 'Estudante',
      },
      {
        id: 2,
        avatar: avatarTest,
        line1: 'Lucas',
        line2: 'Estudante',
      },
      {
        id: 3,
        avatar: avatarTest,
        line1: 'Lucas',
        line2: 'Estudante',
      },
    ]);
    setEmployeeHistory([
      {
        id: 1,
        avatar: avatarTest,
        line1: 'O cargo de Lucas foi alterado',
        line2: moment().format('lll'),
      },
      {
        id: 2,
        avatar: avatarTest,
        line1: 'O cargo de João foi alterado',
        line2: moment().format('lll'),
      },
      {
        id: 3,
        avatar: avatarTest,
        line1: 'O cargo de Maria foi alterado',
        line2: moment().format('lll'),
      },
    ]);
  }, []);

  return (
    <div className='dashboard-container'>
      <div className='dashboard-details'>
        <ul className='statistics'>
          <StatisticCard
            line1='Total Funcionarios'
            line2={dashData ? dashData.total_funcionarios : '...'}
          />
          <StatisticCard
            line1='Funcionarios Ativos'
            line2={dashData ? dashData.funcionarios_ativos : '...'}
          />
          <StatisticCard line1='Gastos no Mês' line2='...' />
          <StatisticCard line1='Placeholder' line2='...' />
        </ul>
        <div className='activity'>
          <ActivityBlock title='Novos Funcionários' data={newEmployees} />
          <ActivityBlock title='Mudanças recentes' data={employeeHistory} />
        </div>
        <div className='reports'>
          <ReportsTable data={reports} />
        </div>
      </div>
    </div>
  );
}
