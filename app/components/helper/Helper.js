'use client'
import React, { useState } from 'react';
import './style.css';


const Helper = ({ imageSrc, children, style, className, h=150, isOpen=false }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };  

  return (
    <>
      <img
        src={imageSrc}
        alt="Open Modal"
        style={style}
        className={`${className}`}
        height={h}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxHeight:"80%", minHeight:"40%"}}>
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
