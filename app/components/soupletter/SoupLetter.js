"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./style.css";

const directions = [
  [0, 1],  // derecha
  [1, 0],  // abajo
  [1, 1],  // diagonal abajo-derecha
  [1, -1], // diagonal abajo-izquierda
  [0, -1], // izquierda
  [-1, 0], // arriba
  [-1, -1], // diagonal arriba-izquierda
  [-1, 1] // diagonal arriba-derecha
];

const generateGrid = (words, size) => {
  const grid = Array(size)
    .fill()
    .map(() => Array(size).fill(""));

  words.forEach((word) => {
    let placed = false;
    while (!placed) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (canPlaceWord(grid, word, row, col, direction, size)) {
        for (let i = 0; i < word.length; i++) {
          grid[row + i * direction[0]][col + i * direction[1]] = word[i];
        }
        placed = true;
      }
    }
  });

  // Llenar el resto con letras aleatorias
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!grid[i][j]) {
        grid[i][j] = alphabet[Math.floor(Math.random() * 26)];
      }
    }
  }

  return grid;
};

const canPlaceWord = (grid, word, row, col, direction, size) => {
  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * direction[0];
    const newCol = col + i * direction[1];
    if (
      newRow < 0 ||
      newRow >= size ||
      newCol < 0 ||
      newCol >= size ||
      (grid[newRow][newCol] && grid[newRow][newCol] !== word[i])
    ) {
      return false;
    }
  }
  return true;
};

const SoupLetter = ({ words = [] }) => {
  const size = 10;
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundPositions, setFoundPositions] = useState([]);
  const isSelecting = useRef(false);
  const startCell = useRef(null);
  const selectedDirection = useRef(null);

  useEffect(() => {
    if (words.length > 0) {
      setGrid(generateGrid(words, size));
    }
  }, [words]);

  const handleMouseDown = (rowIndex, colIndex) => {
    isSelecting.current = true;
    startCell.current = [rowIndex, colIndex];
    setSelectedCells([[rowIndex, colIndex]]);
    selectedDirection.current = null;
  };

  const handleMouseOver = (rowIndex, colIndex) => {
    if (isSelecting.current) {
      if (!selectedDirection.current) {
        selectedDirection.current = determineDirection(startCell.current, [rowIndex, colIndex]);
      }
      const newSelectedCells = generateSelectedCells(startCell.current, [rowIndex, colIndex], selectedDirection.current);
      setSelectedCells(newSelectedCells);
    }
  };

  const handleMouseUp = () => {
    isSelecting.current = false;
    checkWord();
  };

  const determineDirection = (start, end) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;

    if (rowDiff === 0) {
      return [0, colDiff > 0 ? 1 : -1];
    } else if (colDiff === 0) {
      return [rowDiff > 0 ? 1 : -1, 0];
    } else if (Math.abs(rowDiff) === Math.abs(colDiff)) {
      return [rowDiff > 0 ? 1 : -1, colDiff > 0 ? 1 : -1];
    }
    return null;
  };

  const generateSelectedCells = (start, end, direction) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const [rowDir, colDir] = direction;
    const length = Math.max(Math.abs(endRow - startRow), Math.abs(endCol - startCol)) + 1;

    const cells = [];
    for (let i = 0; i < length; i++) {
      cells.push([startRow + i * rowDir, startCol + i * colDir]);
    }
    return cells;
  };

  const checkWord = () => {
    const selectedWord = selectedCells.map(([row, col]) => grid[row][col]).join("");
    if (words.includes(selectedWord)) {
      setFoundWords((prevFound) => [...prevFound, selectedWord]);
      setFoundPositions((prevPositions) => [...prevPositions, ...selectedCells]);
    }
    setSelectedCells([]);
  };

  const isWordCell = (rowIndex, colIndex) => {
    return foundPositions.some(([r, c]) => r === rowIndex && c === colIndex);
  };

  const isCurrentlySelectedCell = (rowIndex, colIndex) => {
    return selectedCells.some(([r, c]) => r === rowIndex && c === colIndex);
  };

  const getCellClass = (rowIndex, colIndex) => {
    const isSelected = isCurrentlySelectedCell(rowIndex, colIndex);
    const isFound = isWordCell(rowIndex, colIndex);
    const cellClasses = [styles.cell];

    if (isSelected) {
      cellClasses.push(styles.selected);
    }
    if (isFound) {
      cellClasses.push(styles.found);
    }
    return cellClasses.join(' ');
  };

  return (
    <div className="d-flex" onMouseUp={handleMouseUp}>
      <div className="container" onMouseLeave={() => isSelecting.current = false} onMouseDown={(e) => e.preventDefault()}>
        {grid.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {row.map((letter, colIndex) => (
              <div
                key={colIndex}
                className={getCellClass(rowIndex, colIndex)}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.wordList}>
        <h4>Palabras que debes encontrar</h4>
        {words.map((word, index) => (
          <div key={index} className={foundWords.includes(word) ? styles.foundWord : ""}>
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoupLetter;






