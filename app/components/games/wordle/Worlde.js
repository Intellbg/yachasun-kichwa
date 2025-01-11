"use client";
import Helper from "@/app/components/helper/Helper.js";
import { useState, useRef, useEffect } from 'react';
import styles from "./game.module.css";
import { getQuestions } from "@/app/lib/getQuestions.js";
import WordleInstructions from '../../instructions/wordle/WordleInstructions';
import animation from '@/app/animation.module.css';

export default function Game({ lectures, onSendData }) {
  const [question, setQuestion] = useState({});
  const [correctWord, setCorrectWord] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(null);
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
    if (isCorrectGuess === true && rowIndex === currentGuessIndex) return 'bg-success text-white';
    if (rowIndex >= currentGuessIndex) return '';
    if (correctWord[index] === letter) return 'bg-success text-white';
    if (correctWord.includes(letter)) return 'bg-warning text-white';
    return 'bg-secondary text-white';
  };
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <div className="container text-center bg-white text-dark " style={{ maxWidth: '700px' }}>
        <div className="d-flex align-items-center justify-content-center mb-4">
          <h1 className="me-3">Palabrando</h1>
          <div>
            <Helper imageSrc="/img/humu/humu-happy.png" className={`${animation.spinnerImage}`}>
              <WordleInstructions />
            </Helper>
          </div>
        </div>
        <h2 className="text my-4"> Completa los espacios para responder la pregunta </h2>
        <h5 className="text my-4">{question?.question}</h5>
        {guesses.map((guess, rowIndex) => (
          <div className="d-flex justify-content-center mb-2" key={rowIndex}>
            {Array.from({ length: correctWord.length }).map((_, colIndex) => {
              const letter = guess[colIndex] || '';
              return (
                <input
                  key={colIndex}
                  ref={(el) => (inputRefs.current[rowIndex * correctWord.length + colIndex] = el)}
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
    </div>
  );
}


