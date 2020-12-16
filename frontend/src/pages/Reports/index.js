import React, { useEffect, useState } from 'react';

import './styles.css';
import api from '../../services/api';
import ReportsTable from '../../components/ReportsTable';

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get('relatorios').then((response) => {
      setReports(response.data);
    });
  }, []);

  return (
    <div className='reports-page'>
      <ReportsTable data={reports} />
    </div>
  );
}
