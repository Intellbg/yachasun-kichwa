"use client";
import React, { useState, useEffect } from "react";
import { generateCrosswordMatrix } from "./matrix";

const Crossword = ({ data, onComplete }) => {
  const { matrix, clues } = generateCrosswordMatrix(data);
  const [userInput, setUserInput] = useState(
    matrix.map((row) => row.map((cell) => (cell.letter ? "" : null)))
  );

  const handleChange = (row, col, value) => {
    if (value.length > 1) return;
    const newInput = [...userInput];
    newInput[row][col] = value.toUpperCase();
    setUserInput(newInput);
  };

  const checkCompletion = () => {
    const isComplete = matrix.every((row, rowIndex) =>
      row.every((cell, colIndex) =>
        cell.letter ? userInput[rowIndex][colIndex] === cell.letter.toUpperCase() : true
      )
    );
    if (isComplete) onComplete(true);
  };

  useEffect(() => {
    checkCompletion();
  }, [userInput]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="d-flex flex-column align-items-center">
            {userInput.map((row, rowIndex) => (
              <div key={rowIndex} className="d-flex">
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`border position-relative ${matrix[rowIndex][colIndex].letter ? "" : "bg-dark"
                      }`}
                    style={{ width: "30px", height: "30px" }}
                  >
                    {matrix[rowIndex][colIndex].number && (
                      <span
                        className="position-absolute top-0 start-0 ms-1 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {matrix[rowIndex][colIndex].number}
                      </span>
                    )}
                    {matrix[rowIndex][colIndex].letter && (
                      <input
                        type="text"
                        className="w-100 h-100 text-center border-0"
                        maxLength={1}
                        value={userInput[rowIndex][colIndex] || ""}
                        onChange={(e) =>
                          handleChange(rowIndex, colIndex, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h5>Clues</h5>
          <strong>Across</strong>
          <ul className="list-group">
            {clues.across.map((clue) => (
              <li key={clue.number} className="list-group-item">
                {clue.number}. {clue.question}
              </li>
            ))}
          </ul>
          <strong>Down</strong>
          <ul className="list-group">
            {clues.down.map((clue) => (
              <li key={clue.number} className="list-group-item">
                {clue.number}. {clue.question}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Crossword;
