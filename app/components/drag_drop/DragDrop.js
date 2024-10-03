"use client";

import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import styles from './style.css';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Word = ({ word, index, moveWord }) => {
  const [, ref] = useDrag({
    type: 'WORD',
    item: { index }
  });

  const [, drop] = useDrop({
    accept: 'WORD',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveWord(draggedItem.index, index);
        draggedItem.index = index;
      }
    }
  });

  return (
    <div ref={(node) => ref(drop(node))} className={`${styles.word}`}>
      {word}
    </div>
  );
};

const Target = ({ index, word, setTargetWord }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'WORD',
    drop: (draggedItem) => {
      setTargetWord(index, draggedItem.index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`${styles.target} ${word ? '' : styles.targetEmpty} ${isOver ? styles.dropAccepted : ''}`}
    >
      {word || <span>&nbsp;&ndash;&nbsp;</span>}
    </div>
  );
};

const DragAndDrop = ({ phrase }) => {
  const initialWords = (phrase ? phrase.split(' ') : []).map((word, index) => ({ id: index, word }));
  
  const [words, setWords] = useState([]);
  const [targetWords, setTargetWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);

  useEffect(() => {
    const shuffledWords = shuffleArray(initialWords);
    setWords(shuffledWords);
    setTargetWords(Array(initialWords.length).fill(''));
    setGameOver(false);
    setIsCorrectGuess(false);
  }, [phrase]);

  const moveWord = (fromIndex, toIndex) => {
    const updatedWords = update(words, {
      $splice: [
        [fromIndex, 1],
        [toIndex, 0, words[fromIndex]]
      ]
    });
    setWords(updatedWords);
  };

  const setTargetWord = (targetIndex, wordIndex) => {
    const newTargetWords = [...targetWords];
    newTargetWords[targetIndex] = words[wordIndex].word;
    setTargetWords(newTargetWords);
  };

  const checkAnswer = () => {
    const correctOrder = initialWords.map(word => word.word);
    const isCorrect = JSON.stringify(targetWords) === JSON.stringify(correctOrder);
    setGameOver(true);
    setIsCorrectGuess(isCorrect);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        
        {/* Contenedor de la imagen */}
        <div className={styles.imageContainer}>
          <img src="/path/to/your/image.png" alt="Character" />
        </div>

        {/* Palabras para arrastrar */}
        <div className="d-flex flex-wrap mb-4">
  {words.map((item, index) => (
    <Word key={item.id} word={item.word} index={index} moveWord={moveWord} />
  ))}
</div>


        {/* Espacios de destino */}
        <div className="d-flex flex-wrap justify-content-center mb-4">
          {targetWords.map((word, index) => (
            <Target key={index} index={index} word={word} setTargetWord={setTargetWord} />
          ))}
        </div>

        {/* Botones para revisar y continuar */}
        <div className={styles.buttonContainer}>
          <button onClick={checkAnswer}>Revisar</button>
        </div>
        
        {gameOver && isCorrectGuess && (
          <div className="alert alert-success mt-3" role="alert">
            ¡Felicidades! La oración es correcta.
          </div>
        )}
        {gameOver && !isCorrectGuess && (
          <div className="alert alert-danger mt-3" role="alert">
            ¡Lo siento! La oración es incorrecta.
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default DragAndDrop;





