"use client"; // Agrega esto en la parte superior

import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import styles from './style.css';

// Función de barajado usando el algoritmo de Fisher-Yates
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
    <div ref={(node) => ref(drop(node))} className={`${styles.word} btn btn-secondary m-1`}>
      {word}
    </div>
  );
};

const Target = ({ index, word, setTargetWord }) => {
  const [, drop] = useDrop({
    accept: 'WORD',
    drop: (draggedItem) => {
      setTargetWord(index, draggedItem.index);
    }
  });

  return (
    <div ref={drop} className={`${styles.target} btn btn-light m-1`}>
      {word}
    </div>
  );
};

const DragAndDrop = ({ phrase }) => {
  const initialWords = phrase.split(' ').map((word, index) => ({ id: index, word }));
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
        <div className="d-flex flex-wrap mb-4">
          {words.map((item, index) => (
            <Word key={item.id} word={item.word} index={index} moveWord={moveWord} />
          ))}
        </div>
        <div className="d-flex flex-wrap mb-4">
          {targetWords.map((word, index) => (
            <Target key={index} index={index} word={word} setTargetWord={setTargetWord} />
          ))}
        </div>
        <button className="btn btn-success" onClick={checkAnswer}>Revisar</button>
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



