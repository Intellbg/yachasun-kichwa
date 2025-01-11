import React from 'react';
import styles from './ComicSpeechBubble.module.css';

const imageMap = {
  humu: '/img/Humu.jpeg',
  humuFeliz: '/img/humu-fuckup.png',
  humuSad: '/img/humu/humu-disappointed.png',
};

const ComicSpeechBubble = ({ text, character, alignment = 'left', children }) => {
  const imageSrc = imageMap[character] || imageMap['humu'];

  return (
    <div
      className={`${styles.container} ${
        alignment === 'right' ? styles.rightAlign : styles.leftAlign
      }`}
    >
      <div className={styles.character}>
        <img
          src={imageSrc}
          alt="Personaje"
          className={`${styles.characterImage} ${styles.imgFloat}`}
        />
      </div>
      <div className={styles.speechBubble}>
        <p>{text}</p>
        {children}
        <div
          className={`${styles.speechArrow} ${
            alignment === 'right' ? styles.arrowRight : styles.arrowLeft
          }`}
        />
      </div>
    </div>
  );
};

export default ComicSpeechBubble;
