'use client'
import React, { useState } from 'react';
import DinamicTable from './DinamicTable';

const TablesWithTabs = ({ tables }) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>      
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {tables.map((table, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link ${activeTab === index + 1 ? 'active' : ''}`}
              id={`table${index + 1}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#table${index + 1}`}
              type="button"
              role="tab"
              aria-controls={`table${index + 1}`}
              aria-selected={activeTab === index + 1}
              onClick={() => setActiveTab(index + 1)}
            >
              {table.title}
            </button>
          </li>
        ))}
      </ul>
      
      <div className="tab-content" id="myTabContent">
        {tables.map((table, index) => (
          <DinamicTable
            key={index}
            headers={table.headers}
            rows={table.rows}
            title={table.title}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabIndex={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TablesWithTabs;
