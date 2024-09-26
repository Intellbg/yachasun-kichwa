"use client";
import { useState, useRef, useEffect } from 'react';
import styles from './Game.module.css';
import { getQuestions } from "@/app/lib/getQuestions.js";

export default function Wordle({ level, onSendData }) {
  const [question, setQuestion] = useState(null);
  const [correctWord, setCorrectWord] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const fetchedQuestions = getQuestions(level);
    const randomQuestion = fetchedQuestions[Math.floor(Math.random() * fetchedQuestions.length)];
    setQuestion(randomQuestion);
    setCorrectWord(randomQuestion.answer.toUpperCase());
  }, [level]);

  useEffect(() => {
    if (!gameOver) {
      const nextInput = inputRefs.current[currentGuessIndex * correctWord.length];
      if (nextInput) nextInput.focus();
    }
  }, [currentGuessIndex, gameOver, correctWord]);

  const handleChange = (e, rowIndex, colIndex) => {
    console.log(correctWord)
    if (gameOver) return;
    const value = e.target.value.toUpperCase();
    if (/^[A-ZÑñ0-9]$/.test(value) || value === '') {
      const newGuesses = [...guesses];
      const currentGuess = newGuesses[rowIndex].split('');
      currentGuess[colIndex] = value;
      newGuesses[rowIndex] = currentGuess.join('');
      setGuesses(newGuesses);

      if (value !== '') {
        if (colIndex < correctWord.length - 1) {
          const nextInput = inputRefs.current[rowIndex * correctWord.length + colIndex + 1];
          if (nextInput) nextInput.focus();
        } else if (colIndex === correctWord.length - 1) {
          if (newGuesses[rowIndex] === correctWord) {
            setGameOver(true);
            setIsCorrectGuess(true);
            onSendData(true);
          } else if (rowIndex < 5) {
            setCurrentGuessIndex(rowIndex + 1);
          } else {
            setGameOver(true);
            onSendData(true);

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
  if (!question) return null;

  return (
    <div className="container">
      <h1>{question.question}</h1>
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
        <>
          <div className="alert alert-success mt-3" role="alert">
            ¡Felicidades! Has adivinado la palabra correcta.
          </div>
        </>
      )}
      {gameOver && !isCorrectGuess && (
        <>
          <div className="alert alert-danger mt-3" role="alert">
            ¡Lo siento! No has adivinado la palabra correcta. {question.answer}
          </div>
          <button className='text-center btn btn-warning' >Re intentar</button>
        </>

      )}
    </div>
  );
};
