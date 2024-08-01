"use client";  // Agrega esto en la parte superior

import { useState, useRef, useEffect } from 'react';
import styles from './Wordle.module.css';

const Game = ({ word = '' }) => { // Proveer un valor por defecto para word
  const correctWord = word;  // Usar la prop 'word'
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!gameOver && correctWord.length > 0) { // Añadir comprobación de longitud
      const nextInput = inputRefs.current[currentGuessIndex * correctWord.length];
      if (nextInput) nextInput.focus();
    }
  }, [currentGuessIndex, gameOver, correctWord.length]);

  const handleChange = (e, rowIndex, colIndex) => {
    if (gameOver) return;
    const value = e.target.value.toUpperCase();
    if (/^[A-Z]$/.test(value) || value === '') {
      const newGuesses = [...guesses];
      const currentGuess = newGuesses[rowIndex].split('');
      currentGuess[colIndex] = value;
      newGuesses[rowIndex] = currentGuess.join('');
      setGuesses(newGuesses);

      // Move to the next input
      if (value !== '') {
        if (colIndex < correctWord.length - 1) {
          const nextInput = inputRefs.current[rowIndex * correctWord.length + colIndex + 1];
          if (nextInput) nextInput.focus();
        } else if (colIndex === correctWord.length - 1) {
          // Check if the guess is correct
          if (newGuesses[rowIndex] === correctWord) {
            setGameOver(true);
            setIsCorrectGuess(true);
          } else if (rowIndex < 5) {
            setCurrentGuessIndex(rowIndex + 1);
          } else {
            setGameOver(true);
          }
        }
      }
    }
  };

  const getCellStyle = (letter, index, rowIndex) => {
    if (isCorrectGuess && rowIndex === currentGuessIndex) return 'bg-success text-white';
    if (rowIndex >= currentGuessIndex) return '';

    if (correctWord[index] === letter) return 'bg-success text-white';
    if (correctWord.includes(letter)) return 'bg-warning text-white';
    return 'bg-secondary text-white';
  };

  return (
    <div className="container">
      {guesses.map((guess, rowIndex) => (
        <div className="d-flex justify-content-center mb-2" key={rowIndex}>
          {Array.from({ length: correctWord.length }).map((_, colIndex) => {
            const letter = guess[colIndex] || '';
            return (
              <input
                key={colIndex}
                ref={el => inputRefs.current[rowIndex * correctWord.length + colIndex] = el}
                type="text"
                maxLength="1"
                value={letter}
                onChange={(e) => handleChange(e, rowIndex, colIndex)}
                className={`d-flex justify-content-center align-items-center border text-center ${styles.cell} ${getCellStyle(letter, colIndex, rowIndex)}`}
                disabled={gameOver || rowIndex !== currentGuessIndex}
              />
            );
          })}
        </div>
      ))}
      {gameOver && isCorrectGuess && (
        <div className="alert alert-success mt-3" role="alert">
          ¡Felicidades! Has adivinado la palabra correcta.
        </div>
      )}
      {gameOver && !isCorrectGuess && (
        <div className="alert alert-danger mt-3" role="alert">
          ¡Lo siento! No has adivinado la palabra correcta.
        </div>
      )}
    </div>
  );
};

export default Game;









