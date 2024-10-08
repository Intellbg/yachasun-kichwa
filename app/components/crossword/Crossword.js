"use client";
import React, { useState, useEffect } from 'react';
import styles from './style.module.css';

const Crossword = ({ words = [], size = 10, clues = { across: [], down: [] } }) => {
  const [gridData, setGridData] = useState([]);
  const [userInput, setUserInput] = useState([]); // Mantiene lo que el usuario escribe
  const [isCompleted, setIsCompleted] = useState(false); // Indica si el crucigrama se completó correctamente

  // Inicializa la cuadrícula con celdas negras.
  const initializeGrid = () => {
    const grid = Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => ({ isBlack: true, value: '', number: null }))
      );
    return grid;
  };

  // Coloca las palabras en la cuadrícula y asigna los números donde empiezan las palabras.
  const placeWordsInGrid = (grid) => {
    let clueNumber = 1; // Número de pista, empieza desde 1

    words.forEach(({ word, row, col, direction }) => {
      // Coloca la palabra y marca el inicio de cada palabra con un número.
      for (let i = 0; i < word.length; i++) {
        if (direction === 'across') {
          // Si es el inicio de una palabra en "across", asignamos un número
          if (i === 0 && !grid[row][col].number) {
            grid[row][col].number = clueNumber;
            clueNumber++;
          }
          grid[row][col + i] = { isBlack: false, value: word[i].toUpperCase(), number: grid[row][col + i].number };
        } else if (direction === 'down') {
          // Si es el inicio de una palabra en "down", asignamos un número
          if (i === 0 && !grid[row][col].number) {
            grid[row][col].number = clueNumber;
            clueNumber++;
          }
          grid[row + i][col] = { isBlack: false, value: word[i].toUpperCase(), number: grid[row + i][col].number };
        }
      }
    });

    return grid;
  };

  useEffect(() => {
    let grid = initializeGrid();
    grid = placeWordsInGrid(grid);
    setGridData(grid);

    // Inicializamos el estado para la entrada del usuario
    const initialInput = grid.map(row =>
      row.map(cell => (cell.isBlack ? '' : ''))
    );
    setUserInput(initialInput);
  }, [words, size]);

  // Maneja los cambios de cada celda cuando el usuario escribe
  const handleInputChange = (rowIndex, cellIndex, value) => {
    const newUserInput = [...userInput];
    newUserInput[rowIndex][cellIndex] = value.toUpperCase(); // Convertimos todo a mayúsculas
    setUserInput(newUserInput);
  };

  // Verifica si el crucigrama se completó correctamente
  const checkCompletion = () => {
    let isCorrect = true;

    for (let rowIndex = 0; rowIndex < gridData.length; rowIndex++) {
      for (let cellIndex = 0; cellIndex < gridData[rowIndex].length; cellIndex++) {
        if (!gridData[rowIndex][cellIndex].isBlack) {
          if (userInput[rowIndex][cellIndex] !== gridData[rowIndex][cellIndex].value) {
            isCorrect = false;
            break;
          }
        }
      }
      if (!isCorrect) break;
    }

    setIsCompleted(isCorrect);
  };

  return (
    <div className={styles.crosswordContainer}>
      <div className={styles.crossword}>
        <div className={styles.grid}>
          {gridData.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, cellIndex) => (
                <div key={cellIndex} className={styles.cell}>
                  {cell.isBlack ? (
                    <div className={styles.blackCell}></div>
                  ) : (
                    <div className={styles.cellContent}>
                      {cell.number && (
                        <span className={styles.cellNumber}>{cell.number}</span>
                      )}
                      <input
                        type="text"
                        maxLength="1"
                        className={styles.inputCell}
                        value={userInput[rowIndex][cellIndex] || ""}
                        onChange={(e) => handleInputChange(rowIndex, cellIndex, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Muestra las pistas */}
        <div className={styles.clues}>
          <h3>Across</h3>
          <ul>
            {clues.across.map((clue, index) => (
              <li key={index}>
                <strong>{clue.number}:</strong> {clue.text}
              </li>
            ))}
          </ul>
          <h3>Down</h3>
          <ul>
            {clues.down.map((clue, index) => (
              <li key={index}>
                <strong>{clue.number}:</strong> {clue.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Botón para verificar si se completó correctamente */}
      <button onClick={checkCompletion} className={styles.checkButton}>
        Check Completion
      </button>

      {isCompleted !== null && (
        <p className={styles.completionMessage}>
          {isCompleted ? "¡Crucigrama completado correctamente!" : "Hay errores en el crucigrama."}
        </p>
      )}
    </div>
  );
};

export default Crossword;
