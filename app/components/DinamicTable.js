// DinamicTable.js
'use client'
import React from 'react';

const DinamicTable = ({ headers, rows, title, activeTab, tabIndex }) => {
  if (activeTab !== tabIndex) return null;

  return (
    <div className="container mt-4">      
      <table className="table table-hover table-striped">
        <thead className="table-primary">
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{ color: 'white' , backgroundColor: '#003011'}}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DinamicTable;





