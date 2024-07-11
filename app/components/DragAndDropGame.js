"use client";

import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import styles from './DragAndDropGame.module.css';

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

const DragAndDropGame = () => {
  const [words, setWords] = useState([
    { id: 1, word: 'ñukaka' },
    { id: 2, word: 'mikunkapak' },
    { id: 3, word: 'shamuni' }    
  ]);
  const [targetWords, setTargetWords] = useState(Array(words.length).fill(''));

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
    const correctOrder = words.map(word => word.word);
    const isCorrect = JSON.stringify(targetWords) === JSON.stringify(correctOrder);
    alert(isCorrect ? 'Correct!' : 'Try again!');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <h2 className="my-4">Escribe la siguiente oración en kichwa: Vengo a comer</h2>
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
        <button className="btn btn-success" onClick={checkAnswer}>Check</button>
      </div>
    </DndProvider>
  );
};

export default DragAndDropGame;


