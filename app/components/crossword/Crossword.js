"use client";
import React, { useState, useEffect, useCallback } from 'react';
import styles from './style.module.css';

const Crossword = React.memo(({ words = [], size = 10, clues = { across: [], down: [] }, onResolve }) => {
  const [gridData, setGridData] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [completedCorrectly, setCompletedCorrectly] = useState(false);
  const [message, setMessage] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [alertType, setAlertType] = useState(''); // Tipo de alerta: success o danger

  const initializeGrid = useCallback(() => {
    return Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => ({ isBlack: true, value: '', number: null }))
      );
  }, [size]);

  const placeWordsInGrid = useCallback((grid) => {
    let clueNumber = 1;

    words.forEach(({ word, row, col, direction }) => {
      for (let i = 0; i < word.length; i++) {
        if (direction === 'across') {
          if (i === 0 && !grid[row][col].number) {
            grid[row][col].number = clueNumber;
            clueNumber++;
          }
          grid[row][col + i] = { isBlack: false, value: word[i].toUpperCase(), number: grid[row][col + i].number };
        } else if (direction === 'down') {
          if (i === 0 && !grid[row][col].number) {
            grid[row][col].number = clueNumber;
            clueNumber++;
          }
          grid[row + i][col] = { isBlack: false, value: word[i].toUpperCase(), number: grid[row + i][col].number };
        }
      }
    });

    return grid;
  }, [words]);

  useEffect(() => {
    let grid = initializeGrid();
    grid = placeWordsInGrid(grid);
    setGridData(grid);

    const initialInput = grid.map(row =>
      row.map(cell => (cell.isBlack ? '' : ''))
    );
    setUserInput(initialInput);
  }, [initializeGrid, placeWordsInGrid]);

  const handleInputChange = (rowIndex, cellIndex, value) => {
    if (!hasStarted) setHasStarted(true);
    const newUserInput = [...userInput];
    newUserInput[rowIndex][cellIndex] = value.toUpperCase();
    setUserInput(newUserInput);
  };

  const checkCompletion = useCallback(() => {
    if (!hasStarted || completedCorrectly) return;

    let allCellsFilled = true;
    let isCorrect = true;

    for (let rowIndex = 0; rowIndex < gridData.length; rowIndex++) {
      for (let cellIndex = 0; cellIndex < gridData[rowIndex].length; cellIndex++) {
        const cell = gridData[rowIndex][cellIndex];
        
        if (!cell.isBlack) {
          const userInputValue = userInput[rowIndex][cellIndex] || '';
          
          if (userInputValue === '') {
            allCellsFilled = false;
          }
          
          if (userInputValue !== cell.value) {
            isCorrect = false;
          }
        }
      }
    }

    if (allCellsFilled && isCorrect) {
      setCompletedCorrectly(true);
      setMessage("¡Felicidades! La oración es correcta.");
      setAlertType('success');
      onResolve();
    } else if (allCellsFilled && !isCorrect) {
      setMessage("El crucigrama está completo, pero hay errores.");
      setAlertType('danger');
    } else {
      setMessage("");
      setAlertType('');
    }
  }, [gridData, userInput, completedCorrectly, onResolve, hasStarted]);

  useEffect(() => {
    checkCompletion();
  }, [userInput, checkCompletion]);

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
        {message && (
          <div className={`alert alert-${alertType}`} role="alert">
            {message}
          </div>
        )}
        <div className={styles.clues}>
          <h3>Horizontal</h3>
          <ul>
            {clues.across.map((clue, index) => (
              <li key={index}>
                <strong>{clue.number}:</strong> {clue.text}
              </li>
            ))}
          </ul>
          <h3>Vertical</h3>
          <ul>
            {clues.down.map((clue, index) => (
              <li key={index}>
                <strong>{clue.number}:</strong> {clue.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default Crossword;

