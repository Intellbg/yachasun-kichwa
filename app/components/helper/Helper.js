'use client'
import React, { useState } from 'react';
import './style.css';


const Helper = ({ imageSrc, children, style, className, h=150, isOpen=false }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [isHovered, setIsHovered] = useState(false);

  const hoverImageSrc = '/img/humu/Talking-Outline-Question-Trace-Color-Texture.png';

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };  

  return (
    <>
      <img
        src={isHovered ? hoverImageSrc : imageSrc}
        alt="Open Modal"
        style={style}
        className={`${className}`}
        height={h}
        onClick={toggleModal}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
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
