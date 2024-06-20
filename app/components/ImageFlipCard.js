'use client'
import React, { useState, useEffect } from 'react';

const ImageFlipCard = ({ front, back, img = 'https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg' }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
  }, [flipped])
  return (
    <div className={`card w-100 h-100 text-center text-capitalize align-middle ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className={`${flipped ? "d-none" : ""}`}>
        <img src={img} alt={front} className='d-block w-100' />
        <h2 className='py-2'>
          <strong onClick={(flipped) => setFlipped(!flipped)}>{front}</strong>
        </h2>
      </div>
      <div className={` d-flex align-items-center h-100 text-center ${flipped ? "" : "d-none"}`}>
        <h2 className='w-100'>{back}</h2>
      </div>
    </div >
  );
};

export default ImageFlipCard;
