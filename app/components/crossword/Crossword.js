"use client";
import React, { useState, useEffect } from "react";
import { generateCrosswordMatrix } from "./matrix";
import Helper from "@/app/components/helper/Helper.js";
import CrosswordInstructions from "../instructions/crossword/CrosswordInstructions";
import animation from '@/app/animation.module.css';

const Crossword = (({ data, onComplete }) => {

  const { matrix, clues } = generateCrosswordMatrix(data);
  const [userInput, setUserInput] = useState(
    matrix.map((row) => row.map((cell) => (cell.letter ? "" : null)))
  );

  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleChange = (row, col, value) => {
    if (value.length > 1) return;
    const newInput = [...userInput];
    newInput[row][col] = value.toUpperCase();
    setUserInput(newInput);
  };

  const checkCompletion = () => {
    let complete = true;
    let correct = true;

   matrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.letter) {
          const userValue = userInput[rowIndex][colIndex] || "";
          if (userValue === "") complete = false;
          if (userValue !== cell.letter.toUpperCase()) correct = false;
        }
      });
    });

    setIsComplete(complete);
    setIsCorrect(correct);

    if (complete && correct) {
      onComplete(true);
    }
  };


  useEffect(() => {
    checkCompletion();
  }, [userInput]);

  return (
    <div className="d-flex justify-content-center align-items-center responsive-height">
    <div className="container text-center bg-white text-dark responsive-max-width">
      <div className="d-flex align-items-center justify-content-center my-4">
          <h1 className="me-3">Crucigrama</h1>
          <div>
            <Helper imageSrc="/img/humu/humu-happy.png" className={`${animation.spinnerImage}`}>
                <CrosswordInstructions />
            </Helper>               
            </div>                    
        </div> 
        <h2 className="text my-4 p-4">Completa el siguiente crucigrama</h2> 
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
          <h5>Pistas</h5>
          <strong>Horizontales</strong>
          <ul className="list-group">
            {clues.across.map((clue) => (
              <li key={clue.number} className="list-group-item">
                {clue.number}. {clue.question}
              </li>
            ))}
          </ul>
          <strong>Verticales</strong>
          <ul className="list-group">
            {clues.down.map((clue) => (
              <li key={clue.number} className="list-group-item">
                {clue.number}. {clue.question}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-3">
          {isComplete && (
            <div className={`alert ${isCorrect ? "alert-success" : "alert-danger"}`} role="alert">
              {isCorrect ? "¡Crucigrama completado correctamente!" : "Hay errores en tu crucigrama. Revisa tus respuestas."}
            </div>
          )}
        </div>
    </div>
    </div>
  );
});

export default Crossword;

