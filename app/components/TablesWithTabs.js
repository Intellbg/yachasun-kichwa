// TablesWithTabs.js
'use client'
import React, { useState } from 'react';
import DinamicTable from './DinamicTable';

const TablesWithTabs = ({ tables }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <ul className="nav nav-tabs" role="tablist">
        {tables.map((table, index) => (
          <li className="nav-item" key={index} role="presentation">
            <button
              className={`nav-link ${activeTab === index ? 'activetab' : ''}`}
              type="button"
              onClick={() => handleTabClick(index)}
              style={{
                backgroundColor: activeTab === index ? '#003011' : 'white',
                color: activeTab === index ? 'white' : '#003011',                
                borderColor: activeTab === index ? '#003011' : '',
                border: '1px solid transparent',
              }}
            >
              {table.title}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {tables.map((table, index) => (
          activeTab === index && (
            <DinamicTable
              key={index}
              headers={table.headers}
              rows={table.rows}
              title={table.title}
              activeTab={activeTab}
              tabIndex={index}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default TablesWithTabs;










