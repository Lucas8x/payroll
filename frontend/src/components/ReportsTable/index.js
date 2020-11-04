import React from 'react';
import './styles.css';

export default function ReportsTable({ data }) {
  function handleReportOpen(id) {
  }

  return (
    <div className='reports-container'>
      <table className='reports-table'>
        <caption>Relatórios</caption>
        <tr className='header'>
          <th>Autor</th>
          <th>Assunto</th>
          <th>Data</th>
        </tr>
        {data.map(item => (
          <tr className='item'>
            <td>{item.autor}</td>
            <td>{item.subject}</td>
            <td>{item.date}</td>
            <td onClick={() => handleReportOpen(item.id)}>Abrir</td>
          </tr>
        ))}
      </table>
    </div>
  )
}