import React from 'react';
import styles from './ComicSpeechBubble.module.css'; 

const imageMap = {
  humu: '/img/Humu.jpeg',
  humuFeliz: '/img/humu-fuckup.png',  
};

const ComicSpeechBubble = ({ text, character }) => {  
  const imageSrc = imageMap[character] || imageMap['humu'];
  return (
    <div className={styles.container}>
      <div className={styles.character}>        
        <img
          src={imageSrc}
          alt="Personaje"
          className={`${styles.characterImage} ${styles.imgFloat}`} 
        />
      </div>
      <div className={styles.speechBubble}>
        <p>{text}</p>
      </div>    
    </div>
  );
};

export default ComicSpeechBubble;
