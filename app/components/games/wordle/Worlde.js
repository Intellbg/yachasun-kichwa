"use client";
import { useState, useRef, useEffect } from 'react';
import styles from './Game.module.css';
import { getQuestions } from "@/app/lib/getQuestions.js";

export default function Game({ lectures, onSendData }) {
  const [question, setQuestion] = useState({});
  const [correctWord, setCorrectWord] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      const questions = await getQuestions(lectures);
      const randomQuestion = questions[0];
      setQuestion(randomQuestion);
      setCorrectWord(randomQuestion.answer.toUpperCase());
    };
    fetchData();
  }, [lectures]);

  useEffect(() => {
    if (!gameOver && correctWord) {
      const nextInput = inputRefs.current[currentGuessIndex * correctWord.length];
      if (nextInput) nextInput.focus();
    }
  }, [currentGuessIndex, gameOver, correctWord]);

  const handleChange = (e, rowIndex, colIndex) => {
    if (gameOver) return;

    const value = e.target.value.toUpperCase();
    const isValidInput = /^[A-ZÑñ0-9]$/.test(value) || value === '';

    if (!isValidInput) return;

    const newGuesses = [...guesses];
    const currentGuess = newGuesses[rowIndex].split('');
    currentGuess[colIndex] = value;
    newGuesses[rowIndex] = currentGuess.join('');
    setGuesses(newGuesses);

    if (value === '') return;

    const isLastColumn = colIndex === correctWord.length - 1;

    if (!isLastColumn) {
      focusNextInput(rowIndex, colIndex);
    } else if (newGuesses[rowIndex] === correctWord) {
      endGame(true);
    } else if (rowIndex < 5) {
      setCurrentGuessIndex(rowIndex + 1);
    } else {
      endGame(false);
    }
  };

  const focusNextInput = (rowIndex, colIndex) => {
    const nextInput = inputRefs.current[rowIndex * correctWord.length + colIndex + 1];
    if (nextInput) nextInput.focus();
  };

  const endGame = (isCorrect) => {
    setGameOver(true);
    setIsCorrectGuess(isCorrect);
    onSendData(isCorrect);
  };

  const getCellStyle = (letter, index, rowIndex) => {
    if (isCorrectGuess && rowIndex === currentGuessIndex) return 'bg-success text-white';
    if (rowIndex >= currentGuessIndex) return '';
    if (correctWord[index] === letter) return 'bg-success text-white';
    if (correctWord.includes(letter)) return 'bg-warning text-white';
    return 'bg-secondary text-white';
  };
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <div className="container">
      <h1 className='text-center'>{question?.question}</h1>
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
      <div className="w-50 text-center m-auto">
        {gameOver && (
          <>
            <div
              className={`alert mt-3 ${isCorrectGuess ? 'alert-success' : 'alert-danger'}`}
              role="alert"
            >
              {isCorrectGuess
                ? '¡Felicidades! Has adivinado la palabra correcta.'
                : `¡Lo siento! No has adivinado la palabra correcta. La respuesta era: ${question.answer}`
              }
            </div>
            {!isCorrectGuess && (
              <button
                className="btn btn-warning mt-2"
                onClick={reloadPage}
              >
                Reintentar
              </button>
            )}
          </>
        )}
      </div>

    </div>
  );
};











