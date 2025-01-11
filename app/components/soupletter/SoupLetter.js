"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";



const directions = [
  [0, 1],   // derecha
  [1, 0],   // abajo
  [1, 1],   // diagonal abajo-derecha
  [1, -1],  // diagonal abajo-izquierda
  [0, -1],  // izquierda
  [-1, 0],  // arriba
  [-1, -1], // diagonal arriba-izquierda
  [-1, 1]   // diagonal arriba-derecha
];

const generateGrid = (words, size) => {
  const grid = Array(size).fill().map(() => Array(size).fill(""));

  words.forEach((word) => {
    let placed = false;
    while (!placed) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (canPlaceWord(grid, word, row, col, direction, size)) {
        for (let i = 0; i < word.length; i++) {
          grid[row + i * direction[0]][col + i * direction[1]] = word[i].toUpperCase();
        }
        placed = true;
      }
    }
  });

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
      (grid[newRow][newCol] && grid[newRow][newCol] !== word[i].toUpperCase())
    ) {
      return false;
    }
  }
  return true;
};

const determineDirection = (start, end) => {
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;

  const rowDiff = Math.sign(endRow - startRow);
  const colDiff = Math.sign(endCol - startCol);

  return [rowDiff, colDiff];
};

const generateSelectedCells = (start, end, direction) => {
  const [startRow, startCol] = start;
  const [rowDir, colDir] = direction;

  const length = Math.max(
    Math.abs(end[0] - startRow),
    Math.abs(end[1] - startCol)
  ) + 1;

  const cells = [];
  for (let i = 0; i < length; i++) {
    const newRow = startRow + i * rowDir;
    const newCol = startCol + i * colDir;
    cells.push([newRow, newCol]);
  }
  return cells;
};
const SoupLetter = ({ words = [], size = 10, spanish = [], onSendData }) => {
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundPositions, setFoundPositions] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false); // Track loading state

  const isSelecting = useRef(false);
  const startCell = useRef(null);
  const selectedDirection = useRef(null);

  useEffect(() => {
    if (words.length > 0) {
      setGrid(generateGrid(words.map((w) => w.toUpperCase()), size));
      setIsLoaded(true); 
    }
  }, [words]);

  useEffect(() => {
    if (isLoaded && foundWords.length === words.length) {
      console.log("Game completed");
      onSendData(true); 
    }
  }, [foundWords, words, isLoaded, onSendData]);

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
      const newSelectedCells = generateSelectedCells(
        startCell.current,
        [rowIndex, colIndex],
        selectedDirection.current
      );
      setSelectedCells(newSelectedCells);
    }
  };

  const handleMouseUp = () => {
    isSelecting.current = false;
    checkWord();
  };

  const checkWord = () => {
    const selectedWord = selectedCells
      .map(([row, col]) => grid[row][col])
      .join("")
      .toUpperCase();

    const wordIndex = words.map((w) => w.toUpperCase()).indexOf(selectedWord);

    if (wordIndex !== -1 && !foundWords.includes(selectedWord)) {
      const correspondingLabel = spanish[wordIndex].toUpperCase();
      setFoundWords((prev) => [...prev, correspondingLabel]);
      setFoundPositions(
        (prev) => new Set([...prev, ...selectedCells.map((cell) => cell.join(","))])
      );
    }
    setSelectedCells([]);
  };

  const isWordCell = (rowIndex, colIndex) =>
    foundPositions.has(`${rowIndex},${colIndex}`);

  const isCurrentlySelectedCell = (rowIndex, colIndex) =>
    selectedCells.some(([r, c]) => r === rowIndex && c === colIndex);

  const getCellClass = (rowIndex, colIndex) => {
    const isSelected = isCurrentlySelectedCell(rowIndex, colIndex);
    const isFound = isWordCell(rowIndex, colIndex);
    return `${styles.cell} ${isSelected ? styles.selected : ""} ${
      isFound ? styles.found : ""
    }`;
  };

  return (    
    <div className="d-flex" onMouseUp={handleMouseUp}>
      <div className="container" onMouseLeave={() => (isSelecting.current = false)}>
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
        <h4>Palabras que debes encontrar en Kichwa</h4>
        {spanish.map((word, index) => (
          <div
            key={index}
            className={
              foundWords.includes(word.toUpperCase()) ? styles.foundWord : ""
            }
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoupLetter;
