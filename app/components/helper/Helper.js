'use client'
import React, { useState } from 'react';
import './style.css';

const Helper = ({ imageSrc, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <img
        src={imageSrc}
        alt="Open Modal"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        height={150}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={toggleModal}>
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Helper;
