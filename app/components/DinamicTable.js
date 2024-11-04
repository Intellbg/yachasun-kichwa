'use client'
import React from 'react';

const DinamicTable = ({ headers, rows, title, activeTab, tabIndex }) => {
  // Solo muestra el contenido si la pestaña activa coincide con el índice de esta tabla.
  if (activeTab !== tabIndex) return null;

  return (
    <div className="container mt-4">      
      <table className="table table-hover table-striped">
        <thead className="table-primary">
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
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




