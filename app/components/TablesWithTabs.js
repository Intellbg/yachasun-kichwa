// Table with tabs.js
'use client'
import React, { useState } from 'react';
import DinamicTable from './DinamicTable';

const TablesWithTabs = ({ tables }) => {
  // Estado para la pestaña activa, comenzando con la primera
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      {/* Renderiza las pestañas con los títulos de cada tabla */}
      <ul className="nav nav-tabs" role="tablist">
        {tables.map((table, index) => (
          <li className="nav-item" key={index} role="presentation">
            <button
              className={`nav-link ${activeTab === index ? 'active' : ''}`}
              type="button"
              onClick={() => handleTabClick(index)}
            >
              {table.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Renderiza el contenido de la tabla seleccionada */}
      <div className="tab-content">
        {tables.map((table, index) => (
          activeTab === index && ( // Solo muestra la tabla activa
            <DinamicTable
              key={index}
              headers={table.headers}
              rows={table.rows}
              title={table.title}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default TablesWithTabs;









