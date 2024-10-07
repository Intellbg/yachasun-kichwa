'use client'
import React from 'react';

const DinamicTable = ({ headers, rows, title, activeTab, setActiveTab, tabIndex }) => {
  return (
    <div className={`tab-pane fade ${activeTab === tabIndex ? 'show active' : ''}`} id={`table${tabIndex}`} role="tabpanel" aria-labelledby={`table${tabIndex}-tab`}>
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
    </div>
  );
};

export default DinamicTable;

